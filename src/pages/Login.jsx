import React,{useState}from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { loginuser } from '../features/authSlice';
import {useNavigate} from "react-router-dom";
const Login = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [email,setEmail]=useState("eve.holt@reqres.in");
    const [password,setPassword]=useState("cityslicka");
    function handlePasswordChange(event){
        setPassword(event.target.value);
    }
    function handleEmailChange(event){
        setEmail(event.target.value);
    }
    async function handleSubmit(event){
        event.preventDefault();
        //promise return krega
        dispatch(loginuser({email,password})).then(()=>navigate("/users"));
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder='Enter userID'/>
        <input  type="password" name="password" value={password} onChange={handlePasswordChange} placeholder='Enter password'/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login
