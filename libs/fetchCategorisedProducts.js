
import clientPromise from "./mongodb"

export const fetchCategorisedProducts = async(category) => {

    try {

        let client = await clientPromise
        let db = await client.db()
        const products = await db.collection("Products")
    
        const result = await products.find({category}).toArray()

        const categorisedResults = result.filter(eachProd => eachProd.category === category)

        return categorisedResults
        
    } catch (error) {
        console.log(error.message) 
    }
    

}

export default fetchCategorisedProducts