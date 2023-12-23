
import AllCategories from "./components/AllCategoriesComponet/AllCategories";
import BrandBanner from "./components/BrandBannerComponent/BrandBanner";


export const revalidate = 50000

export default function Home() {
  return (
    <main>
      <BrandBanner />
      <AllCategories />
    </main>
  );
}
