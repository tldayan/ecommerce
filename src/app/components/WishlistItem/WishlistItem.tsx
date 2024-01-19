

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import styles from "./wishlistItem.module.css"
import { cormant_infant, philosopher } from '../../../../libs/allFonts'

type Props= {
    productId : string
}


export default async function WishlistItem({productId} : Props) {

    const fetchProductData = await fetch(`https://ecomxpress.vercel.app/api/product?id=${productId}`)

    const productData = await fetchProductData.json()


  return (
    <div className={styles.productContainer}>
     <Link className={styles.product} href={`/pages/products/${productId}`}>
      <Image width={125} height={125} alt={productData.title} src={productData.images[0]} />
      <div className={styles.productDetailsContainer}>
       <h3 className={philosopher.className}>{productData.title}</h3> 
       <p className={cormant_infant.className}>{productData.price}.00</p>
       <span className={`${styles.stockBadge} ${!productData.stock && styles.out}`}>{productData.stock ? "In Stock" : "Out of Stock"}</span>
      </div>
      
    </Link> 
    </div>
    
  )
}
