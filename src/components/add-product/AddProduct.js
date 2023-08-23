import './AddProduct.css'
import React from 'react';
import {useState,useEffect} from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { addItem } from '../../slices/productSlice';


function AddProduct(){
    let  {count,errorMessage}=useSelector(state=>state.login)

    let dispatch=useDispatch()

    let navigate = useNavigate();

    let [ProdErr,setProdErr]=useState('')

    let [image,setImage]=useState()

    let {register,handleSubmit,formState:{errors}} = useForm();

      //this function will be called when user selects an image
  const onImageSelect=(event)=>{
    setImage(event.target.files[0])
   }

    let addProduct = async(productObj)=>{
        //get FormData object
    let formData=new FormData()
    //add file 
    formData.append('photo',image,image.name)
    //add product obj
    formData.append('newProduct',JSON.stringify(productObj))
        // make http request to productObj
        // let res = await axios.post('http://localhost:4000/product-api/product',formData);
        // console.log(res);
        // if(res.status===201 && res.data.message==='created'){
        //     navigate('/admin-profile');
        // }
        let actionObj=addItem(formData);
        dispatch(actionObj)
    }

    // useEffect(()=>{
    //     if(errorMessage===''){
    //       navigate('/admin-profile')
    //     }
    // else{
    //     setProdErr(errorMessage);
    // }},[count])

    return(
        <div>
            <p className="display-3 text-info text-center">Add Product</p>
             {/* login error message
    {ProdErr.length!==0 && <p className='text-danger text-center display-6'>{errorMessage}</p>} */}
            <form className="w-50 mt-3 mx-auto" onSubmit={handleSubmit(addProduct)}>
                <label>Product Id</label>
                <input type="text" {...register('productId')} id="productId" className="form-control mb-3" />
                <label>Product Name</label>
                <input type="text" {...register('product_name')} id="product_name" className="form-control mb-3" />
                <label>Price</label>
                <input type="number" {...register('price')} id="price" className="form-control mb-3" />
                <input type="file" {...register('photo')} id="" className="form-control mb-3" onChange={onImageSelect} />
                <button className="btn btn-success mx-auto" type="submit" >Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct;
