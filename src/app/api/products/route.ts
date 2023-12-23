import fetchProducts from "../../../../libs/fetchProducts"

export async function GET(request: Request) {

  const products = await fetchProducts() as product[]

  const response = JSON.stringify(products)

  return new Response(response)
}
