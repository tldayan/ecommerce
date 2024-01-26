

import React from 'react'

import styles from "./notfound.module.css"
import {quicksand} from '../../../../libs/allFonts'

export default function notFound() {
  return (
    <div className={styles.container}>
        <div className={styles.row}>
            <div>
              <div className={styles.gif}>
              </div>
              <div className={styles.content}>
                <h3 className={quicksand.className}>Page not found!</h3>
                <p className={quicksand.className}>are you sure you want to be here?</p>
                <a href="/" className={styles.link}>Go to Home</a>
              </div>
            </div>
        </div>
      </div>
  )
}
