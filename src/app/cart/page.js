"use client"

import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { incrementBookQuantity, decrementBookQuantity } from '../../redux/slices/booksSlice.js'
import Book from '../../components/Book'

const CartPage = () => {
	const dispatch = useDispatch()
	const [cartBooks, setCartBooks] = useState([])
	const basket = useSelector((state) => state.books.basket)

	useEffect(() => {
		const storedBooks = JSON.parse(localStorage.getItem('basket')) || []
		setCartBooks(storedBooks)
	}, [basket])

	const currency = {
		'EUR': '€',
		'USD': '$',
		'RUB': '₽'
	}

	const incrementQty = (book) => {
		dispatch(incrementBookQuantity(book))
	}
	const decrementQty = (book) => {
		dispatch(decrementBookQuantity(book))
	}

	const totalPrice = () => {
		return cartBooks.reduce((total, book) => {
			const price = book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : 0
			return total + price * book.qty
		}, 0)
	}

	const cartCurrency = () => {
		return currency[cartBooks[0].saleInfo.retailPrice.currencyCode]
	}

	return (
		<main>
			<div className="main__wrapper">
				<section className="cart__section">

					<h1>Shopping cart</h1>
					<div className="cart__wrapper">
						<div className="cart__header">
							<div>Item</div>
							<div>Quantity</div>
							<div>Price</div>
							<div>Delivery</div>
						</div>
						<div className="cart__items">
							{cartBooks.length === 0 ? (
								<p>No books in cart.</p>
							) : (
								cartBooks.map((book) => (
									<div key={book.id} className="cart__item">
										<div>
											<Book type="cart" book={book}/>
										</div>
										<div className="cart__qty">
											<div onClick={() => decrementQty(book)}>
												<svg width="22" height="5" viewBox="0 0 22 5" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path
														d="M21.2143 2.5C21.2143 3.36426 20.5121 4.0625 19.6429 4.0625H2.35714C1.48795 4.0625 0.785713 3.36426 0.785713 2.5C0.785713 1.63574 1.48795 0.9375 2.35714 0.9375H19.6429C20.5121 0.9375 21.2143 1.63574 21.2143 2.5Z"
														fill="black"/>
												</svg>
											</div>
											{book.qty}
											<div onClick={() => incrementQty(book)}>
												<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path
														d="M9 1.75C9 0.920312 9.67031 0.25 10.5 0.25C11.3297 0.25 12 0.920312 12 1.75V8.5H18.75C19.5797 8.5 20.25 9.17031 20.25 10C20.25 10.8297 19.5797 11.5 18.75 11.5H12V18.25C12 19.0797 11.3297 19.75 10.5 19.75C9.67031 19.75 9 19.0797 9 18.25V11.5H2.25C1.42031 11.5 0.75 10.8297 0.75 10C0.75 9.17031 1.42031 8.5 2.25 8.5H9V1.75Z"
														fill="black"/>
												</svg>
											</div>
										</div>
										<div
											className="cart__price">{currency[book.saleInfo.retailPrice.currencyCode]} {book.saleInfo.retailPrice.amount}</div>
										<div className="cart__delivery">Shipping: delivery</div>
									</div>
								))
							)}
						</div>
						{cartBooks.length > 0 ? (
							<div className="cart__total">
								<h5>Total price: {totalPrice()} {cartCurrency()}</h5>
								<button className="button button--checkout">Checkout</button>
							</div>
							) : '' }
					</div>
				</section>
			</div>
		</main>
	)
}

export default CartPage
