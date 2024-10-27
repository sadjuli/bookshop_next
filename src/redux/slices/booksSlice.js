"use client"

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const apiKey = 'AIzaSyAYqHMSRaiUP-WDJyzgDDbW8qkAXn1dtnw'
const maxResults = 6

export const fetchBooks = createAsyncThunk(
	'books/fetchBooks',
	async ({ category, startIndex }, { getState }) => {
		const response = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`
		)
		return await response.json()
	}
)

const booksSlice = createSlice({
	name: 'books',
	initialState: {
		books: [],
		category: 'Architecture',
		startIndex: 0,
		basket: [],
		status: 'idle',
		hasMoreBooks: false,
	},
	reducers: {
		setCategory(state, action) {
			state.category = action.payload;
			state.startIndex = 0;
			state.books = [];
		},
		addToBasket(state, action) {
			if (!state.basket.includes(action.payload)) {
				const bookItem = { ...action.payload, qty: 1 }
				state.basket.push(bookItem)
				localStorage.setItem('basket', JSON.stringify(state.basket))
			}
		},
		incrementBookQuantity(state, action) {
			console.log(2)
			state.basket = state.basket.map(item =>
				item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
			)
			localStorage.setItem('basket', JSON.stringify(state.basket))
		},
		decrementBookQuantity(state, action) {
			if (state.basket.some(item => item.id === action.payload.id)) {
				state.basket = state.basket.map(item =>
					item.id === action.payload.id && item.qty > 1
						? { ...item, qty: item.qty - 1 }
						: item
				)
				state.basket = state.basket.filter(item => item.qty > 0)
				localStorage.setItem('basket', JSON.stringify(state.basket))
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBooks.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				state.books = [...state.books, ...action.payload.items]
				state.hasMoreBooks = action.payload.totalItems > state.books.length;
				state.startIndex += maxResults
				state.status = 'succeeded'
			})
			.addCase(fetchBooks.rejected, (state) => {
				state.status = 'failed'
			})
	},
})

export const { setCategory, addToBasket, incrementBookQuantity, decrementBookQuantity } = booksSlice.actions

export default booksSlice.reducer
