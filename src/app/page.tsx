"use client"

import AllCategories from "./components/AllCategoriesComponet/AllCategories";
import BrandBanner from "./components/BrandBannerComponent/BrandBanner";


export const revalidate = 51000;

export default function Home() {

  return (
    <main>
        <BrandBanner />
        <AllCategories />
    </main>
  );
}
