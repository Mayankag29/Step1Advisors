export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Which jurisdictions do you work in?",
    answer:
      "We serve companies incorporated in the UK and the US, and groups with subsidiaries overseas. Our technical accounting covers FRS 102, FRS 105, FRS 101, UK-adopted IFRS and US GAAP. If your structure sits outside those frameworks, tell us on the diagnostic call and we’ll say plainly whether we’re the right fit.",
  },
  {
    question: "Can you handle both our audit and our monthly accounting?",
    answer:
      "Not at the same time, and not for the same fiscal year. Independence standards require that we not audit books we also maintain. Most clients pick one or the other with us; some rotate audit providers so we can run their advisory work continuously.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "A fixed monthly retainer, scoped to your entity count, transaction volume, and reporting cadence in the engagement letter. Audit and one-off projects are quoted separately and fixed before work starts.",
  },
  {
    question: "What accounting systems do you work inside?",
    answer:
      "We work with the systems you already use. Most often that's Xero, QuickBooks Online, Sage, Tally and Zoho Books. No migration, no new software to learn.",
  },
  {
    question: "How quickly can an engagement start?",
    answer: "We're ready when you are.",
  },
  {
    question: "Do you work with companies that don't have a controller yet?",
    answer:
      "That's most of our client base. We typically step in as the first dedicated finance function a company has had, and either hand off to an internal hire later or stay embedded indefinitely — whichever the business needs.",
  },
];
