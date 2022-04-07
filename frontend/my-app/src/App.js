import logo from './logo.svg';
import './App.css';

function App() {


const renderBooks = () => {
  const books = [
    {
      id: 1,
      title: "asterix",
      author:"Uderzo"
    },
    {
      id: 2,
      title: "tinitin",
      author:"Herge"
    }
  ]
  const resBooks = books.map(item => {
    return <div>{item.title} de {item.author}</div>
  })

  return resBooks;

}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{color: "red"}}>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderBooks()}
        </a>
      </header>
    </div>
  );
}

export default App;