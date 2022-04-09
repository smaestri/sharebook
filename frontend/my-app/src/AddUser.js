import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import SimpleModal from './SimpleModal'
import './AddUser.scss'

class AddUser extends React.Component {

  constructor() {
    super();
    this.state = { userData: {}, showModal: false }
  }

  handleChange = (event) => {
    let currentState = { ...this.state.userData };
    currentState[event.target.name] = event.target.value;
    this.setState({ userData: currentState })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  onSubmit = (event) => {
    event.preventDefault();
    axios.post('/users', {
      ...this.state.userData
    }).then(response => {
      this.props.setUserInfo(response.data.firstName + " " + response.data.lastName)
      this.props.history("/myBooks")
    }).catch(() => {
      this.setState({ showModal: true })
    })
  }

  render() {
    return (
      <>
        <div className="add-user-container">
          <div>
            <h1>M'inscrire</h1>
            <div>
              <form onSubmit={this.onSubmit}>
                <div>
                  <label>email</label>
                  <input name="email" type="text" className="form-control" onChange={this.handleChange} />
                </div>
                <div>
                  <label>nom</label>
                  <input name="lastName" type="text" className="form-control" onChange={this.handleChange} />
                </div>
                <div>
                  <label>prenom</label>
                  <input name="firstName" type="text" className="form-control" onChange={this.handleChange} />
                </div>
                <div>
                  <label>password</label>
                  <input name="password" type="password" className="form-control" onChange={this.handleChange} />
                </div>
                <div className="container-valid text-center">
                  <input type="submit" value="Valider" className="btn btn-primary" onChange={this.handleChange} />
                </div>
              </form>
            </div>
            <div><Link to="/">Retour à l'accueil</Link></div>
          </div>
        </div>
        <SimpleModal
          title={"Mail déja utilisé"}
          bodyTxt={"Cet email est déja utilisé, merci d'en saisir un autre"}
          handleCloseModal={this.handleCloseModal}
          showModal={this.state.showModal}
        ></SimpleModal>
      </>
    )
  }
}

// Wrap and export
export default function (props) {
  const history = useNavigate();
  return <AddUser {...props} history={history} />;
}