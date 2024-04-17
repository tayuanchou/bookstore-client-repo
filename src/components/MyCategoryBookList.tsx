import   '../types';
import '../assets/css/MyCategoryBookList.css';
import MyCategoryBookListItem from './MyCategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import {BookItem} from "../types";
import {Link, useParams} from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import CategoryContext, {Category} from "../contexts/CategoryContext";
import {CartStore} from "../contexts/CartContext";


function MyCategoryBookList() {
    const {catId} = useParams();

    axios.defaults.baseURL = "/TaYuanBookstoreReactTransact/api/";
    const [bookData, setBookData] = useState([]);
    useEffect(() => {
        axios.get(`/categories/name/${catId}/books`).then((response) => {
            // console.log(response.data);
            setBookData(response.data);
        })
            .catch((err)=>{console.log(err)});
    }, [catId]); // the effect should run each time the catId changes!

    // console.log(bookData);

    const {cart} = useContext(CartStore);
    const [cartQuantity, setCartQuantity] = useState(0);

    // Calculate the total quantity of items in the cart
    useEffect(() => {
        const curr_quantity = cart.reduce((total, item) => total + item.quantity, 0);
        setCartQuantity(curr_quantity);
    }, [cart]);
    return (
        <main>
            <nav className="headerNav">
                <ul>
                    <li><Link to="/">Homepage</Link></li>
                    <li><Link to="#">Featuring</Link></li>

                    <li>
                        <CategoryContext>
                            <HeaderDropdown/>
                        </CategoryContext>
                    </li>

                    <li>
                        <Link className="login" to="#"><svg className="user-icon"></svg>Login</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="check-out">
                            Check Out
                            <svg className="cart"></svg>
                        </Link>

                        <span className="count">{ cartQuantity }</span>
                    </li>
                </ul>
            </nav>
            <CategoryNav/>
            <ul className="category-books">
                {
                    bookData.map((book:BookItem) => (
                        <MyCategoryBookListItem
                            key={book.bookId}
                            bookId = {book.bookId}
                            categoryId={book.categoryId}
                            author = {book.author}
                            // description = {book.description}
                            // isFeatured = {book.isFeatured}
                            isPublic={book.isPublic}
                            price = {book.price}
                            // rating = {book.rating}
                            title = {book.title}
                    />

                    ))
                }
                {/*{*/}
                {/*    myTextbookList.map((book:BookItem) => (*/}
                {/*        <MyCategoryBookListItem  bookId={book.bookId} isPublic={book.isPublic} price={book.price} title={book.title} author={book.author}/>))*/}
                {/*}*/}
            </ul>
        </main>
    )
}

export default MyCategoryBookList;