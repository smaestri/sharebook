import React from 'react'
import logo from './logo.jpg';
import { Link } from "react-router-dom";
import './Login.scss'

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = { userData: {} }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(event) {
        event.preventDefault();
        console.log("onsubmit")
        console.log(this.state.userData)
    }
    render() {
        return (
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
                            <div>
                                <input type="submit" className="btn btn-primary" value="OK" />
                            </div>
                        </form>
                    </div>
                    <div><Link to="/addUser">M'inscrire</Link></div>
                </div>
            </div>
        )
    }
}