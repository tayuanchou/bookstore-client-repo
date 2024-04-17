import '../assets/css/global.css';
import '../assets/css/Checkout.css';
import {Link, useNavigate} from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown";
import CategoryContext from "../contexts/CategoryContext";
import {FormEvent, ChangeEvent, useContext, useEffect, useState} from "react";
import {CartStore} from "../contexts/CartContext";
import {BookItem, CustomerForm, months, OrderDetails, years} from "../types";
import {isCreditCard, isMobilePhone, isvalidEmail} from "../utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import axios from "axios";
import {CartTypes} from "../reducers/CartReducer";
import {OrderDetailsStore} from "../contexts/OrderDetailsContext";
import {OrderDetailsTypes} from "../reducers/OrderDetailsReducer";


function Checkout(){

    const {cart, dispatch: cartDispatch} = useContext(CartStore);
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

    const getBookImageUrl = function (book: BookItem): string {
        let filename = book.title.toLowerCase();
        filename = filename.replace(/ /g, "-");
        filename = filename.replace(/'/g, "");
        filename = filename + ".jpg";
        try {
            return require('../assets/images/books/' + filename);
        } catch (_) {
            return require('../assets/images/books/why.jpg');
        }
    };

    /*
     * This will be used by the month and year expiration of a credit card
     *  NOTE: For example yearFrom(0) == <current_year>
    */
    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }

    const navigate = useNavigate();




    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ccNumberError, setCcNumberError] = useState("");
    // TO DO error states for the rest of the input elements

    const [formData, setFormData] = useState({name: "",address:"", phone:"",email: "",ccNumber: "", ccExpiryMonth:0,ccExpiryYear:1});

    const [checkoutStatus, setCheckoutStatus] = useState("");

    function isValidForm()
    {
        if (formData.name.length < 4 ||
            formData.name.length > 45 ||
            formData.address.length < 4 ||
            formData.address.length > 45 ||
            !isMobilePhone(formData.phone) ||
            !isvalidEmail(formData.email) ||
            !isCreditCard(formData.ccNumber)) {
            return false;
        }

        return true;
    }

    async function submitOrder(event:FormEvent) {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect =  isValidForm();
        console.log(isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if(orders) {
                setCheckoutStatus("OK");
                navigate('/confirmation');}
            else{
                setCheckoutStatus("ERROR");
                console.log("Error placing order");
            }
        }
    }

    // cart table functions here (copied from CartTable.tsx)
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
        cartDispatch({ type: "REMOVE", id: itemId });
    };

    const handleIncrease = (itemId: number) => {
        cartDispatch({type: "ADD", id:itemId});
    }

    const handleClear = () => {
        cartDispatch({type: "CLEAR"});
    }

    const handleThrow = (itemId: number) => {
        cartDispatch({type: "THROW", id:itemId});
    }



    const {dispatch: orderDetailsDispatch} = useContext(OrderDetailsStore);
    const placeOrder =  async (customerForm: CustomerForm) =>  {

        const order = { customerForm: customerForm, cart:{itemArray:cart} };
        const orders = JSON.stringify(order);
        console.log(orders);     //you can uncomment this to see the orders JSON on the console
        const url = '/orders';
        const orderDetails: OrderDetails = await axios.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                cartDispatch({type: CartTypes.CLEAR});
                console.log(response.data);
                const { order, customer, books, lineItems } = response.data;
                const newOrder = {
                    order,
                    customer,
                    books,
                    lineItems
                };
                orderDetailsDispatch({type: OrderDetailsTypes.UPDATE,
                    item: newOrder});
                return response.data;
            })
            .catch((error)=>console.log(error));
        console.log("order deatils: ", orderDetails);
        return orderDetails;
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        const { name, value } = event.target;

        switch (name) {
            case 'name':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(value.length < 4 || value.length > 45) {
                    setNameError("Name must be at least 4 characters long!");
                }
                else {
                    setNameError("");
                }
                break;
            case 'address':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(value.length < 4 || value.length > 45) {
                    setAddressError("Address must be at least 4 characters long!");
                }
                else {
                    setAddressError("");
                }
                break;
            case 'phone':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(!isMobilePhone(value)) {
                    setPhoneError("Not a valid phone number!");
                }
                else {
                    setPhoneError("");
                }

                break;
            case 'email':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(!isvalidEmail(value)) {
                    setEmailError("Not a valid email address!");
                }
                else {
                    setEmailError("");
                }

                break;
            case 'ccNumber':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(!isCreditCard(value)) {
                    setCcNumberError("Wrong credit card number!");
                }
                else {
                    setCcNumberError("");
                }

                break;
            case 'ccExpiryMonth':
                setFormData((prevFormData) => ({...prevFormData, [name]:parseInt(value,10)}));
                break;
            case 'ccExpiryYear':
                setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value,10)}));
                break;
            default:
                break;
        }
    }

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
                <div>
            <div className="cart-table">

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

                    </ul>

            </div>
                    <section className="checkout-page-body">
                        <div className="payment-information">
                            <h1>Payment Information</h1>
                            <h3>Please enter personal information to confirm purchase.</h3>
                            <form
                                className="checkout-form"
                                onSubmit ={(event)=>submitOrder(event)}
                                method="post"
                            >
                                <div>
                                    <label htmlFor="fname">Name</label>
                                    <input
                                        type="text"
                                        size={20}
                                        name="name"
                                        id="fname"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <> {nameError && <div className="error"> {nameError}</div>}</>

                                {/*  TO DO add the form elements for phone, address, email, and Credit card*/}
                                {/* Together with the error display*/}
                                <div>
                                    <label htmlFor="faddress">Address</label>
                                    <input
                                        type="text"
                                        size={20}
                                        name="address"
                                        id="faddress"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <> {addressError && <div className="error"> {addressError}</div>}</>

                                <div>
                                    <label htmlFor="fphone">Phone</label>
                                    <input
                                        type="text"
                                        size={20}
                                        name="phone"
                                        id="fphone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <> {phoneError && <div className="error"> {phoneError}</div>}</>

                                <div>
                                    <label htmlFor="femail">Email</label>
                                    <input
                                        type="text"
                                        size={20}
                                        name="email"
                                        id="femail"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <> {emailError && <div className="error"> {emailError}</div>}</>

                                <div>
                                    <label htmlFor="fccNumber">Card</label>
                                    <input
                                        type="text"
                                        size={20}
                                        name="ccNumber"
                                        id="fccNumber"
                                        value={formData.ccNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <> {ccNumberError && <div className="error"> {ccNumberError}</div>}</>

                                <div>
                                    <label htmlFor="ccExpiryMonth">Exp Date</label>
                                    <section className="expiration-selectors">
                                        <section className="expiration-selector">
                                            <select style={{color:'black'}} name ="ccExpiryMonth" value ={formData.ccExpiryMonth} onChange={handleInputChange}>
                                                { months.map((month, i) => (
                                                    <option  key={i}  value={i + 1}  >
                                                        { month }
                                                    </option>
                                                ))}
                                            </select>
                                        </section>
                                        {/*TO DO the select input for the expiration year. Read the spec */}
                                        {/* about this*/}
                                        {/*<label htmlFor="ccExpiryYear">Exp Date</label>*/}
                                        <section className="expiration-selector">
                                            <select style={{color:'black'}} name ="ccExpiryYear" value ={formData.ccExpiryYear} onChange={handleInputChange}>
                                                { years.map((i) => (
                                                    <option  key={i}  value={yearFrom(i)}  >
                                                        { yearFrom(i) }
                                                    </option>
                                                ))}
                                            </select>
                                        </section>
                                    </section>
                                </div>
                            </form>
                        </div>

                        {/* TO DO the checkout box with the total cost, tax) */}
                        {/* and the Complete Purchase button comes here*/}
                        <div className="order-summary">
                            <h1>Order Summary</h1>
                            <h3>Please check the consumption amount before completing purchase.</h3>
                            <br/>
                            <div className="order-summary-item">
                                <h3 className="order-summary-row">Cart total:</h3>
                                <h3 className="order-summary-row">${cartCheck.toFixed(2)}</h3>
                            </div>
                            <div className="order-summary-item">
                                <h3 className="order-summary-row">Tax:</h3>
                                <h3 className="order-summary-row">${(cartCheck * 0.1).toFixed(2)}</h3>
                            </div>
                            <div className="order-summary-item">
                                <h3 className="order-summary-row">Total:</h3>
                                <h3 className="order-summary-row">${(cartCheck*1.1).toFixed(2)}</h3>
                            </div>

                            <Link to="#">
                                <button className="complete-purchase"
                                        onClick={submitOrder}
                                        type="submit">Complete Purchase</button>
                            </Link>
                            <div>
                                {/*The following code displays different string based on the */}
                                {/*value of the checkoutStatus*/}
                                {/*Note the ternary operator*/}
                                {
                                    checkoutStatus !== ''?
                                        <>
                                            <section className="checkoutStatusBox" >
                                                { (checkoutStatus === 'ERROR')?
                                                    <div className="error">
                                                        Error: Please fix the problems in payment information before proceeding.
                                                    </div>: ( checkoutStatus === 'PENDING'?
                                                        <div>
                                                            Processing...
                                                        </div> : (checkoutStatus === 'OK'?
                                                            <div>
                                                                Order placed...
                                                            </div>:
                                                            <div>
                                                                An unexpected error occurred, please try again.
                                                            </div>))}
                                            </section>
                                        </>
                                        :<></>}
                            </div>
                        </div>
                    </section>
                </div>
)}
        </main>
    );
}

export default Checkout;