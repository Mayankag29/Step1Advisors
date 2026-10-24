import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CredentialsTicker from "@/components/CredentialsTicker";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import SavingsCalculator from "@/components/SavingsCalculator";
import Industries from "@/components/Industries";
import Leadership from "@/components/Leadership";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { FAQ_ITEMS } from "@/data/faq";
import { PRODUCT_NAME, SITE_URL, CONTACT_EMAIL } from "@/lib/config";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AccountingService", "ProfessionalService", "FinancialService"],
        "@id": `${SITE_URL}/#organization`,
        name: PRODUCT_NAME,
        legalName: PRODUCT_NAME,
        url: SITE_URL,
        description:
          `${PRODUCT_NAME} runs the fractional CFO, technical GAAP advisory, accounting, tax, and audit work of a full finance department for founder-led and PE-backed companies under US GAAP, IFRS, or Ind AS.`,
        telephone: "+44-7405-499-593",
        email: CONTACT_EMAIL,
        priceRange: "$$$$",
        currenciesAccepted: "USD, GBP, INR, EUR",
        paymentAccepted: "Wire Transfer, ACH, Credit Card",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "Delhi NCR",
          addressCountry: "IN",
          description:
            "Global delivery headquarters with remote engagements worldwide",
        },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "India" },
          { "@type": "AdministrativeArea", name: "Europe" },
        ],
        founder: [
          {
            "@type": "Person",
            name: "CA Kshitij",
            jobTitle: "Managing Partner, GAAP Advisory",
            honorificPrefix: "CA",
            alumniOf: "The Institute of Chartered Accountants of India (ICAI)",
            knowsAbout: [
              "US GAAP",
              "IFRS",
              "UK GAAP",
              "ASC 606",
              "ASC 842",
              "Financial Due Diligence",
            ],
            description:
              "Trained as the auditor, now working as your ally. Ten years in Big Four audit across the UK and India, leading FTSE 100 and FTSE 250 engagements, with deep insight into exactly what auditors, investors and boards look for. Big Four judgement, without the Big Four distance, for growing businesses across the UK, US and India.",
          },
          {
            "@type": "Person",
            name: "CA Mayank A",
            jobTitle: "Partner, Audit & Assurance",
            honorificPrefix: "CA",
            alumniOf: "The Institute of Chartered Accountants of India (ICAI)",
            knowsAbout: [
              "Audit Readiness",
              "GAAS",
              "SOC 1 / SOC 2 Readiness",
              "Internal Controls",
              "PCAOB Audits",
            ],
            description:
              "Big Four rigour, with partner-level attention. Ten years in Big Four audit, leading statutory and PCAOB audits for listed and private groups across the UK, US and Europe. Fractional CFO support that turns sharp controls and clear reporting into confident growth. Audit-grade discipline, CFO-level vision.",
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+44-7405-499-593",
          email: CONTACT_EMAIL,
          contactType: "customer service",
          availableLanguage: ["English", "Hindi"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Finance, Accounting, and Advisory Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Fractional CFO",
                description:
                  "High-conviction financial leadership, 13-week cash runway modeling, board packs, and fundraise due diligence.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "GAAP Advisory",
                description:
                  "Technical accounting memos for US GAAP, IFRS, and Ind AS (ASC 606 revenue recognition, ASC 842 leases, stock comp).",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Strategic Remote Accounting & Advisory",
                description:
                  "Full-cycle bookkeeping, monthly close by day 10, AP/AR, and multi-entity consolidation.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Audit Liaison & Readiness",
                description:
                  "PBC schedule preparation, technical accounting workpapers, SOC readiness, and direct liaison with external audit teams.",
              },
            },
          ],
        },
        knowsAbout: [
          "US GAAP",
          "IFRS",
          "Ind AS",
          "UK GAAP",
          "ASC 606 Revenue Recognition",
          "ASC 842 Lease Accounting",
          "Fractional CFO",
          "Audit Readiness",
          "SOC 1 / SOC 2 Readiness",
          "Financial Consolidation",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main className="w-full max-w-full">
        <Hero />
        <CredentialsTicker />
        <Process />
        <Services />
        <WhyUs />
        <SavingsCalculator />
        <Industries />
        <Leadership />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
