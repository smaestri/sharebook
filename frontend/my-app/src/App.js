import React from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import AddBook from './AddBook';
import AddUser from './AddUser';
import ListBooks from './ListBooks'
import MyBooks from './MyBooks'
import Login from './Login'
import Header from './Header'
import MyBorrows from './MyBorrows'
import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss'

const UserConnected = ({ setUserInfo, userInfo }) => {
  const history = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    setUserInfo(null)
    axios.get('/isConnected').then(response => {
      setUserInfo(response.data)
    }, () => {
      if (!location.pathname === '/addUser') {
        history("/login")
      }
    })
  }, [history, setUserInfo, location.pathname]);

  return (<>
    {userInfo && <Header userInfo={userInfo} setUserInfo={setUserInfo} />}
  </>)
}
function App() {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.interceptors.request.use(function (request) {
      setLoading(true)
      return request
    }, (error) => {
      setLoading(false)
      return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
      setLoading(false)
      return response;
    }, (error) => {
      setLoading(false)
      return Promise.reject(error);
    });

  })


  const [userInfo, setUserInfo] = React.useState('');

  return (
    <div>

    {loading && (
            <div className="background-spinner">
              <div className="spinner">
                <Spinner animation="grow" variant="light" />
              </div>
            </div>
          )}
      <UserConnected userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className="App">
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
    </div>
  );
}
export default App;