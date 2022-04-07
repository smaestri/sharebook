import { Route, Routes } from 'react-router-dom'
import AddBook from './AddBook';
import AddUser from './AddUser';
import ListBooks from './ListBooks'
import MyBooks from './MyBooks'
import Login from './Login'
import MyBorrows from './MyBorrows'

function App() {

  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="listBooks" element={<ListBooks />} />
          <Route path="myBooks" element={<MyBooks />} />
          <Route path="addBook" element={<AddBook />} />
          <Route path="addBook/:bookId" element={<AddBook />} />
          <Route path="myBorrows" element={<MyBorrows />} />
          <Route path="login" element={<Login />} />
          <Route path="addUser" element={<AddUser />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;