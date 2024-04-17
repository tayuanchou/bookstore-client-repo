import '../assets/css/global.css';
import {Link} from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown";
import CategoryContext from "../contexts/CategoryContext";
import {useContext, useEffect, useState} from "react";
import {CartStore} from "../contexts/CartContext";

function Checkout(){

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
                        <Link to="#" className="check-out">
                            Check Out
                            <svg className="cart"></svg>
                        </Link>

                        <span className="count">{ cartQuantity }</span>
                    </li>
                </ul>
            </nav>
            <h1>This is the Confirmation page.</h1>
        </main>
    );
}

export default Checkout;