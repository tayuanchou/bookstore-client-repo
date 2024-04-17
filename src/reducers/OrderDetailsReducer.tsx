import {OrderDetails} from "../types";

export const OrderDetailsTypes = {
    CLEAR:'CLEAR',
    UPDATE: 'UPDATE'
};
export type OrderActions = {
    id: number;
    type: 'CLEAR' | 'UPDATE';
    item: OrderDetails;
}

export const OrderDetailsReducer = (state: OrderDetails | null, action: OrderActions): OrderDetails | null => {
    switch (action.type) {
        case OrderDetailsTypes.UPDATE:
            return action.item;
        case OrderDetailsTypes.CLEAR:
            return null;
        default:
            return state;
    }
};