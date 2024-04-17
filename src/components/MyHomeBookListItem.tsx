import '../assets/css/MyHomeBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";

const bookImageFileName =  (book:BookItem) => {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.jpg`;
};

function MyHomeBookListItem(props:BookItem) {
return (

  <li className="book-box">
   <div className="book-image">
      <img src={require('../assets/images/books/' + bookImageFileName(props))}
        alt="book.title"
      />
    </div>
    <div className="book-title">{props.title }</div>
    <div className="book-author">{ props.author }</div>
    {/*<div className="book-price">${ props.price  }</div>*/}
  </li>

)
}
export default MyHomeBookListItem;