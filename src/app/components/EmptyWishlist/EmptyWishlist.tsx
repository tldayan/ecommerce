import React from 'react'
import styles from "./EmptyWishlist.module.css"
import { lato, philosopher } from '../../../../libs/allFonts'

export default function EmptyWishlist() {
  return (
    <div className={styles.emptyWishlist}>
        <h3 className={lato.className}>Your Wishlist Is Empty!</h3>
        <p>Ready to create your wishlist? Explore our amazing collection and start adding items you love!</p>
        <button className={philosopher.className}>Start Shopping!</button>
    </div>
  )
}
