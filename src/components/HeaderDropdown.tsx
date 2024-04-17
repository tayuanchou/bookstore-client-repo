import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
// import {categoryList} from '../types';
import { Link } from 'react-router-dom';
import {CategoryItem} from "../types";
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";


function HeaderDropdown() {
    const categories = useContext<CategoryItem[]>(Category);
  return (

      <div className="header-dropdown">
        <Link to="/categories" className="button categories-button">
            <svg className="categories-icon"></svg>
            Categories
        </Link>
        <ul>
         {categories.map((item) =>
             <li key={item.name}>
             <Link  to ={`/categories/${item.name}`}>
                 {item.name}
             </Link>
         </li>)}

        </ul>

</div>

)
}
export default HeaderDropdown

