import React from 'react'

import styles from "./BrandBanner.module.css"
import { Cormorant_Upright } from 'next/font/google'


const cormorant = Cormorant_Upright({
    subsets : ["latin"],
    weight : ["300"]
  })
  

export default function BrandBanner() {
  return (
    <div className={`${styles.gradient} ${cormorant.className}`}>
        <h1 className={styles.name}>ECOMEXPRESS</h1>
        <p className={styles.slogan}>Where Every Purchase Tells a Story.</p>
      </div>
  )
}
