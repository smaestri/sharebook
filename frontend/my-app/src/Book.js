import React from 'react'
import './Book.scss'
import bookImg from './book.png'

export default class Book extends React.Component {

    displaydate = (dateStr) => {
        const newDate = new Date(dateStr);
        return newDate.toLocaleDateString("fr-FR")
    }

    render() {
        return (
            <div className="book">
                <div className="book-image">
                    <img src={bookImg} alt="Book" />
                </div>
                <div>Titre : {this.props.title}</div>
                <div>Catégorie: {this.props.category}</div>
                {this.props.lender &&  <div>Prêteur: {this.props.lender}</div>}
                {this.props.askDate && <div>Date demande: {this.displaydate(this.props.askDate)}</div>}
                {this.props.closeDate && <div>Date cloture: {this.displaydate(this.props.closeDate)}</div>}
            </div>
        )
    }

}