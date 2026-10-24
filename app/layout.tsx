import type { Metadata, Viewport } from "next";
import { Newsreader, Work_Sans } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import FloatingCalendlyButton from "@/components/FloatingCalendlyButton";
import FloatingCalculatorButton from "@/components/FloatingCalculatorButton";
import MicrosoftClarity from "@/components/MicrosoftClarity";
import GoogleAnalytics from "@/components/GoogleAnalytics";
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
    default: "Fractional CFO, Technical GAAP & Audit Advisory | Step 1",
    template: `%s | ${PRODUCT_NAME}`,
  },
  description:
    "Outsourced financial leadership, US GAAP/IFRS technical memos, and audit readiness for cross-border companies. Delivered by ex-Big 4 partners.",
  keywords: [
    "Fractional CFO",
    "GAAP Advisory",
    "US GAAP",
    "IFRS",
    "Ind AS",
    "ASC 606 Revenue Recognition",
    "ASC 842 Lease Accounting",
    "Audit Readiness",
    "Cross-Border Accounting",
    "Strategic Accounting",
    "Controller Services",
    "SOC 1 SOC 2 Readiness",
    "Financial Due Diligence",
  ],
  authors: [
    { name: PRODUCT_NAME, url: SITE_URL },
    { name: "Prashant Sharma", url: "https://prashantsharma.in/" },
  ],
  creator: "Prashant Sharma - Full Stack Developer (https://prashantsharma.in/)",
  publisher: PRODUCT_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: PRODUCT_NAME,
    title: "Fractional CFO, Technical GAAP & Audit Advisory | Step 1 Advisors",
    description:
      "Outsourced financial leadership, US GAAP/IFRS technical memos, and audit readiness for cross-border companies. Delivered by ex-Big 4 partners.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Step 1 Advisors — Fractional CFO, GAAP Advisory, Tax & Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fractional CFO, Technical GAAP & Audit Advisory | Step 1 Advisors",
    description:
      "Outsourced financial leadership, US GAAP/IFRS technical memos, and audit readiness for cross-border companies.",
    images: [`${SITE_URL}/og-image.png`],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
          <FloatingCalculatorButton />
          <FloatingCalendlyButton />
        </SmoothScrollProvider>
        <MicrosoftClarity />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
