import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios';
import AddBook from './AddBook';
import AddUser from './AddUser';
import ListBooks from './ListBooks'
import MyBooks from './MyBooks'
import Login from './Login'
import Header from './Header'
import MyBorrows from './MyBorrows'
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss'

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

  //todo loading
    axios.interceptors.request.use(function (request) {
      const token = sessionStorage.getItem(AUTH_TOKEN_KEY)
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request
    }, (error) => {
      return Promise.reject(error);
    });

const UserConnected = ({ setUserInfo, userInfo }) => {
  const history = useNavigate();
  React.useEffect(() => {
    setUserInfo(null)
    axios.get('/isConnected').then(response => {
      console.log('response.data' + response.data)
      setUserInfo(response.data)
    }).catch(err => {
      console.error('failed to get user')
      })
  }, [history, setUserInfo])

  return (<>
    {userInfo && <Header userInfo={userInfo} setUserInfo={setUserInfo} />}
  </>)

}

function App() {

  const [userInfo, setUserInfo] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {


    axios.interceptors.response.use(function (response) {
      return response;
    }, (error) => {
      return Promise.reject(error);
    });
  })

  return (
    <div id="page">

      {loading && (
        <div className="background-spinner">
          <div className="spinner">
            <Spinner animation="grow" variant="light" />
          </div>
        </div>
      )}
      <UserConnected userInfo={userInfo} setUserInfo={setUserInfo} />
      <div id="content">
        <Routes>
          <Route path="listBooks" element={<ListBooks />} />
          <Route path="myBooks" element={<MyBooks />} />
          <Route path="addBook" element={<AddBook />} />
          <Route path="addBook/:bookId" element={<AddBook />} />
          <Route path="myBorrows" element={<MyBorrows />} />
          <Route path="addUser" element={<AddUser setUserInfo={setUserInfo} />} />
          <Route path="*" element={<Login setUserInfo={setUserInfo} />} />
        </Routes>
      </div>
      <div><i>V. 2023.08</i></div>
    </div>

  );
}
export default App;
