import React from 'react'

import {quicksand } from '../../../../libs/allFonts'
import styles from "../../components/EmptyCart/EmptyCart.module.css"
import Link from 'next/link'
type Props = {}

export default function Success({}: Props) {
  return (
    <div className="cancel_container">
            <div className="payment_container">
                <div className="message-box _success">
                     <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <h2 className={quicksand.className}>Your payment was successful</h2>
                    <Link href={"/"} className={`${quicksand.className} ${styles.homeButton}`}>Continue Shopping!</Link>
            </div> 
        </div> 
    </div>
  )
}