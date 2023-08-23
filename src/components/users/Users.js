import './Users.css'
import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios'

function Users(){

    let [users,getUsers] = useState([])

    async function getAllProducts(){
        let res=await axios.get('http://localhost:4000/user-api/users')
        getUsers(res.data.payload);
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
            users.map(userObj=><div className='col' key={userObj.username}>
              <div className="card">
                <img src={userObj.profileImg} className='w-100' height='250px' width='200px' alt="" />
                  <div className="card-body mx-auto">
                    <span style={{ fontWeight: 'bold' }}>
                        <p>Name : {userObj.username}</p>
                        <p>Email : {userObj.email}</p>
                        <p>DOB : {userObj.dob}</p>
                    </span>
                  </div>
              </div>
            </div>)
          }
        </div>
      </div>
    )
}

export default Users;