"use client"
import React, {useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import "../../../app/globals.css"
import styles from "./LoginSignup.module.css"
import { useAppSelector } from '@/redux/store/store'
import { useDispatch } from 'react-redux'
import { AuthStateSliceActions } from '@/redux/store/AuthStateSlice'
import { useStytch } from '@stytch/nextjs'
import ResetPassword from '../ResetPasswordComponent/ResetPassword'

export default function LoginSignupComponent() {

    const loginSignupContainer = useRef(null)
    const overlay = useRef(null)
    const [islogin, setIsLogin] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [serverAuthMessage, setServerAuthMessage] = useState("")
    const [isResettingPassword,setIsResettingPassword] = useState(false)
    const [passwordResetEmailSent, setPasswordResetEmailSent] = useState(false)
    const dispatch = useDispatch()
    const stytchClient = useStytch()
    
    
const isUserAuth = useAppSelector((state) => state.Auth.isAuth)
const isLoggingIn = useAppSelector((state) => state.Auth.isLoggingIn)



useEffect(() => {

  if(window.location.href.includes('/resetpassword')) {
    setIsResettingPassword(true)
    return
  }

    if(!isLoggingIn) {
        setIsLogin(false)
    } else {
        setIsLogin(true)
    }
},[isLoggingIn])

  const handlePasswordReset = async() => {
    await stytchClient.passwords.resetByEmailStart({email : "pereradevika651@gmail.com"})
    setPasswordResetEmailSent(true)
  }


  const handleAuth = async(e) => {
    e.preventDefault()
    
    if(islogin) {

      try {
      const res = await stytchClient.passwords.authenticate({email,password,session_duration_minutes: 60})

        window.location.reload()
      } catch (err) {
        if(err.status_code === 401) {
          setServerAuthMessage("Invalid Email or Password")
        } else if(err.status_code === 404) {
          setServerAuthMessage('Unregistered email address, Please Sign Up')
        }
      }
      


    } else { // Sign Up

      try {
        const res = await stytchClient.passwords.strengthCheck({email,password})
        
        if(res.valid_password === true) {

          await stytchClient.passwords.create({email,password,session_duration_minutes: 60})
          window.location.reload()
        } else {
          setServerAuthMessage("Create a password with numbers and special characters")
        }

      } catch(err) {
        console.log(err)
      }
    }
  }


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

    if(window.location.href.includes("resetpassword")) {
      window.location.href = "https://ecomxpress.vercel.app"
     /*  http://localhost:3000 */
      }
    }


  return (
    <>
     <div ref={overlay} className="dark_overlay"></div>
    <div ref={loginSignupContainer} className={styles.main_modal_container}>
              {!isResettingPassword ? <>
              <button onClick={handleAuthClose} href="/" className={styles.close_modal_button}>&#x2716;</button>
                <h3 className={styles.auth_type}>{islogin ? "Login" : "Sign up"}</h3>
              <form className={styles.login_signup_container}>
                <div className={styles.email_container}>
                  <label htmlFor="user_email">Email Address</label>
                  <input onClick={() => {setPasswordResetEmailSent(""); setServerAuthMessage("")}} onChange={(e) => setEmail(e.target.value)} type="text"  placeholder='Enter email' id="user_email" required />
                </div>
                <div className={styles.password_container}>
                  <label htmlFor="user_password">Password {islogin && <span /* href={"/pages/resetpassword"}  */onClick={handlePasswordReset} className={styles.forgot_password}>Forgot password? Reset password now</span>}</label>
                  <input onClick={() => {setPasswordResetEmailSent(""); setServerAuthMessage("")}} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter password' id="user_password" required />
                </div>
                {passwordResetEmailSent && <p className={styles.email_sent_notice}>Email to reset password sent!</p>}
                <p className={styles.server_auth_notice}>{serverAuthMessage}</p>
                <button onClick={handleAuth} className={styles.loginSignup_btn}>{islogin ? "Login" : "Sign up"}</button>
                {islogin ? <Link href="/" onClick={() => setIsLogin(false)} className={styles.no_account} >Don&apos;t have an account? Sign up.</Link> : <Link href="/" onClick={() => setIsLogin(true)} className={styles.existing_account} >Already have an account? Log in.</Link>}
              </form>
              </> : <ResetPassword handleAuthClose={handleAuthClose} setIsResettingPassword={setIsResettingPassword} />}
            </div>
    </>
  )
}
