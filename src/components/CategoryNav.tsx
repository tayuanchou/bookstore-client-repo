// import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import '../assets/css/CategoryNav.css'
import {categoryImages, CategoryItem} from '../types';
import {Link, useParams} from "react-router-dom";
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";

function CategoryNav() {
  const {catId} = useParams();
  const categories = useContext<CategoryItem[]>(Category);
  return (
  <nav className="categories-nav">
    <ul>
      {categories.map((category) => (
          <li key={category.categoryId}>
            <Link to={`/categories/${category.name}`} className={category.name === catId ? "active" : "" }>
              <img src={categoryImages[category.name.toLowerCase()]}
                   alt={category.name}/>
              {category.name}
            </Link>

          </li>
      ))}
    </ul>

  </nav>
)
}

export default CategoryNav;

