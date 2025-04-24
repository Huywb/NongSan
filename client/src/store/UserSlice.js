import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    _id: "",
    name: "",
    email: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUserDetails : (state,action)=>{
            return {...action.payload}
        },
        setLogout : (state,action)=>{
            return initialState
        }
    }
})


export const {setUserDetails,setLogout} = userSlice.actions


export default userSlice.reducer