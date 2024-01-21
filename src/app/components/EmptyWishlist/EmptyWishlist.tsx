import React from 'react'
import styles from "./EmptyWishlist.module.css"
import { lato, philosopher, quicksand } from '../../../../libs/allFonts'
import Link from 'next/link'

export default function EmptyWishlist() {
  return (
    <div className={styles.emptyWishlist}>
      <div className={styles.emptyContainer}>
        <h3 className={quicksand.className}>Your Wishlist Is Empty!</h3>
        <p className={quicksand.className}>Ready to create your wishlist? Explore our amazing collection and start adding items you love!</p>
        <Link href={"/"} className={`${quicksand.className} ${styles.homeButton}`}>Start Shopping!</Link>
      </div>        
    </div>
  )
}
