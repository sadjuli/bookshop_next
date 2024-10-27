"use client"

import { useDispatch, useSelector } from 'react-redux'
import { addToBasket } from '../redux/slices/booksSlice.js'

const Book = ({type = 'catalog', book }) => {
	const dispatch = useDispatch()
	const basket = useSelector((state) => state.books.basket)

	const handleAddToBasket = () => {
		dispatch(addToBasket(book))
	}

	const currency = {
		'EUR': '€',
		'USD': '$',
		'RUB': '₽'
	}

	const inCart = basket.filter((item) => item.id === book.id).length

	return (
		<div className={type ==='cart' ? 'book book--cart' : 'book'}>
			<img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
			<div className="book__info">
				<div className="book__author">
					{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors'}
				</div>
				<h3 className="book__title">{book.volumeInfo.title}</h3>
				{type === 'catalog' ? (
					<>
						<div className="book__description">
							{book.volumeInfo.description || 'No description'}
						</div>
						<div className="book__price">
							{book.saleInfo.retailPrice ? `${currency[book.saleInfo.retailPrice.currencyCode]} ${book.saleInfo.retailPrice.amount}` : ''}
						</div>
						{book.saleInfo.retailPrice ? (
							<button
								className={`button book__button ${inCart ? 'book__button--incart' : ''}`}
								onClick={handleAddToBasket}
							>
								{inCart ? 'In The Cart' : 'Buy Now'}
							</button>
						) : ''}
					</>
				) : '' }
			</div>
		</div>
	)
}

export default Book
