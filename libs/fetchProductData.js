
import clientPromise from "./mongodb";

export default async function fetchProductData(id) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const productsCollection = db.collection("Products");

    const selectedProduct = await productsCollection.findOne({ id: Number(id) });

    return selectedProduct;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}
