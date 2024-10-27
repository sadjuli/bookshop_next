"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import slide1 from '/public/img/slide1.png'
import slide2 from '/public/img/slide2.png'
import slide3 from '/public/img/slide3.png'

const Slider = () => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const slides = [slide1, slide2, slide3]

	const showSlide = (index) => {
		setCurrentSlide(index)
	}

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length)
	}

	useEffect(() => {
		const interval = setInterval(nextSlide, 3000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className="slider__wrapper">
			<div className="slider" style={{ transform: `translateX(-${currentSlide * 1120}px)` }}>
				{slides.map((slide, idx) => (
					<div key={idx} className={`slide ${currentSlide === idx ? 'active' : ''}`}>
						<Image src={slide} alt={`Slide ${idx + 1}`} />
					</div>
				))}
			</div>
			<div className="slider__pins">
				{slides.map((_, idx) => (
					<button
						key={idx}
						className={`slider__pin ${currentSlide === idx ? 'slider__pin--active' : ''}`}
						onClick={() => showSlide(idx)}
					/>
				))}
			</div>
		</div>
	)
}

export default Slider
