"use client"
import React, { useEffect, useState } from 'react'

import styles from "./Cart.module.css"
import Image from 'next/image'
import { philosopher,cormant_infant, lato, quicksand } from '../../../../libs/allFonts'
import { useDispatch } from 'react-redux'
import { CartSliceActions } from '@/redux/store/CartSlice'
import { WishlistSliceActions } from '@/redux/store/WishlistSlice'
import EmptyCart from '../EmptyCart/EmptyCart'
import Link from 'next/link'

export default function Cart() {

    const dispatch = useDispatch()

    const [wishlist, setWishlist] = useState<string[]>([])
    const [cart,setCart] = useState<PartialProduct[]>([])
    const [cartTotal,setCartTotal] = useState<number>(0)

  const [wishlistCalls, setWishlistCalls] = useState(0)
  const [cartCalls, setCartCalls] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedWishlist = localStorage.getItem("wishlist");
      const initialWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      setWishlist(initialWishlist);
    }
  }, [wishlistCalls]);

  useEffect(() => {
    const storedcart = localStorage.getItem("cart")
    const initialCart = storedcart ? JSON.parse(storedcart) : [];
    setCart(initialCart)
  },[cartCalls])
  

  useEffect(() => {

    const totalCost = cart.reduce((accum, eachProduct: PartialProduct) => {
      const productPrice = eachProduct.price ?? 0
      const productQuantity = eachProduct.productQuantity ?? 0
      const totalPrice = productPrice * productQuantity
      return totalPrice + accum
    },0)


    setCartTotal(totalCost)

  },[cart])
    

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

  const deleteItem = (productId: number) => {
    
    const updatedCart = cart.filter(eachProduct => eachProduct.id !== productId)

    localStorage.setItem("cart", JSON.stringify(updatedCart))
    
    setCartCalls(prevState => {
      return prevState + 1
    })

    dispatch(CartSliceActions.cartCountDecrement())
  }


  const handleQuantityChange = (id: number, quantity: string, stockLeft?: number) => {
    const parsedQuantity = Number(quantity);
  
    if (isNaN(parsedQuantity) || parsedQuantity > (stockLeft || 0)) {
      return;
    }
  
    const updatedCart: PartialProduct[] = cart.map((product) =>
      product.id === id ? { ...product, productQuantity: parsedQuantity === 0 ? 1 : parsedQuantity } : product
    );
  
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };
  

  return (
    <>
    {cart.length ? <div className={styles.mainCartContainer}>
        <div className={styles.cartContainer}>
            <h1 className={quicksand.className}>Cart</h1>
            <p>The prices of some products in your cart may have changed, Please review your cart before proceeding</p>
            <div className={styles.cartlistContainer}>
                {cart.map(eachItem => {
                    return <div key={eachItem.id} className={styles.itemContainer}>
                      
                    <Image width={125} height={125} alt={eachItem.title ? eachItem.title : "item"} src={eachItem.images ? eachItem.images[0] : ""} />
                    
                      <div className={styles.mainItemDetailsContainer}>
                      <Link href={`./products/${eachItem.id}`} className={styles.ItemDetailsContainer} >
                        <p>{eachItem.brand}</p>
                        <h3 className={`${styles.productName} ${philosopher.className}`}>{eachItem.title}</h3> 
                        <span className={cormant_infant.className}>{eachItem.price}.00</span>
                      </Link>
                      <button onClick={() => handleWishlist(eachItem.id)} className={`${styles.wishlist_btn} ${wishlist?.includes(eachItem.id.toString()) && styles.active }`}>{wishlist.includes(eachItem.id.toString()) ? "In" : "+" } Wishlist</button>
                      </div>
             
                    <div className={styles.itemEditContainer}>
                      <span className={styles.itemQuantity}>Qty:</span>
                      <input placeholder="eg. 12" min={1} onChange={(e) => handleQuantityChange(eachItem.id, e.target.value,eachItem.stock_quantity)} value={eachItem.productQuantity ? eachItem.productQuantity : ""} max={eachItem.stock_quantity} type="number" name="quantity" />
                      <button onClick={() => deleteItem(eachItem.id)} className={`${styles.deleteButton} ${lato.className}`}>DELETE</button>
                    </div>
                    
                  </div> 
                })}
            </div>
            
        </div>
        <div className={styles.summaryContainer}>
            <p>Order Summary</p>
            <div className={styles.couponContainer}>
             <input type="text" placeholder='Coupon Code' /> 
             <button>APPLY</button>
            </div>
            
            <div className={styles.summaryDetailsContainer}>
              <div className={styles.subtotalContainer}>
                <p>Subtotal({cart.length} items)</p>
                <span>{cartTotal}.00</span>
              </div>
              <div className={styles.shippingDetailsContainer}>
                <p>Shipping Details</p>
                <span className={styles.free}>Free</span>
              </div>
            </div>
            <div className={styles.lineBreak}></div>
            <div className={styles.checkoutContainer}>
              <div className={styles.totalContainer}>
                <div className={`${styles.totalText} ${lato.className}`}>Total <span className={styles.vat}>(Inclusive of VAT)</span></div>
                <span className={styles.total}>{cartTotal}.00</span>
              </div>
              <p className={styles.payment_plan}>
                Monthly payment plans from AED 500.
                <Link className={styles.more_details} href={"/"}>View more details</Link>
              </p>
              <button className={`${styles.checkoutButton} ${lato.className}`}>CHECKOUT</button>
            </div>
        </div>  
    </div> : <EmptyCart />}
    
    </>
  )
}
