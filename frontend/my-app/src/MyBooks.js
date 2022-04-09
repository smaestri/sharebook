import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Book from './Book'

import './MyBooks.scss'

const MyBooks = () => {

  const [myBooks, setMyBooks] = React.useState([])
  
    React.useEffect(() => {
      axios.get('/books').then(response => {
        setMyBooks(response.data)
      })
    }, [])

  return (
    <div className="container">
      <h1>Mes livres</h1>
      <div className="list-container">
        {myBooks.length === 0 ? "Vous n'avez pas déclaré de livres" : null}
        {myBooks.map((book, key) => (<div key={key} className="mybook-container">
          <Book title={book.title} category={book.category.label}></Book>
          <div className="container-buttons">
            <Link to={`/addBook/${book.id}`}>
              <button className="btn btn-primary btn-sm">Modifier</button>
            </Link>
            <button className="btn btn-primary btn-sm">Supprimer</button>
          </div>
        </div>))}
      </div>
      <Link to="/addBook"><button className="btn btn-primary btn-sm">Nouveau livre</button></Link>
    </div>)
}
export default MyBooks;