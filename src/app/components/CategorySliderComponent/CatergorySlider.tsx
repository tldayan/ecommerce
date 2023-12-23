
"use client"
import Link from 'next/link'
import React from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import Image from 'next/image'
import styles from "./CatergorySlider.module.css"
import { cormant_infant, jose, philosopher } from '../../../../libs/allFonts'


type Props = {
  products: product[];
};

const responsiveSwiper = {
  320: { slidesPerView: 2, spaceBetween: 5 },
  480: { slidesPerView: 2, spaceBetween: 5 },
  768: { slidesPerView: 3, spaceBetween: 20 },
  1024: { slidesPerView: 6, spaceBetween: 30 },
};

export default function CatergorySlider({ products }: Props) {
  const [loading, setLoading] = React.useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };
  

  return (
    <>
      {products[0]?.category && (
        <h2 className={`${styles.categoryTitle} ${jose.className}`}>
          {products[0]?.category.charAt(0).toUpperCase() + products[0]?.category.slice(1)}
        </h2>
      )}

      <Swiper className={styles.Swiper_Container} breakpoints={responsiveSwiper} loop={true}>
        {products.map((eachProduct) => {
          return (
            <SwiperSlide key={eachProduct.id} className={styles.Swiper_Slider_Container}>
              <button className={styles.wishlist_btn}>+ Wishlist</button>
              <Link href={`/pages/products/${eachProduct.id}`} className={styles.productContainer}>
                {loading && <div className="load_animation_black"></div>}
                  <Image
                    className={styles.productImage}
                    src={eachProduct.images[0]}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt={eachProduct.title}
                    onLoad={handleLoadingComplete}
                    priority={true}
                  />
                <div className={styles.productDetails}>
                  <p className={philosopher.className}>{eachProduct.title}</p>
                  <span className={cormant_infant.className}>{eachProduct.price.toLocaleString()} AED</span>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
