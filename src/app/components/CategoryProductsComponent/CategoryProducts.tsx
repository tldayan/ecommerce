"use client"
import React, { useEffect, useState } from 'react'

import styles from "./CategoryProducts.module.css"
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from 'next/link';
import { cormant_infant, philosopher } from '../../../../libs/allFonts';
import conversions from '../../../../libs/currencyConversions';

type Props = {
    category : string
}

const responsiveSwiper = {
  320: { slidesPerView: 2, spaceBetween: 5 },
  480: { slidesPerView: 2, spaceBetween: 5 },
  768: { slidesPerView: 3, spaceBetween: 20 },
  1024: { slidesPerView: 6, spaceBetween: 30 }
};

export default function CategoryProducts({category} : Props) {

  const [products,setProducts] = useState<product[]>([])
  const [currency,setCurrency] = useState("")



 useEffect(() => {

  const storedIntialCurrency = localStorage.getItem("currency")
  const initialCurrency  = storedIntialCurrency ? JSON.parse(storedIntialCurrency) : "AED"

  setCurrency(initialCurrency)

},[])


  useEffect(() => {

    const fetchCategoryProducts = async() => {

      const categorisedProducts = await fetch(`https://ecomxpress.vercel.app/api/categorisedproducts?category=${category}`)

      const products = await categorisedProducts.json()

      setProducts(products)
    }

    fetchCategoryProducts()

    
  },[category])
  

    
  return (
    <div className={styles.categoryProductsContainer}>
        <h2 className={philosopher.className}>More of {category}</h2>

        <Swiper
        className={styles.Swiper_Container}
        breakpoints={responsiveSwiper}
        loop={true}
      >
        {products.length ? products.map((eachProduct : product) => {
          return (
            <SwiperSlide
              key={eachProduct.id}
              className={styles.Swiper_Slider_Container}
            >
              <Link
                href={`/pages/products/${eachProduct.id}`}
                className={styles.productContainer}
              >
                <Image
                  className={styles.productImage}
                  src={eachProduct.images[0]}
                  width={200}
                  height={200}
                  alt={eachProduct.title}
                  priority={true}
                />
                <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                <div className={styles.productDetails}>
                  <p className={philosopher.className}>{eachProduct.title}</p>
                  <span className={cormant_infant.className}>
                  {(eachProduct.price * conversions[currency]).toLocaleString()} {currency}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          );
        }) : <div className={styles.load_animation_black}></div>}
      </Swiper>
    </div>
  )
}
