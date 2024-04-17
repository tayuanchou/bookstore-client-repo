import {ShoppingCartItem, BookItem} from "../types";
import {Dispatch, ReducerAction} from "react";


export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR',
    THROW:'THROW'
};

export type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE'  | 'CLEAR' | 'THROW';
    item: BookItem;
}
export const cartReducer = (state:ShoppingCartItem[], action:AppActions) => {
    const storageKey = "cart";
    switch (action.type) {
        case CartTypes.ADD:
            // Check if the item is already in the cart
            const existingItem = state.find((item) => item.id === action.id);

            if (existingItem) {
                // If it's in the cart, create a new copy with incremented quantity
                const updatedCart = state.map((item) =>
                    item.id === action.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                localStorage.setItem(storageKey, JSON.stringify(updatedCart));
                return updatedCart;
            } else {
                // If it's not in the cart, add a new item
                const newItem: ShoppingCartItem = {
                    id: action.id,
                    book: action.item,
                    quantity: 1,
                };
                const updatedCart = [...state, newItem];
                localStorage.setItem(storageKey, JSON.stringify(updatedCart));
                return updatedCart;
            }
        case CartTypes.REMOVE:
            let removedCart  = state.map((item) =>
                item.id === action.id
                    ? {...item, quantity: item.quantity - 1}
                    : item
            )
            removedCart = removedCart.filter((item) => item.quantity > 0);
            localStorage.setItem(storageKey, JSON.stringify(removedCart));
            return removedCart.filter((item) => item.quantity > 0);
        case CartTypes.CLEAR:
            localStorage.setItem(storageKey, JSON.stringify([]));
            return [];
        case CartTypes.THROW:
            let newCart = state.map((item) =>
                item.id === action.id
                ? {...item, quantity: 0}
                    : item
            );
            newCart = newCart.filter((item) => item.quantity > 0);
            localStorage.setItem(storageKey, JSON.stringify((newCart)));
            return newCart;
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};