import fetchProductData from "../../../../libs/fetchProductData"


export async function GET(request: Request) {

  const url = new URL(request.url)
  const productId = url.searchParams.get("id")

  const product = await fetchProductData(productId) as product

  const response = JSON.stringify(product)

  return new Response(response)
}
