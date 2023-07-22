'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value : false
}

export const navbarSlice = createSlice({
    name : "navbar" ,
    initialState,
    reducers : {
        open : (state) => {state.value = true} , 
        close : (state) => {state.value = false}
    }   
})

export const {open , close} = navbarSlice.actions ;
export default navbarSlice.reducer