"use client"

import './globals.css'
import { Provider } from 'react-redux'
import Header from '../components/Header'
import { Montserrat, Open_Sans } from 'next/font/google'
import store from '../redux/store.js'

const montserrat = Montserrat({
  weight: ['100', '400', '700', '900'],
  subsets: ['latin'],
})

const openSans = Open_Sans({
  weight: ['300', '400', '600', '800'],
  subsets: ['latin'],
})

const RootLayout = ({ children }) => {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        </head>
        <body className={`${montserrat.className} ${openSans.className}`}>
          <Header />
          {children} {/* Здесь рендерятся дочерние элементы */}
        </body>
      </html>
    </Provider>
  )
}

export default RootLayout
