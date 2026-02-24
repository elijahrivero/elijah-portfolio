import "./globals.css";
import Navigation from "./Navigation";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Elijah Rivero",
  description: "",
  icons: {
    icon: '/favicon.ico',
  },
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <Navigation>
          {children}
        </Navigation>
      </body>
    </html>
  );
}
