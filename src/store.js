import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
const store=configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
    },
})
export default store;