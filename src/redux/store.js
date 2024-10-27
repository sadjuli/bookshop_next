"use client"

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import booksReducer from './slices/booksSlice'

const rootReducer = combineReducers({
	books: booksReducer,
})

const store = configureStore({
	reducer: rootReducer,
})

export default store
