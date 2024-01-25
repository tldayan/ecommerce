"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import styles from "./CatergorySlider.module.css";
import { cormant_infant, jose, philosopher } from "../../../../libs/allFonts";
import { useDispatch } from "react-redux";
import { WishlistSliceActions } from "@/redux/store/WishlistSlice";

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

  const [wishlist, setWishlist] = useState<string[]>([])

  const [wishlistCalls, setWishlistCalls] = useState(0)


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedWishlist = localStorage.getItem("wishlist");
      const initialWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      setWishlist(initialWishlist);
    }
  }, [wishlistCalls]);
  
  



  const dispatch = useDispatch()  

  const handleWishlist = (productId: number) => {

    setWishlistCalls(prevState => {
      return prevState + 1
    })

    if(wishlist.includes(productId.toString())) {
      const updatedWishlist = wishlist.filter((eachId : string) => eachId !== productId.toString())
    

      setWishlist(updatedWishlist)
      dispatch(WishlistSliceActions.removeFromWishlist())
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

      return
    }


    if(wishlist.length >= 1) {

      const currentWishlist = wishlist 

      const updatedWishlist = [...currentWishlist, `${productId}`]

      setWishlist(updatedWishlist)
      dispatch(WishlistSliceActions.addToWishlist())
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

    } else {

      const initialWishlist = [`${productId}`]
      setWishlist([`${productId}`])
      dispatch(WishlistSliceActions.addToWishlist())
      localStorage.setItem("wishlist", JSON.stringify(initialWishlist))
    }
  }

  return (
    <>
      {products[0]?.category && (
        <h2 className={`${styles.categoryTitle} ${jose.className}`}>
          {products[0]?.category.charAt(0).toUpperCase() +
            products[0]?.category.slice(1)}
        </h2>
      )}

      <Swiper
        className={styles.Swiper_Container}
        breakpoints={responsiveSwiper}
        loop={true}
      >
        {products.map((eachProduct) => {
          return (
            <SwiperSlide
              key={eachProduct.id}
              className={styles.Swiper_Slider_Container}
            >
              <button onClick={() => handleWishlist(eachProduct.id)} className={`${styles.wishlist_btn} ${wishlist?.includes(eachProduct.id.toString()) && styles.active }`}>{wishlist.includes(eachProduct.id.toString()) ? "In" : "+" } Wishlist</button>
              <Link
                href={`/pages/products/${eachProduct.id}`}
                className={styles.productContainer}
              >
                <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                <Image
                  className={styles.productImage}
                  src={eachProduct.images[0]}
                  width={200}
                  height={200}
                  alt={eachProduct.title}
                  priority={true}
                />
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
    </>
  );
}
