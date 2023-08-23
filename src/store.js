import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice'
import productReducer from './slices/productSlice'
// import cartReducer from './slices/cartSlice'

export const store=configureStore({
    reducer:{
        login:loginReducer,
        product:productReducer
        // cart:cartReducer
    }
})