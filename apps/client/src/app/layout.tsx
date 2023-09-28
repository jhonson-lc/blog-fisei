import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeButton from "./components/ThemeButton";
import Link from "next/link";
import { URL_CLIENT } from "./config";
import { icons } from "./icons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeButton />
        {children}
      </body>
    </html>
  );
}
