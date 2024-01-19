"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { Roboto } from 'next/font/google'

import styles from "./navbar.module.css"
import SearchBar from '../SearchComponent/SearchBar'
import { useAppSelector } from '@/redux/store/store'

const roboto = Roboto({
    subsets : ["latin"],
    weight : ["400"]
})

export default function Navbar() {

  const [wishlist, setWishlist] = useState<PartialProduct[]>([])
  const [cart, setCart] = useState<PartialProduct[]>([])

  const wishlistQuantity = useAppSelector((state) => state.Wishlist.quantity)
  const cartQuantity = useAppSelector((state) => state.Cart.cartQuantity)
  


  useEffect(() => {
      const storedWishlist = localStorage.getItem("wishlist");
      const Wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      setWishlist(Wishlist);

  }, [wishlistQuantity]);

  useEffect(() => {
      const storedcart = localStorage.getItem("cart");
      const initialCart = storedcart ? JSON.parse(storedcart) : [];

      setCart(initialCart)

  },[cartQuantity])
  

  return (
    <div className={`${styles.Navbar} ${roboto.className}`}>
      <Link href="/" className={styles.logo}>ECOMEXPRESS</Link>
      <SearchBar />
      <div className={styles.navbarButtons}>
          <Link href={"/pages/wishlist"}>
            <div className={styles.wishlistbuttonContainer}>
            {wishlist?.length > 0 && (<div className={`${styles.wishlistQty} ${wishlist?.length > 0 && styles.active}`}>{wishlist.length}</div>)}
              <Image className={styles.wishlist_btn} src="/NavbarImages/heart.png" width={22} height={22} alt='wishlist' />
            </div>
            
          </Link>
          <Link href={"/"} className='login_btn'>Log In</Link>
          <Link href={"/"} className='signup_btn'>Sign Up</Link>
          <Link href={"/pages/cart"}>
            <div className={styles.cartImageContainer}>
            {cart?.length > 0 && (<div className={`${styles.cartQty} ${cart?.length > 0 && styles.active}`}>{cart.length}</div>)}
                <Image
            src="/NavbarImages/cart.png"
            alt='Cart'
            width={26}
            height={26}
            />
            </div>
          
          </Link>
          
      </div>
    </div>
  )
}
