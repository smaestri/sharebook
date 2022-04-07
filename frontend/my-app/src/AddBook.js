import {useParams} from 'react-router-dom'

export default function AddBook() {
    let {bookId} = useParams();
    if(bookId) {
        return "update book" 
    }
    return "addBook"
}