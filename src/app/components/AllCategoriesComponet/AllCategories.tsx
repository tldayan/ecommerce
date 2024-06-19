"use client";
import styles from "./AllCatergoties.module.css";
import CatergorySlider from "../CategorySliderComponent/CatergorySlider";
import { philosopher } from "../../../../libs/allFonts.js";
import { useEffect, useState } from "react";
import Loading from "@/app/api/loadingSkeletons/loading";

export default function AllCategories() {
  const [category, setCategory] = useState<string>("men");
  const [products, setProducts] = useState<product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [allcategories, setAllCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchAllProducts = async () => {
      
      const data = await fetch(`http://localhost:3000/api/products`);
      /* https://localhost:3000 */

      const products = await data.json();

      setProducts(JSON.parse(JSON.stringify(products)));

      setLoading(false);

      const allCategories: string[] = [];

      for (const product of products) {
        if (!allCategories.includes(product.category)) {
          allCategories.push(product.category);
        }
      }

      setCategories(allCategories);
      setAllCategories(allCategories);
    };

    fetchAllProducts();
  }, []);



  useEffect(() => {
    setCategories((prevCategories) => {
      const selectedCategoryIndex = prevCategories.indexOf(category);
      const updatedCategories = [
        category,
        ...prevCategories.slice(0, selectedCategoryIndex),
        ...prevCategories.slice(selectedCategoryIndex + 1),
      ];
      return updatedCategories;
    });
  }, [category]);



  return (
    <>
      <div className={`${styles.CategoryButtonsContainer} ${philosopher.className}`}>
        {allcategories.map((cat) => (
          <button
            key={cat}
            className={cat === category ? styles.active : ""}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      {loading ? (
        <Loading />
      ) : (
        categories.map((eachCategory) => {
          return (
            <CatergorySlider
              key={eachCategory}
              products={products.filter(
                (eachProd) => eachProd.category === eachCategory
              )}
            />
          );
        })
      )}
    </>
  );
}
