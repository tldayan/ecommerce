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
import { useStytch } from "@stytch/nextjs";

interface UserLoggedValue {
  session: string | null;
}

export default function Navbar() {

  const stytchClient = useStytch()
  
  const [wishlist, setWishlist] = useState<PartialProduct[]>([]);
  const [cart, setCart] = useState<PartialProduct[]>([]);
  const [currency, setCurrency] = useState<string>("");
  const [isSelectingCurrency,setIsSelectingCurrency] = useState(false)
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserLoggedValue = localStorage.getItem(`stytch_sdk_state_${process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN}`);
      let userLoggedValue: UserLoggedValue | null = storedUserLoggedValue ? JSON.parse(storedUserLoggedValue) : null;
      setIsUserLogged(userLoggedValue !== null && userLoggedValue.session !== null);
    }
  }, []);


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

  const handleLogout = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    await stytchClient.session.revoke()
    window.location.reload()
  }


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

          {!isUserLogged &&
            <>
              <button onClick={() => handleAuth("login")} className={`${styles.login_btn} ${roboto.className}`}>Log In</button>
              <button onClick={() => handleAuth("signup")} className={`${styles.signup_btn} ${roboto.className}`}>Sign Up</button>
            </>}
            {isUserLogged && <button onClick={handleLogout} className={`${styles.logout_btn} ${roboto.className}`}>Logout</button>}
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
