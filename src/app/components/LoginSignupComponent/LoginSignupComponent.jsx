"use client"
import React, {useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import styles from "./LoginSignup.module.css"
import { useAppSelector } from '@/redux/store/store'
import { useDispatch } from 'react-redux'
import { AuthStateSliceActions } from '@/redux/store/AuthStateSlice'

export default function LoginSignupComponent() {

    const loginSignupContainer = useRef(null)
    const overlay = useRef(null)
    const [islogin, setIsLogin] = useState(false)
    const dispatch = useDispatch()
    
const isUserAuth = useAppSelector((state) => state.Auth.isAuth)
const isLoggingIn = useAppSelector((state) => state.Auth.isLoggingIn)

useEffect(() => {
    if(!isLoggingIn) {
        setIsLogin(false)
    } else {
        setIsLogin(true)
    }
},[isLoggingIn])





    useEffect(() => {

 const bodyElement = document.querySelector("body") 

        if(!isUserAuth) {
            loginSignupContainer.current.style.opacity = 0
            loginSignupContainer.current.style.pointerEvents = "none"
            overlay.current.style.visibility = "hidden"
            bodyElement.style.overflow = "visible"

        } else {
            loginSignupContainer.current.style.opacity = 1
            loginSignupContainer.current.style.pointerEvents = "auto"
            overlay.current.style.visibility = "visible"
            bodyElement.style.overflow = "hidden"
        }

    },[isUserAuth])

    const handleAuthClose = () => {
      dispatch(AuthStateSliceActions.setAuth())
    }


  return (
    <>
     <div ref={overlay} className={styles.dark_overlay}></div>
    <div ref={loginSignupContainer} className={styles.main_login_signup_container}>
              <button onClick={handleAuthClose} href="/" className={styles.close_modal_button}>&#x2716;</button>
                      <h3 className={styles.auth_type}>{islogin ? "Login" : "Sign up"}</h3>
              <form className={styles.login_signup_container}>
                <div className={styles.email_container}>
                  <label htmlFor="user_email">Email Address</label>
                  <input type="text" name=""  placeholder='Enter email' id="user_email" required />
                </div>
                <div className={styles.password_container}>
                  <label htmlFor="user_password">Password {islogin && <span className={styles.forgot_password}>Forgot password?</span>}</label>
                  <input type="password" name="" placeholder='Enter password' id="user_password" required />
                </div>
                <button className={styles.loginSignup_btn}>{islogin ? "Login" : "Sign up"}</button>
                {islogin ? <Link href="/" onClick={() => setIsLogin(false)} className={styles.no_account} >Don&apos;t have an account? Sign up.</Link> : <Link href="/" onClick={() => setIsLogin(true)} className={styles.existing_account} >Already have an account? Log in.</Link>}
              </form>
            </div>
    </>
  )
}
