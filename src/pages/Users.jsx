import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchUser } from '../features/userSlice';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
const Users = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {users,loading}=useSelector((state)=>state.user);
    useEffect(()=>{
        dispatch(fetchUser(1));
    },[dispatch])
  return (
    <div className="p-4">
    <h2 className="text-2xl">Users</h2>
    {loading ? <p>Loading...</p> :
      users.map((user) => (
        <div key={user.id} className="p-2 border rounded-md flex items-center">
          <img src={user.avatar} alt={user.first_name} className="w-12 h-12 rounded-full" />
          <div className="ml-4">
            <p>{user.first_name} {user.last_name}</p>
          </div>
        </div>
      ))
    }
    <button onClick={async()=>{dispatch(logout());navigate("/")}}>Logout</button>
  </div>
  )
}

export default Users
