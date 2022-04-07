import React from 'react'
import Book from './Book'

export default class ListBooks extends React.Component {

  constructor() {
    super();
    this.state = { books: [] }
  }
  componentDidMount() {
    // TODO charger les livres disponibles a partir des API back
    this.setState({
      books: [
        {
          title: "asterix",
          category: "BD",
        },

        {
          title: "tintin",
          category: "BD",
        }
      ]
    })
  }

  render() {

    return (<div>
      <h1>Livres diponibles</h1>
      {this.state.books.length === 0 ? "Pas de livres disponibles" : null}
      {this.state.books.map(book => (<div>
        <Book title={book.title} category={book.category}></Book>
        <button>Emprunter</button>
      </div>))}
      <br />
    </div>)

  }

}