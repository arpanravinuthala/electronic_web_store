import './AdminProfile.css'
import React from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Link,Outlet} from 'react-router-dom';
import logo from '../../images/logo.webp'

function AdminProfile(){

    let {currentUser}=useSelector(state=>state.login);

   

    return(
        <div className="container">
      <p className="display-5 text-primary text-end">
        Welcome ,{currentUser.username}
        <img src={logo} width='80px' alt="" style={{borderRadius:'50%'}} />
        </p>
      <ul className='nav justify-content-center'>
        <li className="nav-item">
          <Link className="nav-link" to='addProduct'>AddProduct</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='avialableProducts'>Available Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='users'>Users</Link>
        </li>
      </ul>

      <Outlet />
        </div>
    )
}

export default AdminProfile;