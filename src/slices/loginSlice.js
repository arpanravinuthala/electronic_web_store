import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

let userOrAdmin=0;
//make HTTP POST req for user login
export let userLogin=createAsyncThunk('login',async(userCredObj,thunkApi)=>{
    if(userCredObj.userType === "user"){
        let res=await axios.post('http://localhost:4000/user-api/user-login',userCredObj)
        console.log("res is ",res)
        userOrAdmin=1;
        if(res.data.message==='login success'){
            // store token in local/session storage
            localStorage.setItem('token',res.data.token)
            console.log(res);
            return res.data;
        }
        else{
            return thunkApi.rejectWithValue(res.data)
        }
    }else{
        let res=await axios.post('http://localhost:4000/admin-api/admin-login',userCredObj)
        console.log("res is ",res)
        userOrAdmin=0;
        if(res.data.message==='login success'){
            // store token in local/session storage
            localStorage.setItem('token',res.data.token)
            return res.data;
        }
        else{
            return thunkApi.rejectWithValue(res.data)
        }
    }
})

const loginSlice=createSlice({
    name:'login',
    initialState:{
        currentUser:{},
        userLoginStatus:false,
        adminLoginStatus:false,
        isPending:false,
        errorMessage:'',
        // cartProducts:[],
    },
    reducers:{
        clearState:(state,action)=>{
            state.currentUser={};
            state.userLoginStatus=false;
            state.adminLoginStatus=false;
            state.isPending=false;
            state.errorMessage='';
            // state.cartProducts=[];
        },
        addToCart:(state,action)=>{
            state.currentUser.cart.push(action.payload);
            console.log("action",action);
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state,action)=>{
           state.isPending=true;
            console.log("pending");
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            console.log("action in fulfilled",action)
            state.currentUser=action.payload.currentUser;
            if(userOrAdmin===1){
            state.userLoginStatus=true;
            state.adminLoginStatus=false;
            }
            if(userOrAdmin===0){
                state.userLoginStatus=false;
                state.adminLoginStatus=true;
            }
            state.isPending=false;
            state.errorMessage=''
        })
        .addCase(userLogin.rejected,(state,action)=>{
            console.log("action in rejected",action)
            state.errorMessage=action.payload.message;
            state.currentUser={};
            state.isPending=false;
            state.userLoginStatus=false;
            state.adminLoginStatus=false;
            // state.cartProducts=[];
        })
    }
})


//export action creator functions
export const {clearState,addToCart}=loginSlice.actions;
//export reducer of this slice
export default loginSlice.reducer;
