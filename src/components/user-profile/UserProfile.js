import './UserProfile.css'
import {useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Link,Outlet} from 'react-router-dom';


function UserProfile(){

    let {currentUser}=useSelector(state=>state.login);
    let [text,setText]=useState('')

    const getDataFromProtectedRoute = async () => {
        //get token from local/session storage
        let token = localStorage.getItem("token");
        //make HTTP req to protected route
        let res = await axios.get(
          "http://localhost:4000/user-api/protected-route",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setText(res.data.message);
        };

    return(
        <div className="container">
      <p className="display-5 text-primary text-end">
        Welcome ,{currentUser.username}
        <img src={currentUser.profileImg} width='80px' alt="" style={{borderRadius:'50%'}} />
        </p>
        <ul className='nav justify-content-center'>
        <li className="nav-item">
          <Link className="nav-link" to='user-profile'>User Details</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='add-to-cart'>Cart Products</Link>
        </li>
      </ul>

      
        {/* <button
        className="btn btn-danger text-white d-block mx-auto"
        onClick={getDataFromProtectedRoute}
      >
        CartItems
      </button> */}
      
      <p className="display-1 text-center text-info">{text}</p>
      <Outlet />
        </div>

        
    )
}

export default UserProfile;