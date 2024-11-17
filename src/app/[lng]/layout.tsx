import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/header";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import { Language } from "../i18n";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fridge",
  description: "Description",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: Language }>;
}>) {
  const { lng } = await params;
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header lng={lng} />
        {children}
      </body>
    </html>
  );
}
