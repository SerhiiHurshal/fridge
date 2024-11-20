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
      <head>
        <link rel="icon" type="image/png" href="/images/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Fridge" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header lng={lng} />
        {children}
      </body>
    </html>
  );
}
