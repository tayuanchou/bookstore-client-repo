import {useState, createContext, useEffect} from "react";
import {CategoryItem} from "../types";
import axios from "axios";

export const Category = createContext<CategoryItem[] | []>([]);   // creates a context called Category
Category.displayName = 'CategoryContext';

function CategoryContext ({ children } : {children: React.ReactNode})  {
    const [categories, setCategories] = useState([]);
    axios.defaults.baseURL = "/TaYuanBookstoreReactTransact/api/";
    useEffect(() => {
        axios.get("categories/")
            .then((response) => {setCategories(response.data);})
            .catch((err) => console.log(err));
    }, []);
    // console.log(categories);

    return (
        <Category.Provider value ={categories}>
            {children}
        </Category.Provider>
    );
}
export default CategoryContext;