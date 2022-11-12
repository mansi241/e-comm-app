import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        value:[]
    },
    reducers:{    //reducers only work with synchronous operation, reducers are synchronous by default
        addToCart(state, action){
            console.log(action);
            state.value.push(action.payload);    //immerjs create a copy of state and replace with existing one, with immer we can directly update state, behind the scene it does create a copy, and the state remains immutable
            //redux toolkit uses immer under the hood
        }
    }
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;