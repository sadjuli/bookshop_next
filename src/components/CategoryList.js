"use client"

import { useDispatch, useSelector } from 'react-redux'
import { setCategory, fetchBooks } from '../redux/slices/booksSlice'

const categories = [
	'Architecture', 'Biography', 'Business', 'Crafts & Hobbies', 'Drama', 'Fiction',
	'Food & Drink', 'Health & Wellbeing', 'History & Politics', 'Humor', 'Poetry',
	'Psychology', 'Science', 'Technology', 'Travel & Maps'
]

const CategoryList = () => {
	const dispatch = useDispatch()
	const activeCategory = useSelector((state) => state.books.category)

	const handleCategoryChange = (category) => {
		dispatch(setCategory(category))
		dispatch(fetchBooks({ category, startIndex: 0 }))
	}

	return (
		<div className="categories">
			<ul className="categories__list">
				{categories.map((category, index) => (
					<li
						key={category}
						className={`categories__item ${activeCategory === category ? 'categories__item--active' : ''}`}
						onClick={() => handleCategoryChange(category)}
					>
						{category}
					</li>
				))}
			</ul>
		</div>
	)
}

export default CategoryList
