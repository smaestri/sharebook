import React from 'react'

export class Book extends React.Component {
    render() {
        return (
            <div>{this.props.title} de {this.props.author}</div>
        )
    }
} 