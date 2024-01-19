import fetchCategorisedProducts from "../../../../libs/fetchCategorisedProducts"


export async function GET(request : Request) {
    
    const url = new URL(request.url)

    const category = url.searchParams.get("category")

    const products = await fetchCategorisedProducts(category)

    const response = JSON.stringify(products)
    
    return new Response(response)

}