import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation, BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import AddBook from './AddBook';
import AddUser from './AddUser';
import ListBooks from './ListBooks'
import MyBooks from './MyBooks'
import Login from './Login'
import Header from './Header'
import MyBorrows from './MyBorrows'
import 'bootstrap/dist/css/bootstrap.min.css';

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const UserConnected = ({ setUserInfo, userInfo }) => {
  const history = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    setUserInfo(null)
    axios.get('/isConnected').then(response => {
      setUserInfo(response.data)
    }, () => {
      if (location.pathname !== '/addUser') {
        history("/login")
      }
    })
  }, [history, setUserInfo, location.pathname]);

  return (<>
    {userInfo && <Header userInfo={userInfo} setUserInfo={setUserInfo} />}
  </>)
}

function App() {

  const [userInfo, setUserInfo] = React.useState('');

  useEffect(() => {
    axios.interceptors.request.use(function (request) {
      const token = sessionStorage.getItem(AUTH_TOKEN_KEY)
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request
    }, (error) => {
      return Promise.reject(error);
    });
  })

  return (
    <div>
    <UserConnected userInfo={userInfo} setUserInfo={setUserInfo} />
    <div className="App">
     <Routes>
       <Route path="listBooks" element={<ListBooks />} />
       <Route path="myBooks" element={<MyBooks />} />
       <Route path="addBook" element={<AddBook />} />
       <Route path="addBook/:bookId" element={<AddBook />} />
       <Route path="myBorrows" element={<MyBorrows />} />
       <Route path="addUser" element={<AddUser  setUserInfo={setUserInfo} />} />
       <Route path="*" element={<Login  setUserInfo={setUserInfo} />} />
     </Routes>
   </div>
 </div>
  );
}
export default App;