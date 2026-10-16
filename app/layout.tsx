import type { Metadata, Viewport } from "next";
import { Newsreader, Work_Sans } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { PRODUCT_NAME, SITE_URL } from "@/lib/config";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  variable: "--font-newsreader",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#17140f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PRODUCT_NAME} — Fractional CFO, GAAP Advisory, Tax & Audit`,
    template: `%s | ${PRODUCT_NAME}`,
  },
  description:
    `${PRODUCT_NAME} runs the fractional CFO, technical GAAP advisory, accounting, tax, and audit work of a full finance department under US GAAP, IFRS, or Ind AS.`,
  keywords: [
    "Fractional CFO",
    "GAAP Advisory",
    "US GAAP",
    "IFRS",
    "Ind AS",
    "ASC 606 Revenue Recognition",
    "ASC 842 Lease Accounting",
    "Audit Readiness",
    "Strategic Accounting",
    "Controller Services",
    "SOC 1 SOC 2 Readiness",
    "Financial Due Diligence",
  ],
  authors: [{ name: PRODUCT_NAME, url: SITE_URL }],
  creator: PRODUCT_NAME,
  publisher: PRODUCT_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: PRODUCT_NAME,
    title: `${PRODUCT_NAME} — Fractional CFO, GAAP Advisory, Tax & Audit`,
    description:
      "The finance team you'd otherwise assemble one hire at a time. Fractional CFO, technical GAAP advisory, accounting, tax, and audit readiness.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRODUCT_NAME} — Fractional CFO, GAAP Advisory, Tax & Audit`,
    description:
      "The finance team you'd otherwise assemble one hire at a time. US GAAP, IFRS, or Ind AS.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${workSans.variable} antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-background text-foreground font-body overflow-x-clip"
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
