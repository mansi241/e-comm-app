import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart-slice"
import categoriesReducer from "./feature/categories-slice";
import productsReducer from "./feature/products-slice";

export const store = configureStore({
    reducer : {
        cart: cartReducer,
        products: productsReducer,
        categories: categoriesReducer
    }
});

//create a store
//write a reducer createSlice - set initial state
//export cartSlice.reducer
//add in store
//add action : add reducer in createSlice to create an action addToCart(state, action)
//export cartSlice.actions
//useDispatch to dispatch an action
//in action update state by immer : state.value.push(action.payload) -> updates state value 
//useSelector to read state value
//reducers only work with synchronous operation, reducers are synchronous by default
//asynchronous action : thunk dispatches an async action, based on result it dispatches another action
//use log monitor in the bottom of redux extension to see why promise got rejected.
