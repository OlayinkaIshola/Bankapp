import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import Layout from "@/components/layout/Layout";
import { ToastProvider } from '@/components/ui/Toast';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SecureBank - Your Trusted Financial Partner",
  description: "Secure online banking with comprehensive financial services including checking, savings, loans, and investment options.",
  keywords: "banking, finance, loans, savings, checking, credit cards, investments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ReduxProvider>
          <ThemeProvider>
            <ToastProvider>
              <Layout>
                {children}
              </Layout>
            </ToastProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
