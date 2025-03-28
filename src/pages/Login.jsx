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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg w-96"
    >
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
        Login
      </h2>
      
      <div className="mb-4">
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter userID"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="mb-4">
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  </div>
  
  )
}

export default Login
