import React from 'react'
import logo from './logo.jpg';
import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './Login.scss'

class Login extends React.Component {

    constructor() {
        super();
        this.state = { userData: {}, showModal: false }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    handleChange(event) {
        let currentState = { ...this.state.userData };
        currentState[event.target.name] = event.target.value;
        this.setState({ userData: currentState })
    }

    onSubmit(event) {
        event.preventDefault();
        axios.post('/authenticate', {
            email: this.state.userData.email,
            password: this.state.userData.password
        }).then((response) => {
            console.log('response')
            this.props.setUserInfo(response.data.userName)
            this.props.history('/listbooks')
        }).catch(() => {
            this.setState({ showModal: true })
        })
    }

    handleCloseModal() {
        this.setState({ showModal: false })
    }
    render() {
        const title = "Login incorrect"
        const bodyTxt = "Login ou mot de passe incorrect"
        return (
            <>
                <div className="login-container">
                    <div>
                        <div>
                            <img src={logo} alt="Logo" />
                        </div>
                        <div className="title">
                            Bienvenue sur Sharebook!
                        </div>
                        <div className="form-container">
                            <form onSubmit={this.onSubmit}>
                                <span>Mail: </span>
                                <input type="text" className="form-control" name="email" onChange={this.handleChange}></input>
                                <span>Passsword: </span>
                                <input type="password" className="form-control" name="password" onChange={this.handleChange}></input>
                                <div className="text-center">
                                    <input type="submit" className="btn btn-primary" value="OK" />
                                </div>
                            </form>
                        </div>
                        <div className="text-center"><Link to="/addUser">M'inscrire</Link></div>
                    </div>
                </div>

                <SimpleModal title={title} bodyTxt={bodyTxt} handleCloseModal={this.handleCloseModal} showModal={this.state.showModal} />
            </>
        )
    }
}

// Wrap and export
export default function (props) {
    const history = useNavigate();
    return <Login {...props} history={history} />;
}