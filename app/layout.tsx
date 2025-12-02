import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import SmoothScroller from "@/app/(root)/_components/smooth-scroller";
import { Toaster } from "sonner";
import TransitionProvider from "@/providers/transition-provider";
import { Suspense } from "react";
import { ThemeProvider } from "@/providers/theme-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "showcase",
  description: "gedeapriana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${dmSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <SmoothScroller />
          </Suspense>
          <TransitionProvider>{children}</TransitionProvider>
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
