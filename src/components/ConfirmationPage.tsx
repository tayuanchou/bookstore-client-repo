import ConfirmationTable from "./ConfirmationTable";
import {OrderDetailsStore} from "../contexts/OrderDetailsContext";
import '../assets/css/ConfirmationPage.css';
import '../assets/css/global.css';
import {Link} from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown";
import CategoryContext from "../contexts/CategoryContext";
import {useContext, useEffect, useState} from "react";
import {CartStore} from "../contexts/CartContext";


function ConfirmationPage()
{
    const {cart} = useContext(CartStore);
    const [cartQuantity, setCartQuantity] = useState(0);

    // Calculate the total quantity of items in the cart
    useEffect(() => {
        const curr_quantity = cart.reduce((total, item) => total + item.quantity, 0);
        setCartQuantity(curr_quantity);
    }, [cart]);

    const {orderDetails} = useContext(OrderDetailsStore);

    const orderDate =  () => {
        if (orderDetails?.order?.dateCreated) {
            const date = new Date(orderDetails.order.dateCreated);
            return date.toLocaleString();
        }
        return "";
    };
    const ccExpDate =  () =>{
        if (orderDetails?.customer?.ccExpDate) {
            return new Date(orderDetails.customer.ccExpDate);
        }
        return null;
    };
    const hideCreditCardNumber = (ccNumber:string | undefined) => {
        if (!ccNumber) return'';
        const masked = ccNumber.slice(0, -4).replace(/./g, '*');
        const visible = ccNumber.slice(-4);
        return masked + visible;
    }

    return(
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
            {orderDetails === null ? (<section className="bookShowcase">
                    <h2>
                        Your have not place an order yet...
                        <Link to="../categories/toppicks">Continue Shopping!</Link>

                    </h2>
                    {/*<div className="category-images container">*/}
                    {/*    <MyHomeBooks />*/}
                    {/*</div>*/}

                </section>) :
                (
            <div className="confirmation-page-body">
                <div className="confirmation-details">
                    <ul>
                        <li><h2>Order Confirmation</h2></li>
                        <li><b>Confirmation Number:</b> {orderDetails?.order?.confirmationNumber}</li>
                        <li><b>Date:</b> {orderDate()}</li>
                        <li><b>Name:</b> {orderDetails?.customer?.customerName}</li>
                        <li><b>Address:</b> {orderDetails?.customer?.address}</li>
                        <li><b>Email:</b> {orderDetails?.customer?.email}</li>
                        <li><b>Phone:</b> {orderDetails?.customer?.phone}</li>
                        <li><b>Credit Card:</b> {hideCreditCardNumber(orderDetails?.customer?.ccNumber)}</li>
                    </ul>
                </div>
                <ConfirmationTable />
            </div>)}
        </main>
    )
}
export default ConfirmationPage;