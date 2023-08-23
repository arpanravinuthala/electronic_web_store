import './Register.css'
import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux'

function Register(){

    let [loginUserErr,setLoginUserErr]=useState('')
    let  {userLoginStatus,errorMessage}=useSelector(state=>state.login)

    let {register,handleSubmit,formState:{errors}} = useForm();

    let navigate=useNavigate();

    let [image,setImage]=useState()

    //this function will be called when user selects an image
  const onImageSelect=(event)=>{
   
    setImage(event.target.files[0])
   }

    let onFormSubmit = async(userObj)=>{
        //get FormData object
    let formData=new FormData()
    //add file 
    formData.append('photo',image,image.name)
    //add user obj
    formData.append('newUser',JSON.stringify(userObj))
        // make http request to userObj
        let res = await axios.post('http://localhost:4000/user-api/user',formData);
        console.log(res);
        if(res.status===201 && res.data.message==='created'){
            navigate('/login');
        }
    }

        useEffect(()=>{
            if(userLoginStatus===true){
              navigate('/user-profile')
            }else{
              setLoginUserErr(errorMessage)
            }
          },[userLoginStatus,errorMessage])

    return(
        <div>
            <h1 className="text-center mt-4" style={{color:'#03092b'}}>User Registration</h1>
            <form className="w-50 mt-3 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
                <label>Username</label>
                <input type="text" {...register('username')} id="username" className="form-control mb-3" />
                <label>Password</label>
                <input type="password" {...register('password')} id="password" className="form-control mb-3" />
                <label>Email</label>
                <input type="email" {...register('email')} id="email" className="form-control mb-3" />
                <label>DOB</label>
                <input type="date" {...register('dob')} id="dob" className="form-control mb-3" />
                <input type="file" {...register('photo')} id="" className="form-control mb-3" onChange={onImageSelect} />
                <button className="btn btn-success mx-auto" type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;