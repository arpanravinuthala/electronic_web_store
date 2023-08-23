import './AvailableProducts.css'
import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios'

function AvailableProducts(){

    let [products,setProducts] = useState([])

    async function getAllProducts(){
        let res=await axios.get('http://localhost:4000/product-api/products')
        setProducts(res.data.payload);
        console.log(res);
        console.log(res.data.payload);
    }

    useEffect(()=>{
    getAllProducts()
    },[])

    return(
        <div className='container'>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 pt-4">
          {
            products.map(productObj=><div className='col' key={productObj.productId}>
              <div className="card">
                <img src={productObj.productImg} className='w-100' height='250px' width='200px' alt="" />
                  <div className="card-body mx-auto">
                    <span style={{ fontWeight: 'bold' }}>
                      <p>Product Id : {productObj.productId}</p>
                      <p>Name : {productObj.product_name}</p>
                      <p>Price : {productObj.price}</p>
                    </span>
                  </div>
              </div>
            </div>)
          }
        </div>
      </div>
    )
}

export default AvailableProducts;