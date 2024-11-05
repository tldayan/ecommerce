"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductView.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import {
  cormant_infant,
  philosopher,
  poiret,
} from "../../../../libs/allFonts";
import { useDispatch} from "react-redux";
import { CartSliceActions } from "@/redux/store/CartSlice";
import { WishlistSliceActions } from "@/redux/store/WishlistSlice";
import conversions from "../../../../libs/currencyConversions";

type Props = {
  product: product;
};

const responsiveSwiper = {
  320: { slidesPerView: 4, spaceBetween: 5 },
  480: { slidesPerView: 4, spaceBetween: 5 },
  1024: { slidesPerView: 5, spaceBetween: 10 }
};

export default function ProductView({ product }: Props) {

  const [prevImage, setPrevImage] = useState<string>(`${product.images[0]}`);
  const [productImages,setProductImages] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [cart,setCart] = useState<PartialProduct[]>([])
  const [productQuantity,setProductQuantity] = useState<number>(1)
  const [currency,setCurrency] = useState("")



 useEffect(() => {

  const storedIntialCurrency = localStorage.getItem("currency")
  const initialCurrency  = storedIntialCurrency ? JSON.parse(storedIntialCurrency) : "AED"

  setCurrency(initialCurrency)

},[])

  useEffect(() => {

    const preloadImages = product.images.map((image) => {
      return image;
    });

    setProductImages(preloadImages)

  },[product])


  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    const initialWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];

    setWishlist(initialWishlist)
  },[])



  useEffect(() => {
    const storedcart = localStorage.getItem("cart")
    const initialCart = storedcart ? JSON.parse(storedcart) : [];
    setCart(initialCart)
  },[])



 


  const dispatch = useDispatch()

  const handleWishlist = (productId: number) => {

    if(wishlist?.includes(productId.toString())) {
      const updatedWishlist = wishlist.filter((eachId : string) => eachId !== productId.toString())

      setWishlist(updatedWishlist)
      dispatch(WishlistSliceActions.removeFromWishlist())
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

      return
    }


    if(wishlist.length >= 1) {

      const currentWishlist = wishlist 

      const updatedWishlist = [...currentWishlist, `${productId}`]
      dispatch(WishlistSliceActions.addToWishlist())
      setWishlist(updatedWishlist)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

    } else {

      const initialWishlist = [`${productId}`]

      
      setWishlist([`${productId}`])
      dispatch(WishlistSliceActions.addToWishlist())

      localStorage.setItem("wishlist", JSON.stringify(initialWishlist))

    }
  }

  const handleAddtoCart = (product : product) => {

    const {id, brand ,title, price,images,stock_quantity} = product

    const isProductInCart = cart.some(eachProd => eachProd.id === product.id) 
    
    if(isProductInCart) {

      const updatedCart = cart.filter(eachProduct => eachProduct.id !== product.id)

     
      dispatch(CartSliceActions.cartCountDecrement())
      setCart(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      
      
    } else {

      const updatedCart = [...cart, {id,brand,title,price,images,stock_quantity,productQuantity}]

      dispatch(CartSliceActions.cartCountIncrement())
      setCart(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
    }

  }

  const increment = () => {
    if(productQuantity < product.stock_quantity) {
      setProductQuantity(preQuantity => preQuantity + 1)
    }
  }
  
  const decrement = () => {
    if (productQuantity > 1) {
      setProductQuantity(prevQuantity => prevQuantity - 1);
    }
  }


  return (
    <div className={styles.productViewContainer}>
      <div className={styles.productDisplayContainer}>
        <Image
          key={prevImage}
          className={styles.viewingImage}
          src={prevImage}
          alt={product.title}
          width={500}
          height={500}
        />
        <Swiper
          className={styles.Swiper_Container}
          breakpoints={responsiveSwiper}
        >
          {productImages.map((eachImage) => {
            return (
              <SwiperSlide
                key={eachImage}
                className={`${styles.Swiper_Slider_Container} ${
                  prevImage === eachImage ? styles.active : null
                }`}
              >
                <Image
                  className={styles.productImage}
                  src={`${eachImage}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  onClick={() => setPrevImage(eachImage)}
                />
                <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={styles.productInformationContainer}>
        <p className={`${poiret.className} ${styles.brand}`}>{product.brand}</p>
        <h2 className={`${philosopher.className} ${styles.name}`}>
          {product.title}
          {product.best_seller && (
            <span className={styles.best_seller}>Best Seller</span>
          )}
        </h2>
        <div className={styles.pricesContainer}>
          <p>
            Was:{" "}
            <span className={`${styles.old_price} ${cormant_infant.className}`}>
            {(product.price * conversions[currency]).toLocaleString()}.00 {currency}
            </span>
          </p>
          <p className={styles.price_container}>
            Now:{" "}
            <span className={`${styles.price} ${cormant_infant.className}`}>
            {(product.price * conversions[currency]).toLocaleString()}.00 {currency}
            </span>
            <span className={styles.vat}>(Inclusive of VAT)</span>
            <span className={styles.discount}>
              {Math.floor(
                Math.abs(
                  ((product.price - product.old_price) / product.old_price) *
                    100
                )
              )}
              % Off
            </span>
          </p>
        </div>
        <p className={philosopher.className}>{product.description}</p>
        <div className={styles.Emi_container}>
          <div className={styles.tamara}>
            <Image
              className={styles.tamara_logo}
              src="/Others/tamara_logo.svg"
              width={0}
              height={0}
              alt="tamara"
            />
            <p>
              Pay 4 interest-free payments of {currency} 8.25.{" "}
              <Link className={styles.learn_more} href={"/"}>
                Learn more
              </Link>
            </p>
          </div>
          <div className={styles.tabby}>
            <Image
              className={styles.tabby_logo}
              src="/Others/tabby_logo.svg"
              width={0}
              height={0}
              alt="tabby"
            />
            <p>
              Pay 4 interest-free payments of {currency} 8.25.{" "}
              <Link className={styles.learn_more} href={"/"}>
                Learn more
              </Link>
            </p>
          </div>
        </div>

        <p className={styles.payment_plan}>
          Monthly payment plans from {currency} 33.&nbsp;
          <Link className={styles.more_details} href={"/"}>View more details</Link>
        </p>

        <div className={`${philosopher.className} ${styles.ratingContainer}`}>
          <Image src="/Others/star.png" width={12} height={12} alt="rating" />
          <span className={`${cormant_infant.className} ${styles.rating}`}>
            {product.rating} / 5
          </span>
        </div>

        <p className={styles.availQty}>
          Avail Qty:{" "}
          <span className={styles.quantity}>{product.stock_quantity}</span>
        </p>

        <div className={styles.order_button_container}>

          <div className={styles.quantity_container}>
            <button onClick={decrement} className={styles.quantity_action_btn}>-</button>
            <input
              className={styles.quantity_field}
              type="number"
              min={1}
              value={productQuantity === 0 ? "" : productQuantity}
              max={product.stock_quantity}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), product.stock_quantity);
                setProductQuantity(value);
              }}
            />
            <button onClick={increment} className={styles.quantity_action_btn}>+</button>
          </div>
          {product.stock_quantity < 1 ? <button className={styles.outOfStock}>Out of Stock</button> : <button onClick={() => handleAddtoCart(product)} className={`${styles.addToCart} ${cart.some(eachProduct => eachProduct.id === product.id) && styles.added}`}>{cart.some(eachProduct => eachProduct.id === product.id) ? "REMOVE FROM" : "ADD TO "} CART</button>}
          <button onClick={() => handleWishlist(product.id)} className={`${styles.wishlist_btn} ${wishlist?.includes(product.id.toString()) && styles.active}`}>{wishlist?.includes(product.id.toString()) ? "In" : "+"} Wishlist</button>
        </div>
      </div>
      <div className={styles.additionalInfoContainer}>
        <div className={styles.policyContainer}>
          <p className={styles.policy}>
            <Image
              src={"/Others/return.png"}
              width={20}
              height={20}
              alt="return"
            />
            7 Day return policy
          </p>
          <p className={styles.policy}>
            <Image
              src={"/Others/key.png"}
              width={20}
              height={20}
              alt="return"
            />
            Free delivery on Lockers & Pickup Points
          </p>
          <p className={styles.policy}>
            <Image
              src={"/Others/person.png"}
              width={20}
              height={20}
              alt="return"
            />
            24 / 7 Customer Support
          </p>
        </div>

        <div className={styles.sellerinfoContainer}>
          <div className={styles.companyDetailsContainer}>
            <Image
              src="/Others/lv_logo.png"
              alt="company_logo"
              width={60}
              height={60}
            />
            <div className={styles.companyContainer}>
              <p>Sold by Louis Vuitton</p>
              <span>3.8</span>
            </div>
          </div>
          <p>
            Louis Vuitton - an emblem of timeless elegance seamlessly entwined
            with a modern edge
          </p>
        </div>

        <div className={styles.benefitsContainer}>
          <div className={styles.benefitContainer}>
            <h3>Free Returns</h3>
            <p>Get free returns on eligible items</p>
          </div>

          <div className={styles.benefitContainer}>
            <h3>Trusted Shipping</h3>
            <p>
              Free shipping when you spend {currency} 100 and above on express items
            </p>
          </div>

          <div className={styles.benefitContainer}>
            <h3>Contactless Delivery</h3>
            <p>
              Your delivery will be left at your door, valid on prepaid orders
              only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
