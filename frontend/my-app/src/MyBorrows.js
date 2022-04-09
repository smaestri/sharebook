import React from 'react'
import Book from './Book'
import axios from 'axios';
import './MyBorrows.scss'

export default function MyBorrows() {

    const [myBorrows, setMyBorrows] = React.useState([]);
    const getMyBorrows = () => {
        axios.get('/borrows').then(response => {
            setMyBorrows(response.data)
           })
    }

    React.useEffect(()=> {
        getMyBorrows();
    },[])

    const closeBorrow = (borrowId) => {
        axios.delete(`/borrows/${borrowId}`).then(response => {
            getMyBorrows();
           })
    }

    return (
        <div className="container">
            <h1>Mes emprunts</h1>
            <div className="list-container">
                {myBorrows.map((borrow, key) => {
                    return (
                        <div className="borrow-container" key={key}>
                            <Book
                                title={borrow.book.title}
                                category={borrow.book.category.label}
                                lender={borrow.lender.firstName + " " + borrow.lender.lastName}
                                askDate={borrow.askDate}
                                closeDate={borrow.closeDate}>
                            </Book>
                            <div className="text-center">
                                {borrow.closeDate ? "" : <button className="btn btn-primary btn-sm" onClick={() => closeBorrow(borrow.id)}>Clore</button>}
                            </div>
                        </div>
                    )
                })}
            </div>
            {myBorrows.length === 0 ? <div>Vous n'avez pas d'emprunt</div> : null}
        </div>
    )
}