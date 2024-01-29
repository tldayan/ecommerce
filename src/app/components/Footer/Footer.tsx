
import React from 'react'

import styles from "./Footer.module.css"
import { quicksand } from '../../../../libs/allFonts'


export default function Footer() {
  return (
    <>
    <footer className={styles.mainFooter}>
		<div className={styles.container}>
    {/* <p className={styles.logo}>ECOMEXPRESS</p> */}

			<div className={styles.footer_col}>
				<h4>company</h4>
				<ul>
					<li><a href="#">about us</a></li>
					<li><a href="#">our services</a></li>
					<li><a href="#">privacy policy</a></li>
					<li><a href="#">visit website</a></li>
				</ul>
			</div>
			<div className={styles.footer_col}>
				<h4>get help</h4>
				<ul>
					<li><a href="#">FAQ</a></li>
					<li><a href="#">shipping</a></li>
					<li><a href="#">returns</a></li>
					<li><a href="#">order status</a></li>
					<li><a href="#">payment options</a></li>
				</ul>
			</div>
			<div className={styles.footer_col}>
				<h4>online shop</h4>
				<ul>
					<li><a href="#">download</a></li>
					<li><a href="#">changelog</a></li>
					<li><a href="#">github</a></li>
					<li><a href="#">all version</a></li>
				</ul>
			</div>
			<div className={styles.footer_col}>
				<h4>follow us</h4>
				<div className={styles.social_links}>
					<a href="#"><i className="fa-brands fa-facebook-f"></i></a>
					<a href="#"><i className="fa-brands fa-x-twitter"></i></a>
					<a href="#"><i className="fa-brands fa-instagram"></i></a>
					<a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
				</div>
			</div>
		</div>
    

    
	</footer>
  <p className={`${styles.copyright} ${quicksand.className}`}>&copy; 2024 EcomExpress. All rights reserved.</p>
  </>
  )
}
