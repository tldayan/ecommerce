"use client"
import React, { useEffect, useState } from 'react'

import styles from "./CategoryProducts.module.css"
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from 'next/link';
import { cormant_infant, philosopher } from '../../../../libs/allFonts';

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


  useEffect(() => {

    const fetchCategoryProducts = async() => {

      const categorisedProducts = await fetch(`https://ecomxpress/api/categorisedproducts?category=${category}`)

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
        {products.map((eachProduct : product) => {
          return (
            <SwiperSlide
              key={eachProduct.id}
              className={styles.Swiper_Slider_Container}
            >
              <Link
                href={`/pages/products/${eachProduct.id}`}
                className={styles.productContainer}
              >
               {/*  {loading && <div className="load_animation_black"></div>} */}
                <Image
                  className={styles.productImage}
                  src={eachProduct.images[0]}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt={eachProduct.title}
                  priority={true}
                />
                <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                <div className={styles.productDetails}>
                  <p className={philosopher.className}>{eachProduct.title}</p>
                  <span className={cormant_infant.className}>
                    {eachProduct.price.toLocaleString()} AED
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  )
}
