import {useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import  "../assets/css/CartTable.css"
import { BookItem } from "../types";
import { CartStore } from "../contexts/CartContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {Link} from "react-router-dom";
import MyHomeBooks from "./MyHomeBooks";


const getBookImageUrl = function (book: BookItem): string {
        let filename = book.title.toLowerCase();
        filename = filename.replace(/ /g, "-");
        filename = filename.replace(/'/g, "");
        filename = filename + ".jpg";
        try {
            return require('../assets/images/books/' + filename);
        } catch (_) {
            return require('../assets/images/books/dune.jpg');
        }
    };
 function CartTable()
 {
     const {cart, dispatch} = useContext(CartStore);
     const [cartQuantity, setCartQuantity] = useState(0);
     const [cartCheck, setCartCheck] = useState(0);
     // Calculate the total quantity of items in the cart
     useEffect(() => {
         const curr_quantity = cart.reduce((total, item) => total + item.quantity, 0);
         const curr_check = cart.reduce((check, c) =>
             check + c.book.price * c.quantity, 0
         );
         setCartQuantity(curr_quantity);
         setCartCheck((curr_check));
     }, [cart]);
     // console.log(cart);

     const handleDecrease = (itemId: number) => {
         dispatch({ type: "REMOVE", id: itemId });
     };

     const handleIncrease = (itemId: number) => {
         dispatch({type: "ADD", id:itemId});
     }

     const handleClear = () => {
         dispatch({type: "CLEAR"});
     }

     const handleThrow = (itemId: number) => {
         dispatch({type: "THROW", id:itemId});
     }

     const navigate = useNavigate();

     return (
    <div className="cart-table">
        {cart.length === 0 ? (
            <section className="bookShowcase">
                <h2>
                    Your cart is empty...
                    <Link to="../categories/toppicks">Continue Shopping!</Link>

                </h2>
                {/*<div className="category-images container">*/}
                {/*    <MyHomeBooks />*/}
                {/*</div>*/}

            </section>
        ) : (

        <ul className = "cartBox">
            <li className="cart-buttons"><button className="clear-cart"
                        onClick={() => handleClear()}>Clear Cart</button></li>

            <li className="table-heading">
                <div className="heading-book">Book</div>
                <div className="heading-name">Name</div>
                <div className="heading-price">Price</div>
                <div className="heading-quantity">Quantity</div>
                <div className="heading-subtotal">Amount</div>
            </li>
    {/* TODO : You need to iterate through the cart and display book image, */}
    {/*        Book Title, unit price/quantity and total price for each item in the cart*/}
            {cart.map((cartItem) =>
                <li className="cart-item"
                    key={cartItem.id}>
                <div className="cart-book-image">
                    <img  className = "cart2" src={getBookImageUrl(cartItem.book)} alt="Book Cover" />
                </div>
                <div className="cart-book-title">{cartItem.book.title}</div>
                <div className="cart-book-price">${cartItem.book.price}</div>
                <div className="cart-book-quantity">
                    <button
                        className="icon-button dec-arrow-button"
                        onClick={() => handleDecrease(cartItem.id)}
                    >
                        <i className="fas fa-chevron-left">
                            <FontAwesomeIcon icon={faChevronLeft} /></i>
                    </button>
                    <span className="quantity">&nbsp;&nbsp;{cartItem.quantity}&nbsp;&nbsp;</span>
                    <button
                        className="icon-button inc-arrow-button"
                        onClick={() => handleIncrease(cartItem.id)}
                    >

                        <i className="fas fa-chevron-right">  <FontAwesomeIcon icon={faChevronRight} /></i>
                    </button>
                    <button className="remove-book"
                            onClick={() => handleThrow(cartItem.id)}>delete</button>
                </div>
                <div className="cart-book-subtotal">${cartItem.quantity * cartItem.book.price}</div>
            </li>)}
            <li className="subtotal">Subtotal ({cartQuantity}{cartQuantity > 1 ? " items" : " item"}): ${cartCheck}</li>
            <li className="cart-buttons">
                {/*<button className="clear-cart"*/}
                {/*onClick={() => handleClear()}>Clear Cart</button>*/}
                <button className="continue-shopping"
                onClick={() => navigate(-1)}>Continue Shopping</button>
                <Link to="../checkout">
                <button className="checkout">Proceed to Checkout</button>
                </Link>
            </li>

</ul>
            )}
</div>
 )
 }

export default CartTable;

