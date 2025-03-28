import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
export const fetchUser=createAsyncThunk("api/fetchUser",async(page)=>{
    const fetchuser=await fetch(`https://reqres.in/api/users?page=${page}`);
    const wholeUserObject=await fetchuser.json();
    const data=wholeUserObject.data;
    return data;
});
const initialState={
    users:[],
    loading:false,
}
const UserSlice=createSlice({
    name:"userslice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.fulfilled,(state,action)=>{state.users=action.payload;state.loading=false});
        builder.addCase(fetchUser.pending,(state,action)=>{
            state.loading=true
        })
    }

})
export default UserSlice.reducer;