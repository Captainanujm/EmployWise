import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
export const fetchUser=createAsyncThunk("api/fetchUser",async(page)=>{
    const fetchuser=await fetch(`https://reqres.in/api/users?page=${page}`);
    const wholeUserObject=await fetchuser.json();
    const data=wholeUserObject.data;
    const totalpage=wholeUserObject.total_pages;
    return {userArray:data,totalPage:totalpage};
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
    }

})
export default UserSlice.reducer;