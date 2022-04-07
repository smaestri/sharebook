import React from 'react'
import Book from './Book'

class MyBooks extends React.Component {

  constructor() {
    super();
    this.state = { books: [] }
  }
  componentDidMount() {
    // TODO charger mes livres
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
    return (
      <div>
        <h1>Mes livres</h1>
        {this.state.books.length === 0 ? "Vous n'avez pas déclaré de livres" : null}
        {this.state.books.map(book => (<div>
          <Book title={book.title} category={book.category}></Book>
          <button>Modifier</button>
          <button>Supprimer</button>
        </div>))}
        <br />
        <button>Nouveau livre</button>
      </div>)
  }

}
export default MyBooks