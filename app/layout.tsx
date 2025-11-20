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
  description: "컴퓨터 과학에 대한 지식을 나의 언어로 표현해보는 곳",
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
        <meta property="og:title" content="Tech Vibe" />
        <meta property="og:url" content="https://tech-vibe-zzz664.vercel.app" />
        <meta property="og:type" content="blog" />
        <meta
          property="og:image"
          content="https://tech-vibe-zzz664.vercel.app/logo.png"
        />
        <meta
          property="og:description"
          content="컴퓨터 과학에 대한 지식을 나의 언어로 표현해보는 곳"
        />
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
