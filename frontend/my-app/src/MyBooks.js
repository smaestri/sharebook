import Book from './Book'

const MyBooks = () => {

  const books = [
    {
      title: "asterix",
      category: "BD",
    },
    {
      title: "tintin",
      category: "BD",
    }
  ]

  return <div>
    <h1>Mes livres</h1>
    {books.length === 0 ? "Vous n'avez pas déclaré de livres" : null}
    {books.map(book => (<div>
      <Book title={book.title} category={book.category} />
      <button>Modifier</button>
      <button>Supprimer</button>
    </div>
    ))}
    <br />
    <button>Nouveau livre</button>
  </div>
}

export default MyBooks