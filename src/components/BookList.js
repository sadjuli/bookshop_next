"use client"

import Book from './Book'

import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks } from '../redux/slices/booksSlice.js'
import { useEffect } from 'react'

const BookList = () => {
	const dispatch = useDispatch();
	const books = useSelector((state) => state.books.books)
	const category = useSelector((state) => state.books.category)
	const startIndex = useSelector((state) => state.books.startIndex)
	const hasMoreBooks = useSelector((state) => state.books.hasMoreBooks)

	useEffect(() => {
		dispatch(fetchBooks({ category, startIndex }))
	}, [dispatch])

	const loadMoreBooks = () => {
		dispatch({ type: 'books/incrementStartIndex' })
		dispatch(fetchBooks({ category, startIndex: startIndex + 6 }))
	};

	return (
		<div id="books" className="books">
			{books.map((book, bookIdx) => (
				<Book key={`${book.id}-${bookIdx}`} book={book} />
			))}
			{hasMoreBooks && (
				<button id="loadMore" className="button loadmore__button" onClick={loadMoreBooks}>Load More</button>
			)}
		</div>
	)
}

export default BookList
