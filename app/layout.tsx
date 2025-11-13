import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Header, Footer } from "../components/common";
import { Toaster } from "sonner";
import { AuthProvider } from "../components/common";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Vibe",
  description: "최신 기술과 논문 소개 및 개인 포트폴리오를 게시하는 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="page">
              <Header />
              <div className="container">{children}</div>
              <Footer />
            </div>
            <Toaster richColors expand={false} position="top-center" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
