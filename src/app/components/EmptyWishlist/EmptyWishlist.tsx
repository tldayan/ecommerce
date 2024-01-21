import React from 'react'
import styles from "./EmptyWishlist.module.css"
import { lato, philosopher } from '../../../../libs/allFonts'
import Link from 'next/link'

export default function EmptyWishlist() {
  return (
    <div className={styles.emptyWishlist}>
      <div className={styles.emptyContainer}>
        <h3 className={lato.className}>Your Wishlist Is Empty!</h3>
        <p>Ready to create your wishlist? Explore our amazing collection and start adding items you love!</p>
        <Link href={"/"} className={`${philosopher.className} ${styles.homeButton}`}>Start Shopping!</Link>
      </div>        
    </div>
  )
}
