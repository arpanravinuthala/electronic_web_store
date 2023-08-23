import './Home.css'
import React from 'react';
import {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios'
import {addToCart} from '../../slices/loginSlice.js';
import Banner from "../../images/home_banner.jpg";
import Banner1 from "../../images/home_banner1.jpg";
import Banner2 from "../../images/home_banner2.png";
import Banner3 from "../../images/home_banner3.jpg";
import Banner4 from "../../images/home_banner4.jpg";
import Banner5 from "../../images/home_banner5.jpg";

function Home(){

     let [products,setProducts] = useState([])

     let {currentUser,userLoginStatus,adminLoginStatus}=useSelector(state=>state.login);
    let [text,setText]=useState('')


     async function getAllProducts(){
        let res=await axios.get('http://localhost:4000/product-api/products')
        setProducts(res.data.payload);
        console.log(res);
        console.log(res.data.payload);
    }

    let dispatch = useDispatch();

    useEffect(()=>{
    getAllProducts()
    },[])

    const toCart= async (productObj)=>{
      let res = await axios.get(`http://localhost:4000/product-api/product/${productObj.productId}`);
      // let actionObj=addToCart(productObj)
      // dispatch(actionObj);
      res.data.payload.user=currentUser.username;
      // console.log(res);
      let r=await axios.post('http://localhost:4000/user-api/add-to-cart',res.data.payload);
      console.log(r);
    }

     return(
        <div>
    <div
      className="article"
      style={{ backgroundImage: `url(${Banner5})` }}
    >
      <br /><br /><br /><br />
      <h1 className="header">Welcome</h1>
      <br /><br /><br /><br />
    </div>
    <div className="container" style={{color:'#03092b'}}>
            {(userLoginStatus===false && adminLoginStatus===false)? <>
            
            <center><h3 className="justify-items-end" >Please login to add products to the cart</h3></center>
            </>: <>{(userLoginStatus===true && adminLoginStatus===false)? <>
                <h3>Welcome, {currentUser.username}</h3></> :
                <center><h3>These are the products that you added</h3></center>}
                </>
}
        <div className='container'>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 pt-4 pb-4">
          {
            products.map(productObj=><div className='col pt-4' key={productObj.productId}>
              <div className="card " >
                <img src={productObj.productImg} className='w-100' height='250px' width='200px' alt="" />
                  <div className="card-body mx-auto ">
                    <span style={{ fontWeight: 'bold',color:'#253890'}}>
                      <p>Product Id : {productObj.productId}</p>
                      <p>Name : {productObj.product_name}</p>
                      <p>Price : {productObj.price}</p>
                    </span>
                  </div>
                  {(userLoginStatus===true) ? <>
                    <button className="btn btn-primary" onClick={() => toCart(productObj)}>Add to Cart</button>
                      </> :<></>} 
              </div>
            </div>
            )
          }
        </div>
      </div>
      </div>
      </div>
    )
}

export default Home;