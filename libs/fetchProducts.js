// fetchProducts.js

import clientPromise from "./mongodb";


let products


export const fetchProducts = async () => {

  try {

    let client = await clientPromise
    let db = await client.db()
    products = await db.collection("Products")

    const result = await products.find().toArray()

    return result

  }catch (error) {
    console.log("error geting result")
  }

};


export default fetchProducts