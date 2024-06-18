
import {loadStripe} from "@stripe/stripe-js"
const path = require("path")
require('dotenv').config({ path: path.join(__dirname, '.env') })




const handleStripe = async() => {
const cart = JSON.parse(localStorage.getItem("cart"))
const currency = JSON.parse(localStorage.getItem("currency"))

const filteredCart = cart.map(eachObj => {
    return {
        id: eachObj.id,
        productName: eachObj.title,
        price: eachObj.price,
        productQuantity : eachObj.productQuantity,
        productImage: eachObj.images[0]
    }
})
    

    try {

        const stripe = await loadStripe(`pk_test_51PSDezRpj65u8bPMNzmafgBLp6lRTTQSo74iBNzfyIzfwKsGofLInQdYxbHYsbNHFOOrEIjobx5DpRoKMMW4twvo00VIbievJM`)

        const stripeReq = await fetch("https://ecomxpress.vercel.app/create-stripe-session",{
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