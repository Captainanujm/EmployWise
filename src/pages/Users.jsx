import React, { useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchUser,editUser,deleteUser } from "../features/userSlice";
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
const Users = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [page, setPage] = useState(1);
    const {users,loading,totalPages}=useSelector((state)=>state.user);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });
    useEffect(()=>{
        dispatch(fetchUser(page));
    },[dispatch,page])
    function handleEditClick (user) {
      setEditId(user.id);
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    };
  
    function handleSave(){
      dispatch(editUser({ id: editId, updatedData: formData }));
      setEditId(null);
    }
    const handleDelete = (id) => {
      dispatch(deleteUser(id));
    }
  return (
    <div className="p-4">
    <h2 className="text-2xl mb-4 text-center">Users</h2>

    {loading ? (
      <p className="text-center">Loading...</p>
    ):(
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="p-4 border rounded-md shadow-md flex flex-col items-center">
              {editId === user.id ? (
                <>
        <input type="text" className="border p-1 w-full rounded" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}/>
          <input className="border p-1 w-full mt-2 rounded" type="text" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}/>
            <input className="border p-1 w-full mt-2 rounded" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
                  <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"> Save</button>
                </>):(
                <>
          <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full" />
              <p className="mt-2 text-center font-semibold">{user.first_name} {user.last_name}</p>
            <p className="text-gray-500">{user.email}</p>
                  <div className="mt-2 flex gap-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleEditClick(user)}>Edit </button>
              <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-4">
      <button className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"onClick={() => setPage((prev) => prev - 1)} disabled={page <= 1}>Previous </button>
    <button className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" onClick={() => setPage((prev) => prev + 1)} disabled={page >= totalPages}>Next</button>
        </div>
        <div className="flex justify-center mt-4">
          <button className="px-6 py-2 bg-red-500 text-white rounded" onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >Logout</button>
        </div>
      </>
    )}
  </div>
  )
}

export default Users
