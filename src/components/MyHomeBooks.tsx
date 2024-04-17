import   '../types';
import '../assets/css/MyHomeBooks.css';
import MyHomeBookListItem from './MyHomeBookListItem';
import  "../types";
import {myHomeBookList,BookItem} from "../types";
import MyCategoryBookListItem from "./MyCategoryBookListItem";

function MyHomeBooks() {
    return (
        <>
            <ul className="book-lists">
                {
                    myHomeBookList.map((book:BookItem) => (

                        <MyHomeBookListItem
                            key = {book.bookId}
                            bookId = {book.bookId}
                            categoryId={book.categoryId}
                            author = {book.author}
                            // description = {book.description}
                            // isFeatured = {book.isFeatured}
                            isPublic={book.isPublic}
                            price = {book.price}
                            // rating = {book.rating}
                            title = {book.title}
                        />))}
            </ul>
        </>
    )
}

export default MyHomeBooks;