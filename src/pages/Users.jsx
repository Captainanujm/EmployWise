import React, { useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchUser } from '../features/userSlice';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
const Users = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [page, setPage] = useState(1);
    const {users,loading,totalPages}=useSelector((state)=>state.user);
    useEffect(()=>{
        dispatch(fetchUser(page));
    },[dispatch,page])
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Users</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.id} className="p-4 border rounded-md shadow-md">
                <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full" />
                <p className="mt-2">{user.first_name} {user.last_name}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="px-4 py-2 bg-gray-300 mx-2 rounded disabled:opacity-50"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-gray-300 mx-2 rounded disabled:opacity-50"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Logout
          </button>
        </>
      )}
      
    </div>
  )
}

export default Users
