'use client'
import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./features/Cart/cartSlice"
import navbarReducer from "./features/Navbar/navbarSlice"

export const store = configureStore({
    reducer: {
        cart : cartReducer,
        navbar: navbarReducer
    }
})

export type RootState = ReturnType<typeof store.getState >
export type AppDispatch = typeof store.dispatch