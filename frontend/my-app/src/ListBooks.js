import React from 'react'
import Book from './Book'

export default class ListBooks extends React.Component {

  componentDidMount() {
    // TODO charger les livres disponibles a partir des AP back
  }

  render() {

    const books= [
      {
        title: "asterix",
        category: "BD",
      },

      {
        title: "tintin",
        category: "BD",
      }
    ]
  
    return (<div>
      <h1>Livres diponibles</h1>
      {books.length === 0 ? "Pas de livres disponibles" : null}
      {books.map(book => (<div>
        <Book title={book.title} category={book.category}></Book>
        <button>Emprunter</button>
      </div>))}
      <br />
    </div>)

  }

}