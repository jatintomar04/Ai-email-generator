import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth/authSlice"
import email from "./features/email/emailSlice"


export const store = configureStore({
    reducer :{auth, email}
})