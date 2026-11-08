// app/layout.tsx
// Root layout – loads global styles and the data script
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Dasindu | Software Engineer",
  description: "Professional portfolio of Dasindu – Software Engineer & Full-Stack Developer",
};


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Load portfolio data globally so components can access it */}
        <script src="/data.js" defer />
      </head>
      <body>{children}</body>
    </html>
  );
}
