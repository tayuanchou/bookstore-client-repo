import {createContext, Dispatch, useEffect, useReducer, useState} from "react";
import {OrderDetails} from "../types";
import {OrderDetailsReducer} from "../reducers/OrderDetailsReducer";

export const OrderDetailsStore = createContext<{
    orderDetails: OrderDetails | null;
    dispatch: Dispatch<any>;
}>({
    orderDetails: null,
    dispatch: () => null
    }
);
OrderDetailsStore.displayName = 'OrderDetailsContext';

function OrderDetailsContext ({ children } : {children: React.ReactNode}) {
    const initialState = (): OrderDetails | null => {
        const storedState = sessionStorage.getItem('orderDetails');
        return storedState ? JSON.parse(storedState) as OrderDetails : null;
    };
    const [orderDetails, dispatch] = useReducer(OrderDetailsReducer, null, initialState);
    useEffect(() => {
        sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    }, [orderDetails]);
    return (
        <OrderDetailsStore.Provider value={{orderDetails, dispatch}}>
            {children}
        </OrderDetailsStore.Provider>
    );
}

export default OrderDetailsContext;

