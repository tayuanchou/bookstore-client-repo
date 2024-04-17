import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home';
import MyCategoryBookList from './components/MyCategoryBookList';
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import './types';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from "axios";
import {Category} from "./contexts/CategoryContext";
import ConfirmationPage from "./components/ConfirmationPage";
import OrderDetailsContext, {OrderDetailsStore} from "./contexts/OrderDetailsContext";

function App() {

    const [categories, setCategories] = useState([]);
    axios.defaults.baseURL = "/TaYuanBookstoreReactTransact/api/";
    useEffect(() => {
        axios.get("categories/")
            .then((response) => {setCategories(response.data);})
            .catch((err) => console.log(err));
    }, []);
    // console.log(categories);

  return (
      <Category.Provider value={categories}>
          <OrderDetailsContext>
      <Router basename = {"TaYuanBookstoreReactTransact"}>
        <AppHeader />
        <Routes>

          <Route path="/" element={<Home/>} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/categories" element={<MyCategoryBookList/>} >

            <Route path=":catId" element={<MyCategoryBookList/>} />

        </Route>
          <Route path="*" element={<div>Page Not Found</div>} />

        </Routes>

        <AppFooter />

      </Router>
          </OrderDetailsContext>
      </Category.Provider>
  );
}

export default App;

