import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems:[],
        cartTotalQuantity:0,
        cartTotalAmount:0,
    },
    reducers:{
        addToCart(state,action){
            state.cartItems.push(action.payload);
        }
        }
    })

export const {addToCart} =cartSlice.actions;
export default cartSlice.reducer;