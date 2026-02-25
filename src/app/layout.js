import "./globals.css";
import Navigation from "./Navigation";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Elijah Rivero",
  description: "",
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: 'f-I4u-5qnXGxnlBcU9-5KQsmWDiQ8S211Vf69nGsFeE',
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
