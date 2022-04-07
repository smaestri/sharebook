import React from 'react'

export default class Book extends React.Component {
    render() {
        return (
            <div>{this.props.title} de {this.props.category}</div>
        )
    }
}