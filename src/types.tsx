// Contains all the custom types we want to use for our application
import Fictions from './assets/images/categories/FictionIcon.png';
import TopPicks from './assets/images/categories/quality.png';
import Textbooks from './assets/images/categories/TextbookIcon.png';
import Kids from './assets/images/categories/KidsIcon.png';



export interface BookItem {
  author: string;
  bookId: number;
  categoryId: number;
  title: string;
  // description: string;
  price: number;
  // rating: number;
  // isFeatured: boolean;
  isPublic: boolean;
}

// removed in p6, now we are using useContext
// export interface CatProp{
//   catList:CategoryItem[];
// }

export interface CategoryItem {
  categoryId: number;
  name: string;
}
export const categoryImages: Record<string, any> = {
  toppicks: TopPicks,
  textbooks: Textbooks,
  fictions: Fictions,
  kids: Kids
};
// The below code is deleted in project 5 because we are calling the data from our API
// export const categoryList = [
//   { categoryId: 1001, name: "TopPicks" },
//   { categoryId: 1002, name: "Textbooks" },
//   { categoryId: 1003, name: "Fictions" }
// ];

export const myHomeBookList = [
  {
    bookId: 1001,
    categoryId: 1002,
    title: "Java Programming",
    author: "Joyce Farrell",
    price: 13.31,
    isPublic: true,
  },
  {
    bookId: 1002,
    categoryId: 1001,
    title: "The Sweetness of Water",
    author: "Nathan Harris",
    price: 8,
    isPublic: true,
  },
  {
    bookId: 1003,
    categoryId: 1001,
    title: "Crying in H Mart",
    author: "Michelle Zauner",
    price: 10.97,
    isPublic: true,
  },
];
// The below code is deleted in p6
// export const myTextbookList = [
//   {
//     bookId: 1001,
//     title: "Java Programming",
//     author: "Joyce Farrell",
//     price: 13.31,
//     isPublic: true,
//   },
//   {
//     bookId: 1004,
//     title: "R for Data Science",
//     author: "Garret Wickham, Garret Grolemund",
//     price: 39.79,
//     isPublic: true,
//   },
//   {
//     bookId: 1005,
//     title: "Web Development with Django",
//     author: "Ben Shaw, Saurabh Badhwar, Chris Guest",
//     price: 45.99,
//     isPublic: true,
//   },
//   {
//     bookId: 1006,
//     title: "C++ Primer",
//     author: "Stanley B Lippman",
//     price: 56.34,
//     isPublic: true,
//   },
//   {
//     bookId: 1007,
//     title: "Statistics",
//     author: "David Freedman",
//     price: 14.95,
//     isPublic: true,
//   },
//   {
//     bookId: 1008,
//     title: "Grokking Deep Learning",
//     author: "Andrew Trask",
//     price: 42.36,
//     isPublic: true,
//   },
// ];
//
// export const bookList = [
//   {
//     bookId: 1001,
//     categoryId: 1002,
//     title: "Java Programming",
//     author: "Joyce Farrell",
//     price: 13.31,
//     isPublic: true,
//   },
//   {
//     bookId: 1002,
//     categoryId: 1001,
//     title: "The Sweetness of Water",
//     author: "Nathan Harris",
//     price: 8,
//     isPublic: true,
//   },
//   {
//     bookId: 1003,
//     categoryId: 1001,
//     title: "Crying in H Mart",
//     author: "Michelle Zauner",
//     price: 10.97,
//     isPublic: true,
//   },
//   {
//     bookId: 1004,
//     categoryId: 1002,
//     title: "R for Data Science",
//     author: "Garret Wickham, Garret Grolemund",
//     price: 39.79,
//     isPublic: true,
//   },
//   {
//     bookId: 1005,
//     categoryId: 1002,
//     title: "Web Development with Django",
//     author: "Ben Shaw, Saurabh Badhwar, Chris Guest",
//     price: 45.99,
//     isPublic: true,
//   },
//   {
//     bookId: 1006,
//     categoryId: 1002,
//     title: "C++ Primer",
//     author: "Stanley B Lippman",
//     price: 56.34,
//     isPublic: true,
//   },
//   {
//     bookId: 1007,
//     categoryId: 1002,
//     title: "Statistics",
//     author: "David Freedman",
//     price: 14.95,
//     isPublic: true,
//   },
//   {
//     bookId: 1008,
//     categoryId: 1002,
//     title: "Grokking Deep Learning",
//     author: "Andrew Trask",
//     price: 42.36,
//     isPublic: true,
//   },
// ];
//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
  id:number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.bookId;
    this.book = theBook;
    this.quantity = 1;
  }
}
// this is used by the reducer. You can define it on the CartReducer
export const initialCartState:ShoppingCartItem[] =  [];

export interface ContextProps {
  children: JSX.Element | JSX.Element[]
}


export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

// export interface OrderDetails {
//   order: Order;
//   customer: CustomerForm;
//   books: BookItem[];
// }

export interface ServerErrorResponse {
  reason: string;
  message: string;
  fieldName: string;
  error: boolean;
}

// added in p9
// export interface CustomerForm {
//     name: string;
//     address: string;
//     phone: string;
//     email: string;
//     ccNumber: string;
//     ccExpiryMonth: number;
//     ccExpiryYear: number;
// }

export interface Order {
    orderId: number;
    amount: number;
    dateCreated: number;
    confirmationNumber: number;
    customerId: number;
}

// export interface OrderDetails {
//     order: Order;
//     customer: CustomerForm;
//     books: BookItem[];
// }

export interface ServerErrorResponse {
    reason: string;
    message: string;
    fieldName: string;
    error: boolean;
}

// added in P10

export interface LineItem {
    bookId: number;
    orderId: number;
    quantity: number;
}
export interface Customer {
    customerName: string;
    address: string;
    phone: string;
    email: string;
    ccNumber: string;
    ccExpDate: number;
}

export interface OrderDetails {
    order: Order;
    customer: Customer;
    books: BookItem[];
    lineItems: LineItem[];
}