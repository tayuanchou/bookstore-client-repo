import '../assets/css/MyCategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem, ShoppingCartItem} from "../types";
import {useContext} from "react";
import {CartTypes} from "../reducers/CartReducer";
import {CartStore} from "../contexts/CartContext";

const bookImageFileName =  (book:BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.jpg`;
};

function MyCategoryBookListItem(props:BookItem) {
    const  {dispatch} = useContext(CartStore);
    const addBookToCart = () => {
        dispatch({ type: CartTypes.ADD, item: props, id: props.bookId });
        // console.log("success");
    };

    return (

        <li className="book-box">

            <div className="book-image">
                <img src={require('../assets/images/books/' + bookImageFileName(props))}
                     alt="book.title"
                />
                <div className="img-read">
                    {props.price <= 12 ? (<button className="read-button">
                        <svg className="read-icon"></svg>
                        Read
                    </button>) : (<div></div>)}

                </div>

            </div>
            <div className="book-title">{props.title }</div>
            <div className="book-author">by { props.author }</div>
            <div className="book-price">${ props.price  }</div>
            <button className="button" onClick={addBookToCart}>Add to Cart</button>

        </li>

    )
}
export default MyCategoryBookListItem;