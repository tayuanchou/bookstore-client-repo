

import  "../assets/css/checkout.css"



import { isCreditCard, isMobilePhone, isvalidEmail } from '../utils';
import {BookItem, CustomerForm, months, OrderDetails,  years} from "../types";
// import {CartStore} from "../Contexts/CartContext";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, useContext, useState} from "react";
import { useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";





function CheckoutPage()
{

   const getBookImageUrl = function (book: BookItem): string {
      let filename = book.title.toLowerCase();
      filename = filename.replace(/ /g, "-");
      filename = filename.replace(/'/g, "");
      filename = filename + ".gif";
      try {
         return require('../assets/images/books/' + filename);
      } catch (_) {
         return require('../assets/images/books/the-iliad.gif');
      }
   };

   /*
    * This will be used by the month and year expiration of a credit card
    *  NOTE: For example yearFrom(0) == <current_year>
   */
   function yearFrom(index: number) {
      return new Date().getFullYear() + index;
   }

   const {cart, dispatch} = useContext(CartStore);
   const navigate = useNavigate();


   const cartTotalPrice = 0; // TO DO code that calculates the total price of your cart

   const cartQuantity = 0 ; // TO DO the code that calculates the total number of items in your cart



   const [nameError, setNameError] = useState("");

   // TO DO error states for the rest of the input elements

   const [formData, setFormData] = useState({name: "",address:"", phone:"",email: "",ccNumber: "", ccExpiryMonth:0,ccExpiryYear:0});

   const [checkoutStatus, setCheckoutStatus] = useState("");

   function isValidForm()
   {
       //TO DO code that returns true is the customer form is valid, false otherwise

      return true;
   }

   // TO DO placeOrder function comes here. Needed for project 9 (not 8)

   function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {

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

            // TO DO for address Validation

            break;
         case 'phone':

            //TO DO for Phone validation

            break;
         case 'email':

           //TO DO for email validation

            break;
         case 'ccNumber':

            // TO DO for Credit card validation

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

  // TO DO submitOrder function comes here. See the project Spec

   return (
       <section className="checkout-cart-table-view">
          <div className="checkout-page-body">
             <div>
                <form
                    className="checkout-form"
                    // onSubmit ={(event)=>submitOrder(event)}
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

                   <div >
                      <label htmlFor="ccExpiryMonth">Exp Date</label>
                      <select style={{color:'black'}} name ="ccExpiryMonth" value ={formData.ccExpiryMonth} onChange={handleInputChange}>
                         { months.map((month, i) => (
                             <option  key={i}  value={i + 1}  >
                                { month }
                             </option>
                         ))}
                      </select>

                     {/*TO DO the select input for the expiration year. Read the spec */}
                     {/* about this*/}

                   </div>
                </form>
             </div>

             {/* TO DO the checkout box with the total cost, tax) */}
             {/* and the Complete Purchase button comes here*/}


                   <div>
                      {/*The following code displays different string based on the */}
                      {/*value of the checkoutStatus*/}
                      {/*Note the ternary operator*/}
                      {
                         checkoutStatus !== ''?
                             <>
                                <section className="checkoutStatusBox" >
                                   { (checkoutStatus === 'ERROR')?
                                       <div>
                                          Error: Please fix the problems above and try again.
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

          <div >
             {/*This displays the information about the items in the cart*/}
             <ul className="checkout-cart-info">
                {
                   cart?.map((item, i) => (
                       <div className ="checkout-cart-book-item">
                          <div className="checkout-cart-book-image"key = {i} >
                             <img src={getBookImageUrl(item.book)} alt="title" className ="checkout-cart-info-img"
                                  width="20%"
                                  height="20%"
                             />
                          </div>
                          <div className="checkout-cart-book-info">
                             <div className="checkout-cart-book-title">{ item.book.title }</div>

                             <div className="checkout-cart-book-subtotal">
                              {/*TO DO the total cost of this specific book displayed here*/}
                             </div>
                             <div className="checkout-cart-book-quantity">
                                <button  className="checkout-icon-button inc-button"      onClick={() => {
                                   dispatch({ type: CartTypes.ADD, book:item.book, id: item.book.bookId });
                                }} >
                                   <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle} /></i>
                                </button>
                                <button className="checkout-num-button">{ item.quantity }</button>
                                <button className="checkout-icon-button dec-button"
                                        onClick={() => {
                                           dispatch({ type: CartTypes.REMOVE, book:item.book, id: item.book.bookId });
                                        }}
                                >
                                   <i className="fas fa-minus-circle"><FontAwesomeIcon icon={faMinusCircle} /></i>
                                </button>
                             </div>
                          </div>

                       </div>
                   )) }
             </ul>
          </div>
       </section>
   )}

export default CheckoutPage;