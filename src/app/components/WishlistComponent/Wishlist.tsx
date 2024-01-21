"use client"
import React, { useEffect, useState } from 'react'

import styles from "./Wishlist.module.css"
import WishlistItem from '../WishlistItem/WishlistItem'
import { philosopher } from '../../../../libs/allFonts'
import EmptyWishlist from '../EmptyWishlist/EmptyWishlist'

export default function Wishlist() {

  const [wishlist, setWishlist] = useState<string[]>([])

  useEffect(() => {
const wishlistData = localStorage.getItem("wishlist")
  const wishlistItems = wishlistData ? JSON.parse(wishlistData) : []


  setWishlist(wishlistItems)
  },[])

  



  return (
    <>
    {wishlist.length ? <div className={styles.wishlistContainer}>
      <h2 className={philosopher.className}>Watchlist</h2>
      <div className={`${styles.itemsContainer} ${!wishlist.length && styles.empty }`}>
      {wishlist.map((eachItem : string) => {
        return <WishlistItem key={eachItem} productId={eachItem} />
      })}
      </div>
    </div> : <EmptyWishlist />}
    </>
    
  )
}
