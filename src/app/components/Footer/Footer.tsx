
import React from 'react'

import styles from "./Footer.module.css"
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>

          <div className={styles.footer_container}>

            <p className={styles.logo}>ECOMEXPRESS</p>

            <div className={styles.products}>
              <h3>Company</h3>
              <ul>
                <Link href={"/"} className={styles.footer_links}>About us</Link>
                <Link href={"/"} className={styles.footer_links}>Terms of use</Link>
                <Link href={"/"} className={styles.footer_links}>Privacy Policy</Link>
                <Link href={"/"} className={styles.footer_links}>Careers</Link>
                <Link href={"/"} className={styles.footer_links}>Disclaimer</Link>
              </ul>
            </div>
            <div className={styles.socials}>
              <h3>Socials</h3>
              <ul>
                <Link href={"/"} className={styles.footer_links}>Facebook</Link>
                <Link href={"/"} className={styles.footer_links}>Twitter</Link>
                <Link href={"/"} className={styles.footer_links}>Telegram</Link>
                <Link href={"/"} className={styles.footer_links}>Instagram</Link>
                <Link href={"/"} className={styles.footer_links}>Interactive Chat</Link>
              </ul>
            </div>
          </div>

          <p className={styles.copyright}>&copy; 2024 EcomExpress. All rights reserved.</p>
        </footer>
  )
}
