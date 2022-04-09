import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Header({ userInfo, setUserInfo }) {
    const history = useNavigate();
    const signout = () => {
        axios.post('/logout').then(response => {
            history('/login')
            setUserInfo(null)
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav mr-auto me-auto">
                        <Link className="nav-link" to="/myBooks">Mes livres</Link>
                        <Link className="nav-link" to="/myBorrows">Mes emprunts</Link>
                        <Link className="nav-link" to="/listBooks">Livres disponibles</Link>
                </div>
                <div className="navbar-nav d-flex align-items-center">
                    <div className="me-2">Bienvenue, {userInfo}</div>
                    <button type="button" variant="secondary" className="btn btn-secondary" onClick={signout}>Se déconnecter</button>
                </div>
            </div>
        </div>
    </nav>
    )
}