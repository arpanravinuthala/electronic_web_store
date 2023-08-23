import {useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import { userLogin } from '../../slices/loginSlice';

function Login() {

  let  {adminLoginStatus,userLoginStatus,errorMessage}=useSelector(state=>state.login)

  let {register,handleSubmit,formState:{errors}}=useForm()
  let dispatch=useDispatch()
  let navigate=useNavigate()
  // let [userCredObj,setUserCredObj]=useState({})

  let [loginUserErr,setLoginUserErr]=useState('')

  const onFormSubmit=async(userCredObj)=>{
    //make HTTP post req to userApi
   // console.log(userCredObj)
    let actionObj=userLogin(userCredObj)
    dispatch(actionObj)
  } 

   useEffect(()=>{
    if(adminLoginStatus===true){
      navigate('/admin-profile')
    }
    else if(userLoginStatus===true){
        navigate('/user-profile')
      }
    else{
      setLoginUserErr(errorMessage)
    }
  },[adminLoginStatus,userLoginStatus,errorMessage])


  return (
    <div>
    <h1 className=" text-center mt-4" style={{color:'#03092b'}}>User Login</h1>

    {/* login error message */}
    {loginUserErr.length!==0 && <p className='text-danger text-center display-6'>{errorMessage}</p>}
    <form className='w-50 mx-auto mt-3' onSubmit={handleSubmit(onFormSubmit)}>
      {/* user type */}
      <div className="mb-3">
          <label>Select user type</label>
          <div className="form-check">
            <input
              type="radio"
              {...register("userType")}
              id="admin"
              className="form-check-input"
              value="admin"
            />
            <label htmlFor="admin" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              {...register("userType")}
              id="user"
              className="form-check-input"
              value="user"
            />
            <label htmlFor="user" className="form-check-label">
              User
            </label>
          </div>
        </div>
    <label>Username</label>
      <input type="text" {...register('username')} id="username" className="form-control mb-3"/>
      <label>Password</label>
      <input type="password" {...register('password')} id="password" className="form-control mb-3"/>
     
      <button className="btn btn-success" type='submit'>Login</button>
    </form>
  </div>
  )
}

export default Login