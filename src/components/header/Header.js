import './Header.css'
import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { clearState } from "../../slices/loginSlice";
import logo from "../../images/logo.webp";


function Header(){
    let {userLoginStatus,adminLoginStatus}=useSelector(state=>state.login);
    let {currentUser}=useSelector(state=>state.login);


    let dispatch=useDispatch()

  const logOut=()=>{
    //remove token from local/session storage
    localStorage.removeItem('token')
    //reset user state
      let actionObj=clearState()
      dispatch(actionObj)
  }


    return(
        <div style={{backgroundColor:'#334d84'}}>
        {(userLoginStatus===false && adminLoginStatus===false)? <>
          <ul className="nav" >
          <li className="nav-item">
            <Link className="nav-link active" to="">
            <img src={logo} height="30px" width style={{borderRadius:'50%'}} />
          </Link>
          </li>
          <li className="nav-item ms-auto">
            <Link className="nav-link active" to="" style={{color:'white'}}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="register" style={{color:'white'}}>
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="login" style={{color:'white'}}>
              Login
            </Link>
          </li>
          </ul>
        </> : <>{(userLoginStatus===true && adminLoginStatus===false)? <>
        <ul className="nav">
        <li className="nav-item">
            <Link className="nav-link active" to="">
            <img src={logo} height="30px" width style={{borderRadius:'50%'}} />
          </Link>
          </li>
          <li className="nav-item ms-auto">
          <Link className="nav-link active" to="" style={{color:'white'}}>
            Home
          </Link>
          </li> 
          <li className="nav-item">
          <Link className="nav-link active" to="/user-profile" style={{color:'white'}}>
          <img src={currentUser.profileImg} width='20px' alt="" style={{borderRadius:'50%'}} />{currentUser.username}
          </Link>
          </li> 
          <li className="nav-item" onClick={logOut}>
          <Link className="nav-link active" to="login" style={{color:'white'}}>
            Logout
          </Link>
        </li>
      </ul>
      </> : 
      <ul className="nav ">
        <li className="nav-item">
            <Link className="nav-link active" to="">
            <img src={logo} height="30px" width style={{borderRadius:'50%'}} />
          </Link>
          </li>
      <li className="nav-item ms-auto">
      <Link className="nav-link active" to="" style={{color:'white'}}>
        Home
      </Link>
      </li> 
      <li className="nav-item">
      <Link className="nav-link active" to="/admin-profile" style={{color:'white'}}>
      <img src={logo} width='20px' alt="" style={{borderRadius:'50%'}} />{currentUser.username}
      </Link>
      </li> 
      <li className="nav-item" onClick={logOut}>
      <Link className="nav-link active" to="login" style={{color:'white'}}>
        Logout
      </Link>
    </li>
  </ul>
}
  </>
        }
  
      </div>
      
    )
}

export default Header;