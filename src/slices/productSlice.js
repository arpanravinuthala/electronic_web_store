import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// make http POST req to add product
export let addItem =createAsyncThunk('product',async(productCredObj,thunkApi)=>{
    let res=await axios.post('http://localhost:4000/product-api/product',productCredObj);
    console.log(res);
    if(res.data.message==='created'){
        return res.data;
    }else{
        return thunkApi.rejectWithValue(res.data);
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        currentProduct:{},
        isPending: false,
        count:0,
        errorMessage:''
    },
    reducers:{
        clearSlice:(state,action)=>{
            state.currentProduct={};
            state.isPending=false;
            state.count=0;
            state.errorMessage='';
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addItem.pending,(state,action)=>{
            console.log("pending",action);
            state.pending = true;
        })
        .addCase(addItem.fulfilled,(state,action)=>{
            console.log("fulfilled",action);
            state.currentProduct=action.payload.currentProduct;
            state.isPending=false;
            state.count=state.count+1;
            state.errorMessage='';
        })
        .addCase(addItem.rejected,(state,action)=>{
            console.log("failed",action);
            state.errorMessage=action.payload.message;
            state.currentProduct={};
            state.isPending=false;
        })
    }
})


// export action creator function
export const {clearState}=productSlice.actions;
// export reducers of this slice
export default productSlice.reducer;