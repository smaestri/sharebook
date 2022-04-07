import { Link } from "react-router-dom";

export default function Header() {
    return <div>
        <Link to="listBooks">Livres disponibles</Link>
        <Link to="myBooks">Mes livres</Link>
        <Link to="myBorrows">Mes emprunts</Link>
        </div>
} 