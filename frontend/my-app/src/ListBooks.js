import React from 'react'
import Book from './Book'
import axios from 'axios';

import './MyBooks.scss'
import './ListBooks.scss'

export default class ListBooks extends React.Component {

  constructor() {
    super();
    this.state = { books: [] }
  }
  componentDidMount() {
    axios.get('/books?status=FREE').then(response => {
      this.setState({books: response.data})
    })
   }

  render() {

    return (<div className="container" >
      <h1>Livres diponibles</h1>
      <div className="list-container">
        {this.state.books.length === 0 ? "Pas de livres disponibles" : null}
        {this.state.books.map((book, key) => (<div key={key} className="list-book-container">
          <Book title={book.title} category={book.category.label}></Book>
          <div className="text-center">
            <button className="btn btn-primary btn-sm">Emprunter</button>
          </div>
        </div>))}
      </div>
    </div>)

  }

}