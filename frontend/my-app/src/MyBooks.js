import React from 'react'
import { Link } from 'react-router-dom'
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
        {this.state.books.map((book) => (<div>
          <Book title={book.title} category={book.category}></Book>
          <Link to={`/addBook/${book.id}`}>
            <button>Modifier</button>
          </Link>
          <button>Supprimer</button>
        </div>))}
        <br />
        <Link to="/addBook"><button>Nouveau livre</button></Link>
      </div>)
  }

}
export default MyBooks