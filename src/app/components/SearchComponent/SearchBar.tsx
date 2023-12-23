

import React from 'react'
import Image from 'next/image'

import styles from "./SearchBar.module.css"
import { Philosopher } from 'next/font/google'

const philosopher = Philosopher({
  subsets : ["latin"],
  weight : ["400"]
})

export default function SearchBar() {
  return (
    <div className={styles.SearchBar}>
      <input className={philosopher.className} type="text" placeholder='Search...' />
      <Image
          src="/NavbarImages/search.png" 
          alt='Search'
          width={24}
          height={24}
          className='search_icon'
          />
    </div>
  )
}
