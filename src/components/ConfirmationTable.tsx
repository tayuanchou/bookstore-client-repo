import { asDollarsAndCents } from "../utils";

import { BookItem, OrderDetails } from '../types'
import '../assets/css/ConfirmationTable.css';
import {OrderDetailsStore} from "../contexts/OrderDetailsContext";
import {useContext} from "react";
import {Link} from "react-router-dom";


function ConfirmationTable() {
  const {orderDetails} = useContext(OrderDetailsStore);

    const getQuantityForBook = (bookId: number): number => {
        const lineItem = orderDetails?.lineItems.find(item => item.bookId === bookId);
        return lineItem ? lineItem.quantity : 0;
    };
    const getTotalQuantity = (orderDetails: OrderDetails): number => {
        return orderDetails.lineItems.reduce((total, lineItem) => total + lineItem.quantity, 0);
    }
    const getTitleForBook = (bookId: number): BookItem | undefined => {
        const bookItem = orderDetails?.books.find(book => book.bookId === bookId);
        return bookItem;
    }
    const getBookImageUrl = function (bookId: number): string {
        const book = getTitleForBook(bookId);
        if (!book) {
            return require('../assets/images/books/dune.jpg');
        }
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
    function calculateTotalOrderCost(orderDetails: OrderDetails): number {
        let totalCost = 0;

        orderDetails.lineItems.forEach(lineItem => {
            const book = orderDetails.books.find(book => book.bookId === lineItem.bookId);
            if (book) {
                totalCost += book.price * lineItem.quantity;
            }
        });

        return totalCost;
    }
// A helper function - optional to use
  const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
  return orderDetails.books[index];
};
  const totalQ = orderDetails ? getTotalQuantity(orderDetails) : 0;
  const price = orderDetails　? calculateTotalOrderCost(orderDetails) : 0;
  return (
      <div className="confirmation-summary">

              <ul className = "confirmation-box">

                  <li className="confirmation-heading">
                      <div className="heading-book">Book</div>
                      <div className="heading-name">Name</div>
                      <div className="heading-price">Price</div>
                      <div className="heading-quantity">Quantity</div>
                      <div className="heading-subtotal">Amount</div>
                  </li>
                  {orderDetails?.books?.map((book, i) =>
                      <li className="confirmation-item"
                          key={i}>
                          <div className="cart-book-image">
                              <img  className = "cart2" src={getBookImageUrl(book.bookId)} alt="Book Cover" />
                          </div>
                          <div className="cart-book-title">{book.title}</div>
                          <div className="cart-book-price">${book.price}</div>
                          <div className="cart-book-quantity">

                              <span className="quantity">{getQuantityForBook(book.bookId)}</span>


                          </div>
                          <div className="cart-book-subtotal">${getQuantityForBook(book.bookId)*book.price}</div>
                      </li>)}
                  <li className="subtotal">Subtotal ({totalQ}{totalQ > 1 ? " items" : " item"}): ${price.toFixed(2)}</li>
                  <li className="subtotal">Tax: ${(price * 0.1).toFixed(2)}</li>
                  <li className="subtotal">Total: ${(price * 1.1).toFixed(2)}</li>

              </ul>



      </div>
  )}

export default ConfirmationTable;