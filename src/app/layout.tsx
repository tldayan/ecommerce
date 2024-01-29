import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/NavbarComponent/Navbar";
import { ReduxProvider } from "@/redux/provider";
import Footer from "./components/Footer/Footer";
import LoginSignupComponent from "../app/components/LoginSignupComponent/LoginSignupComponent"


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
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
        <script defer src="https://kit.fontawesome.com/3b161c540c.js" crossOrigin="anonymous"></script>
      </head>
      <body>
        <ReduxProvider>
        <Navbar />
        <LoginSignupComponent />
        {children}
        <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
