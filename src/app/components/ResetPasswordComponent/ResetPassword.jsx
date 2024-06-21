"use client"
import React, {useState } from 'react'
import "../../../app/globals.css"
import styles from "../LoginSignupComponent/LoginSignup.module.css"
import { useStytch } from '@stytch/nextjs'
import { useDispatch } from 'react-redux'
import { AuthStateSliceActions } from '@/redux/store/AuthStateSlice'

export default function ResetPassword({handleAuthClose,setIsResettingPassword}) {

    const [password,setPassword] = useState("")
    const stytchClient = useStytch()
    const [serverAuthMessage, setServerAuthMessage] = useState("")
    const dispatch = useDispatch()

  const resetPasswordViaEmail = async(e) => {
    e.preventDefault()
    const token = new URLSearchParams(window.location.search).get("token")
    if(!token)  {
      console.log("No token")
    }

    try {
      const res = await stytchClient.passwords.resetByEmail({token : token, password : password, session_duration_minutes : 60})
   
      if(res.status_code === 200) {
        window.location.href = "https://ecomxpress.vercel.app"
        /* http://localhost:3000 */
        dispatch(AuthStateSliceActions.setAuth())
        setIsResettingPassword(false)
      }
      
    } catch (err) {

      if(err.status_code === 400) {
        setServerAuthMessage("Create a password with numbers and speacial characters")
      }
    }
  }


  return (
    <>
      <button onClick={handleAuthClose} href="/" className={styles.close_modal_button}>&#x2716;</button>
        <h3 className={styles.auth_type}>Reset your Password</h3>
        <p className={styles.reset_password_notice}>Please check your email address to reset your password</p>
      <form className={styles.login_signup_container}>
        <div className={styles.password_container}>
          <input onClick={() => setServerAuthMessage("")} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter new password' id="user_new_password" required />
        </div>
        <p className={styles.server_auth_notice}>{serverAuthMessage}</p>
        <button onClick={resetPasswordViaEmail} className={styles.loginSignup_btn}>Reset</button>
      </form>
    </>
  )
}
