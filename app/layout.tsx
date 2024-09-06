import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/Footer";


const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gaurvice - Your Trusted Service Booking Platform",
  description:
    "Book services effortlessly with Gaurvice. Find and schedule professional services near you with just a few clicks.",
  keywords:
    "service booking, online booking, professional services, Gaurvice, schedule services, local services, book online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        <main className="lg:px-16 px-8">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
