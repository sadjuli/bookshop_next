"use client"

import Head from 'next/head'
import Link from 'next/link'
import { Montserrat, Open_Sans } from 'next/font/google'

const montserrat = Montserrat({
	weight: ['100', '400', '700', '900'],
	subsets: ['latin'],
})

const openSans = Open_Sans({
	weight: ['300', '400', '600', '800'],
	subsets: ['latin'],
})

const Header = () => {
	return (
		<>
			<Head>
				<title>Bookshop</title>
				<meta name="description" content="Your online bookstore for all genres." />
			</Head>
			<header className={`${montserrat.className} ${openSans.className}`}>
				<div className="header__wrapper">
					<div className="logo">Bookshop</div>
					<div className="nav">
						<Link href="/" className="nav__active">Books</Link>
						<a href="#">Audiobooks</a>
						<a href="#">Gifts</a>
						<a href="#">Kids</a>
					</div>
					<div className="icons">
						<div className="icon user"></div>
						<div className="icon search"></div>
						<Link className="icon cart" href="/cart">
							<span id="basket" className="cart__count"></span>
						</Link>
					</div>
				</div>
			</header>
		</>
	)
}

export default Header
