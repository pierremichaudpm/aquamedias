"use client";

import { Antonio, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-antonio",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${antonio.variable} ${cormorant.variable}`}>
      <head>
        <title>Aquamedias - Spécialistes en images aquatiques</title>
        <meta
          name="description"
          content="Nous créons l'impossible sous l'eau depuis 2000. Spécialistes en production aquatique pour films, séries et expériences immersives."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-black text-white overflow-x-hidden">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
