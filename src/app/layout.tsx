import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/NavbarComponent/Navbar";
import { ReduxProvider } from "@/redux/provider";
import Footer from "./components/Footer/Footer";



export const metadata: Metadata = {
  title: "EcomExpress",
  description: "Ecomexpress",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" /></head>
      <body>
        <ReduxProvider>
        <Navbar />
        {children}
        <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
