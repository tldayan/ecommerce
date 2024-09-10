
import {loadStripe} from "@stripe/stripe-js"
const path = require("path")
require('dotenv').config({ path: path.join(__dirname, '.env') })




const handleStripe = async() => {
const cart = JSON.parse(localStorage.getItem("cart"))
const currency = JSON.parse(localStorage.getItem("currency"))

const filteredCart = cart.map(eachObj => {
    const productImage = eachObj.images[0].startsWith('/') ? eachObj.images[0] : `/${eachObj.images[0]}`;
    return {
        id: eachObj.id,
        productName: eachObj.title,
        price: eachObj.price,
        productQuantity: eachObj.productQuantity,
        productImage: productImage
    };
});

    

    try {

        const stripe = await loadStripe(`${process.env.REACT_STRIPE_KEY}`)

        const stripeReq = await fetch("https://ecomxpress-server.vercel.app/create-stripe-session",{
            method : 'POST',
            body : JSON.stringify({"products" : filteredCart, "currency" : currency.toLowerCase()}),
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const session = await stripeReq.json()

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })

        if(result.error) {
            console.log(result.error)
        }

    } catch (err) {
        console.log(err)
    }



}

export default handleStripe