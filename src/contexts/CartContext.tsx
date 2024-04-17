import {createContext, Dispatch, useReducer} from "react";
import {cartReducer} from "../reducers/CartReducer";
import { ShoppingCartItem } from "../types";

export const initialCartState:ShoppingCartItem[] =  [];
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: [] as ShoppingCartItem[],
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

// the rest of the code comes here
function CartContext ({children} : {children: React.ReactNode}) {
    const storageKey = "cart";
    const [cart, dispatch] = useReducer(cartReducer, initialCartState,
        (initialState) => {
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },);


    return (
        <CartStore.Provider value={{cart, dispatch}}>
            {children}
        </CartStore.Provider>
    );
}

export default CartContext;