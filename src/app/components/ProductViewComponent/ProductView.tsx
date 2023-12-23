
"use client"
import React from 'react'
import styles from "./ProductView.module.css"
import { Swiper,SwiperSlide } from 'swiper/react'
import Image from "next/image"

type Props = {
    product : product
}


export default function ProductView({product}:Props) {
  return (
    <div className={styles.productViewContainer}>
      <Swiper>
        {product.images.map((eachImage) => {
          return (
            <SwiperSlide key={eachImage} >
              <Image
                    src={eachImage} 
                    width={100}
                    height={100}
                    alt={product.title}
                  />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  )
}
