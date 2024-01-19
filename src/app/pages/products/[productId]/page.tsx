import React from "react";
import fetchProducts from "../../../../../libs/fetchProducts";
import fetchProductData from "../../../../../libs/fetchProductData";
import notFound from "../../NotFound/page";
import ProductView from "@/app/components/ProductViewComponent/ProductView";
import CategoryProducts from "@/app/components/CategoryProductsComponent/CategoryProducts";

export async function generateStaticParams() {

    const products = await fetchProducts() as product[]

    return products.map(product => ({productId : product.id.toString()}))
}

export async function generateMetadata({params} : {params  : {productId : string}}) {

  const {productId} = params

  const products = await fetchProducts() as product[]

  const product = products.find(product => product.id.toString() === productId)

  if(!product) return notFound()

  return {title : product.title}
}



export default async function productView({params}: {params: { productId: string }}) {

  const { productId } = params;

  const product = await fetchProductData(productId) as product;

  if (!product) {
    return notFound();
  }

  product._id = product._id.toString()

  return (
    <div>
      <ProductView product={product} />

      <CategoryProducts category={product.category} />
    </div>
  );
}
