
import type { Metadata } from "next";
import Navbar from "./components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dasindu Dilvan | Developer Portfolio",
  description: "Personal portfolio of Dasindu Dilvan Wijethunga.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
