import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
export const fetchUser=createAsyncThunk("api/fetchUser",async(page)=>{
    const fetchuser=await fetch(`https://reqres.in/api/users?page=${page}`);
    const wholeUserObject=await fetchuser.json();
    const data=wholeUserObject.data;
    const totalpage=wholeUserObject.total_pages;
    return {userArray:data,totalPage:totalpage};
});
export const editUser = createAsyncThunk("api/editUser", async ({ id, updatedData }) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  
    const data = await response.json();
    return { id, ...updatedData };
  });
const initialState={
    users:[],
    loading:false,
    totalPages:0,
}
const UserSlice=createSlice({
    name:"userslice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.fulfilled,(state,action)=>{state.users=action.payload.userArray;state.loading=false;state.totalPages=action.payload.totalPage});
        builder.addCase(fetchUser.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(editUser.fulfilled, (state, { payload }) => {
            state.users = state.users.map((user) =>
              user.id === payload.id ? { ...user, ...payload } : user
            );
          });
    }

})
export default UserSlice.reducer;