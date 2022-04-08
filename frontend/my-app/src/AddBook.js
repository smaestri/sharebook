import React from 'react'
import { useParams } from 'react-router-dom'

import "./AddBook.scss"

export default function AddBook() {
    let { bookId } = useParams();
   
    if (bookId) {
        return "update book"
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("onSubmit")
        // TODO
    }

    return (
        <div className="container-add-book">
            <h1>Ajouter un livre</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Nom du livre</label>
                    <input name="name" type="text" className="form-control"></input>
                </div>
                <div>
                    <label>Catégorie du livre</label>
                    <select name="categoryId" className="form-control">
                        <option value="1">BD</option>
                        <option value="2">Roman</option>
                    </select>
                </div>
                <div className="container-submit">
                    <input type="submit" value='Valider' className="btn btn-primary"></input>
                </div>

            </form>
        </div>
    )
}