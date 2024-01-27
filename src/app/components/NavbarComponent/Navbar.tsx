"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./navbar.module.css";
import SearchBar from "../SearchComponent/SearchBar";
import { useAppSelector } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import AuthStateSlice from "@/redux/store/AuthStateSlice";
import "../../../app/globals.css";
import CurrencyModal from "../CurrencyModal/CurrencyModal";
import { roboto } from "../../../../libs/allFonts";

export default function Navbar() {
  const [wishlist, setWishlist] = useState<PartialProduct[]>([]);
  const [cart, setCart] = useState<PartialProduct[]>([]);
  const [currency, setCurrency] = useState<string>("");
  const [isSelectingCurrency,setIsSelectingCurrency] = useState(false)
  
  const wishlistQuantity = useAppSelector((state) => state.Wishlist.quantity);
  const cartQuantity = useAppSelector((state) => state.Cart.cartQuantity);
  const dispatch = useDispatch();

  useEffect(() => {

    if(currency !== "") {
      localStorage.setItem("currency", JSON.stringify(currency))
      return
    }

    const storedIntialCurrency = localStorage.getItem("currency")
    const initialCurrency  = storedIntialCurrency ? JSON.parse(storedIntialCurrency) : "AED"

    setCurrency(initialCurrency)

  },[currency])


  const handleAuth = (loginOrSignup: string) => {
    dispatch(AuthStateSlice.actions.setType(loginOrSignup));

    dispatch(AuthStateSlice.actions.setAuth());
  };

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    const Wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    setWishlist(Wishlist);
  }, [wishlistQuantity]);

  useEffect(() => {
    const storedcart = localStorage.getItem("cart");
    const initialCart = storedcart ? JSON.parse(storedcart) : [];

    setCart(initialCart);
  }, [cartQuantity]);

  return (
    <>

      <div className={`${styles.Navbar} ${roboto.className}`}>
       {isSelectingCurrency && <CurrencyModal currency={currency} setIsSelectingCurrency={setIsSelectingCurrency} setCurrency={setCurrency} />}
        <Link href="/" className={styles.logo}>
          ECOMEXPRESS
        </Link>
        <SearchBar />
        <div className={styles.navbarButtons}>
          <button onClick={() => setIsSelectingCurrency(true)}>{currency ? currency : "..."}</button>
          <Link href={"/pages/wishlist"}>
            <div className={styles.wishlistbuttonContainer}>
              {wishlist?.length > 0 && (
                <div
                  className={`${styles.wishlistQty} ${
                    wishlist?.length > 0 && styles.active
                  }`}
                >
                  {wishlist.length}
                </div>
              )}
              <Image
                className={styles.wishlist_btn}
                src="/NavbarImages/heart.png"
                width={22}
                height={22}
                alt="wishlist"
              />
            </div>
          </Link>
          <button
            onClick={() => handleAuth("login")}
            className={`${styles.login_btn} ${roboto.className}`}
          >
            Log In
          </button>
          <button
            onClick={() => handleAuth("signup")}
            className={`${styles.signup_btn} ${roboto.className}`}
          >
            Sign Up
          </button>
          <Link href={"/pages/cart"}>
            <div className={styles.cartImageContainer}>
              {cart?.length > 0 && (
                <div
                  className={`${styles.cartQty} ${
                    cart?.length > 0 && styles.active
                  }`}
                >
                  {cart.length}
                </div>
              )}
              <Image
                src="/NavbarImages/cart.png"
                alt="Cart"
                width={26}
                height={26}
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
