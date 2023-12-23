

import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import { Roboto } from 'next/font/google'

import styles from "./navbar.module.css"
import SearchBar from '../SearchComponent/SearchBar'

const roboto = Roboto({
    subsets : ["latin"],
    weight : ["400"]
})

export default function Navbar() {
  return (
    <div className={`${styles.Navbar} ${roboto.className}`}>
      <Link href="/" className={styles.logo}>ECOMEXPRESS</Link>
      <SearchBar />
      <div className={styles.navbarButtons}>
          <Image className={styles.wishlist_btn} src="/NavbarImages/heart.png" width={22} height={22} alt='wishlist' />
          <Link href={"/login"} className='login_btn'>Log in</Link>
          <Link href={"/login"} className='signup_btn'>Sign Up</Link>
          <Image
          src="/NavbarImages/cart.png"
          alt='Cart'
          width={26}
          height={26}
          />
      </div>
    </div>
  )
}
