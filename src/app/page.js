"use client"

import Slider from '../components/Slider'
import CategoryList from '../components/CategoryList'
import BookList from '../components/BookList'

const HomePage = () => {
  return (
    <main>
      <div className="slider__abs">
        <div className="slider__abs-item slider__abs-item1">
          Change<br/>old book<br/>on new<br/>
          <svg width="57" height="14" viewBox="0 0 57 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 7H54" stroke="#1C2A39" strokeWidth="2"/>
            <path d="M48 1L55 7L48 13" stroke="#1C2A39" strokeWidth="2"/>
          </svg>
        </div>
        <div className="slider__abs-item slider__abs-item2">
          Top<br/>100<br/>books<br/>2022<br/>
          <svg width="57" height="14" viewBox="0 0 57 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 7H54" stroke="#1C2A39" strokeWidth="2"/>
            <path d="M48 1L55 7L48 13" stroke="#1C2A39" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      <div className="main__wrapper">
        <Slider/>
        <section className="main">
          <CategoryList/>
          <BookList books={[]}/>
        </section>
      </div>
    </main>
  )
}

export default HomePage
