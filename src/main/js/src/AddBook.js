import axios from 'axios';
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import "./AddBook.scss"

export default function AddBook() {

    let { bookId } = useParams();
    const [bookData, setBookData] = useState({})
    const [categoriesData, setCategoriesData] = useState([])
    const history = useHistory();

    useEffect(() => {
        axios.get(process.env.REACT_APP_CATEGORIES_ENDPOINT).then(response => {
            setCategoriesData(response.data)
            setBookData({
                title: '',
                categoryId: response.data[0].id
            })

        })
            .then(() => {
                if (bookId) {
                    axios.get(`${process.env.REACT_APP_BOOKS_ENDPOINT}/${bookId}`).then(response => {
                        setBookData({
                            title: response.data.title,
                            categoryId: response.data.category.id
                        })

                    })
                }

            })
    }, [bookId]);

    const handleChange = (event) => {
        let currentState = { ...bookData };
        currentState[event.target.name] = event.target.value;
        setBookData(currentState)
    }

    const onSubmit = (event) => {
        if (bookId) {
            event.preventDefault();
            axios.put(`${process.env.REACT_APP_BOOKS_ENDPOINT}/${bookId}`, {
                ...bookData
            }).then(() => {
                //rediriger vers myBooks
                history.push("/myBooks")
            })
        } else {
            event.preventDefault();
            axios.post(process.env.REACT_APP_BOOKS_ENDPOINT, {
                ...bookData
            }).then(() => {
                //rediriger vers myBooks
                history.push("/myBooks")
            })
        }
    }

    return (
        <div className="container-add-book">
            <h1>Ajouter un livre</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Nom du livre</label>
                    <input name="title" value={bookData.title} type="test" onChange={handleChange} className="form-control"></input>
                </div>
                <div>
                    <label>Cat??gorie du livre</label>
                    <select name="categoryId" value={bookData.categoryId} onChange={handleChange} className="form-control">
                        {categoriesData.map(category => (
                            <option value={category.id} key={category.id}>{category.label}</option>
                        ))}
                    </select>
                </div>
                <div className="container-submit">
                    <input type="submit" value="Valider" className="btn btn-primary"></input>
                </div>
            </form>
        </div>
    )
}