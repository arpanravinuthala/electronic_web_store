import './AddToCart.js';
import {useSelector} from 'react-redux';
import {useState,useEffect} from 'react';
import axios from 'axios';

function AddToCart() {

    let {currentUser}=useSelector(state=>state.login);

    let [cart,setCart] = useState([])
    let [cost,setCost] = useState(0)

    let val=0;
    async function cartProducts(){
      let res=await axios.get(`http://localhost:4000/user-api/cartProducts/${currentUser.username}`)
      setCart(res.data.payload);
      // console.log(res);
      // console.log(res.data.payload);
      currentUser.cart.map(cartItem=><div key={cartItem.productId}>
        val=val+cartItem.price
        
      </div>)
      setCost(val);

  }

    useEffect(()=>{
      cartProducts()
      },[])


      // console.log("products "+{products})

    return(
        <div className='container'>
        <center><h1>Total cart Items:{currentUser.cart.length}</h1></center>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 pt-4">
          {
            cart.map(cartItem=><div className='col' key={cartItem.productId} >
              <div className="card">
                <img src={cartItem.productImg} className='w-100' height='250px' width='200px' alt="" />
                  <div className="card-body mx-auto">
                    <span style={{ fontWeight: 'bold' }}>
                      <p>Product Id : {cartItem.productId}</p>
                      <p>Name : {cartItem.product_name}</p>
                      <p>Price : {cartItem.price}</p>
                       
                    </span>
                  </div>
              </div>
              
            </div>
            )
          }
        
        </div>
      </div>
    )
}


export default AddToCart;