import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
export const loginuser=createAsyncThunk("auth/login",async(userData)=>{
    const fetchLoginResponse=await fetch("https://reqres.in/api/login",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
    const data=await fetchLoginResponse.json();
    if(fetchLoginResponse.ok){
        const token=data.token;
    localStorage.setItem("token",token);
    return token;
    }
    throw new Error("Login failed");
    

})
const initialState={
    token:localStorage.getItem("token"),
    isAuthenticated:!!localStorage.getItem("token"),
}
const tokenSlice=createSlice({
    name:"tokenSlice",
    initialState,
    reducers:{
        logout:(state,action)=>{
            state.token=null;
            localStorage.removeItem("token");
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginuser.fulfilled,(state,action)=>{state.token=action.payload
            state.isAuthenticated=true;
    });
    }

})
export const {logout}=tokenSlice.actions;
export default tokenSlice.reducer;