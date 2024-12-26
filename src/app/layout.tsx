import { ThemeProvider } from "@/components/provider/theme-provider";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import NextAuthSessionProvider from "@/components/provider/NextAuthSessionProvider";
import { Toaster } from "@/components/ui/toaster";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Zigbee Student Developers' Club, OUTR (CETB), Bhubaneswar",
  description:
    "Zigbee is a student run community run by OUTR MCA Students that focuses fundamentally on software development.",
  keywords:
    "Zigbee, MCA, OUTR, Student Developers' Club, Zigbee Student Developers' Club, tech club, tech event, odisha tech club, odisha college club, college club, MCA club, mca club, 2025, tech, club, tech conference, outr, odisha university of technology and research, cet, college of engineering and technology, bhubaneswar, odisha, india",
  authors: {
    url: "https://zigbeeoutr.in/",
    name: "MCA Department, OUTR (CETB), Bhubaneswar",
  },
  applicationName: "Zigbee Student Developers' Club, OUTR",
  creator: "MCA Department, OUTR (CETB), Bhubaneswar",
  icons: {
    icon: [
      {
        url: "./favicon.ico",
        rel: "icon",
        type: "image/x-icon",
      },
      {
        url: "/favicon-16x16.png",
        rel: "icon",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        rel: "icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        rel: "apple-touch-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: {
      url: "./favicon.ico",
      rel: "shortcut icon",
      type: "image/x-icon",
    },
  },
  openGraph: {
    type: "website",
    url: "https://zigbeeoutr.in/",
    title: "Zigbee Student Developers' Club, OUTR (CETB), Bhubaneswar",
    description:
      "Zigbee is a student run community run by OUTR MCA Students that focuses fundamentally on software development.",
    images: [
      {
        url: "https://res.cloudinary.com/dljszrwl0/image/upload/v1735248181/og-image_cxf84l.webp",
        width: 1200,
        height: 630,
        alt: "Zigbee Student Developers' Club, OUTR (CETB), Bhubaneswar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zigbeecetb",
    title: "Zigbee Student Developers' Club, OUTR (CETB), Bhubaneswar",
    description:
      "Zigbee is a student run community run by OUTR MCA Students that focuses fundamentally on software development.",
    creator: "Zigbee Student Developers' Club",
    images: {
      url: "https://res.cloudinary.com/dljszrwl0/image/upload/v1735248181/og-image_cxf84l.webp",
      width: 1200,
      height: 630,
      alt: "Zigbee Student Developers' Club, OUTR (CETB), Bhubaneswar",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} min-w-80 antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthSessionProvider>
            <Header />
            <div className="container mx-auto max-w-[1200px] px-4 py-8 text-gray-800 dark:text-gray-300 sm:px-6">
              {children}
            </div>
          </NextAuthSessionProvider>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
