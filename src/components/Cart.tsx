import CartTable from "./CartTable";
import React, {useContext, useEffect, useState} from "react";
import { CartStore } from "../contexts/CartContext";
import {Link} from "react-router-dom";
import CategoryContext from "../contexts/CategoryContext";
import HeaderDropdown from "./HeaderDropdown";
import "../assets/css/Cart.css";
function Cart() {
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
                        <Link to="/cart" className="check-out active">
                            Check Out
                            <svg className="cart"></svg>
                        </Link>

                        <span className="count">{ cartQuantity }</span>
                    </li>
                </ul>
            </nav>
            <CartTable/>
        </main>

    );
}
export default Cart;