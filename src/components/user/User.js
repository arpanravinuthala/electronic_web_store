import './User.css'
import {useSelector} from 'react-redux';
import React from 'react';

function User(){

    let {currentUser}=useSelector(state=>state.login);

    return(
        <div className='container'>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 pt-4">
      <div className="card">
        <center><img src={currentUser.profileImg} className='w-100' height='250px' width='200px' alt="" /></center>
          <div className="card-body mx-auto">
            <span style={{ fontWeight: 'bold' }}>
              <p>Name : {currentUser.username}</p>
              <p>Email : {currentUser.email}</p>
              <p>DOB : {currentUser.dob}</p>
            </span>
          </div>
      </div>
      </div>
      </div>
    )
}

export default User;