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
  title: "Zigbee",
  description: "Zigbee, MCA Department Club, OUTR",
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
