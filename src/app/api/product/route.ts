import fetchProductData from "../../../../libs/fetchProductData"


export async function GET(request: Request) {

  const product = await fetchProductData() as product

  const response = JSON.stringify(product)

  return new Response(response)
}
