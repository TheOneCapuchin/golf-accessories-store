import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import GlobalLayout from "@/components/GlobalLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "KapuchinGolf 🐒 Porsgrunn - Premium Forest Golf Accessories",
  description: "Experience the exclusive KapuchinGolf clubhouse atmosphere in Porsgrunn. Premium golf accessories with Deep Forest vibes and Electric Lime energy. 🐒⛳",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <GlobalLayout>
          {children}
        </GlobalLayout>
      </body>
    </html>
  );
}
