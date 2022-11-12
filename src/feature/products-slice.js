import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllProducts = createAsyncThunk("products/fetchAll", async()=>{
    const response = await fetch("https://fakestoreapi.com/products");
    //returns a promise
    //products/fetchAll : action name
    return (await response.json());
})

const productsSlice = createSlice({
    name:"products",
    initialState:{
        value:[],
        loading:false
    },
    //cannot use a regular reducer for async operation
    extraReducers:(builder)=>{

        builder.addCase(fetchAllProducts.pending,(state)=>{
            //callback when promise is pending
            //IMP : Don't forget to add state in the parameter, to use it.
            state.loading = true;
        });      
        
        
        builder.addCase(fetchAllProducts.fulfilled, (state, action)=>{
            //when promise case is fulfilled
            state.value = action.payload;              //response will be available in payload
            state.loading = false;
        })
    }
})

export default productsSlice.reducer;