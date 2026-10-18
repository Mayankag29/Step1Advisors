export interface TableData {
  headers: string[];
  rows: string[][];
  footnote?: string;
}

export interface BulletPoint {
  label?: string;
  text: string;
}

export interface BlogCallout {
  prompt: string;
  actionText: string;
  actionHref?: string;
}

export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  table?: TableData;
  bulletPoints?: BulletPoint[];
  numberedList?: string[];
  afterParagraphs?: string[];
  callout?: BlogCallout;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  readTime: string;
  date: string;
  publishedAt: string;
  excerpt: string;
  sections: BlogSection[];
  disclaimer?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "companies-house-id-verification-checklist",
    title:
      "Companies House ID verification: the 17 November 2026 checklist for directors",
    metaDescription:
      "Only around half of UK directors had verified their identity by mid-2026. Here is what the 17 November deadline means, who must act, and a six-step checklist — including for overseas directors.",
    category: "UK Compliance",
    readTime: "4 min read",
    date: "October 2026",
    publishedAt: "2026-10-01",
    excerpt:
      "Only around half of UK directors had verified their identity by mid-2026. Here is what the 17 November deadline means, who must act, and a six-step checklist — including for overseas directors.",
    sections: [
      {
        paragraphs: [
          "If you are a director or person with significant control (PSC) of a UK company and you haven't verified your identity with Companies House, you have about six weeks left. The 12-month transition period under the Economic Crime and Corporate Transparency Act 2023 closes on 17 November 2026, and Companies House has signalled it will move to enforcement.",
          "The numbers suggest many businesses are behind. Companies House data published in July 2026 showed that by the end of June only 55% of directors, 50% of LLP members and 42% of PSCs had told Companies House they were verified (Law Debenture).",
        ],
      },
      {
        heading: "Who has to verify",
        paragraphs: [
          "Every existing director, LLP member and PSC on the register — roughly 6 to 7 million people. New directors and PSCs have had to verify at the point of appointment since 18 November 2025. Verification is personal: your accountant can help, but they cannot simply tick it off for you.",
        ],
      },
      {
        heading: "What happens if you miss it",
        paragraphs: [
          "Unverified individuals face restrictions on Companies House filings, financial penalties, difficulty making appointments or changes, and a public mark on the register. For a growing company, the practical risk is a blocked confirmation statement or a delayed director change in the middle of a fundraise or acquisition.",
        ],
      },
      {
        heading: "Two things that have not changed the deadline",
        bulletPoints: [
          {
            label: "Presenter verification —",
            text: "the separate requirement for anyone filing documents to be verified — has slipped to no earlier than November 2026 (Irwin Mitchell).",
          },
          {
            label: "Software-only accounts filing,",
            text: "which removes abridged and filleted accounts for small companies, is now expected around April 2028 (Learnsignal).",
          },
        ],
        paragraphs: [
          "Neither delay moves the 17 November date for existing directors and PSCs.",
        ],
      },
      {
        heading: "The six-step checklist",
        numberedList: [
          "List every person on every entity. Pull the register for each UK company and LLP in your group, including dormant and holding companies.",
          "Check names against passports. Mismatches between the register and ID documents are the most common cause of records still showing \"unverified\". Correct the register first.",
          "Choose a route. Verify free through GOV.UK One Login, or through an Authorised Corporate Service Provider (ACSP) such as an accountant or law firm.",
          "Collect personal codes. Each verified person receives a Companies House personal code. Store them centrally; you'll need them at filings.",
          "Align with your confirmation statement date. Existing directors provide their code when the company files its next confirmation statement — know which entity's date falls first.",
          "Confirm on the register. Check the public record shows each person as verified, not just that the email arrived.",
        ],
      },
      {
        heading: "Overseas directors: start now",
        paragraphs: [
          "UK subsidiaries of Indian and US groups often have directors who live abroad and rarely log in to UK systems. They can verify remotely, but name formats, document types and time zones add days. If your UK entity has a director in Gurugram, Bengaluru or New York, treat this as this week's task, not November's.",
        ],
      },
      {
        heading: "How Step 1 Advisors helps",
        paragraphs: [
          "Our Strategic Remote Accounting team already runs the statutory calendar for UK entities of cross-border groups. We map every director and PSC across your group, flag register mismatches, and line verification up with your confirmation statement dates — so a compliance deadline never becomes a deal delay. Book a 45-minute diagnostic call.",
        ],
      },
    ],
    disclaimer:
      "Deadlines and rules can change; check the latest on GOV.UK before acting.",
  },
  {
    id: 2,
    slug: "frs-102-2026-changes-leases-and-revenue",
    title:
      "FRS 102 2026 changes: what leases and revenue mean for your first year-end",
    metaDescription:
      "The biggest change to UK GAAP since 2015 now applies to your accounts. What the new FRS 102 lease and revenue rules do to EBITDA, gearing and covenants — and what to prepare before year-end.",
    category: "UK GAAP",
    readTime: "5 min read",
    date: "October 2026",
    publishedAt: "2026-10-02",
    excerpt:
      "The biggest change to UK GAAP since 2015 now applies to your accounts. What the new FRS 102 lease and revenue rules do to EBITDA, gearing and covenants — and what to prepare before year-end.",
    sections: [
      {
        paragraphs: [
          "If your company's financial year started on or after 1 January 2026, your next accounts are the first under the most significant rewrite of FRS 102 since the standard was introduced. Two changes matter most: almost all leases now sit on the balance sheet, and revenue follows a new five-step model (PKF Smith Cooper).",
          "This isn't just a big-company problem. Small companies reporting under Section 1A are caught by both changes; only micro-entities using FRS 105 are outside them (Learnsignal).",
        ],
      },
      {
        heading: "Change 1: Leases move onto the balance sheet",
        paragraphs: [
          "The old split between operating and finance leases is gone for lessees. Your office, warehouse, vehicle and equipment leases now create a right-of-use asset and a lease liability (ICAS). Short-term leases (12 months or less) and low-value assets can stay off.",
          "What that does to your numbers:",
        ],
        bulletPoints: [
          {
            text: "EBITDA rises, because rent is replaced by depreciation and interest.",
          },
          {
            text: "Debt and gearing rise, because the lease liability is now borrowing on the face of the balance sheet.",
          },
          {
            text: "Profit timing shifts, with higher total cost in the early years of each lease.",
          },
        ],
      },
      {
        paragraphs: [
          "On transition, a modified retrospective approach is mandatory: comparatives aren't restated, and a catch-up adjustment goes to retained earnings at the start of the year (Forvis Mazars). For a 31 December year-end, that date is 1 January 2026.",
        ],
      },
      {
        heading: "Change 2: Revenue follows five steps",
        paragraphs: [
          "Section 23 now mirrors IFRS 15 in simplified form: identify the contract, identify the performance obligations, set the price, allocate it, and recognise revenue as each obligation is satisfied. Businesses most likely to see timing change include:",
        ],
        bulletPoints: [
          {
            text: "SaaS and subscription companies bundling set-up, licences and support.",
          },
          {
            text: "Agencies and professional services firms with milestone or retainer billing.",
          },
          {
            text: "Construction and project businesses with variations and long contracts.",
          },
          {
            text: "E-commerce brands with returns, loyalty points or bundled delivery.",
          },
        ],
      },
      {
        heading: "Change 3: Longer small-company accounts",
        paragraphs: [
          "ICAEW expects most small companies' financial statements to become longer and more detailed, with expanded disclosures on related parties, leases, revenue and tax (ICAEW).",
        ],
      },
      {
        heading: "Watch your bank covenants",
        paragraphs: [
          "If your facility tests leverage or interest cover on reported figures, the lease change alone can move your ratios with no change in trading. Read your facility agreement for \"frozen GAAP\" wording now, and talk to your lender before the numbers do it for you.",
        ],
      },
      {
        heading: "Your pre-year-end checklist",
        numberedList: [
          "Build a lease register: term, payments, break clauses, discount rate.",
          "Review your top 20 customer contracts against the five steps.",
          "Model the effect on EBITDA, net debt and covenants.",
          "Update accounting policies and board reporting KPIs.",
          "Agree the approach with your auditor or accountant before fieldwork.",
        ],
      },
      {
        heading: "How Step 1 Advisors helps",
        paragraphs: [
          "Our GAAP Advisory practice writes lease and revenue memos the way an auditor reads them — several of our team used to be the auditor. We've applied IFRS 16 and IFRS 15 across UK, US and Indian groups, so FRS 102's new sections are familiar ground. Book a diagnostic call and leave with a written read of your exposure.",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "fractional-cfo-or-outsourced-finance-function",
    title:
      "Fractional CFO or outsourced finance function? What UK businesses actually pay in 2026",
    metaDescription:
      "UK fractional CFOs cost £3,000–£10,000+ a month; an outsourced finance function £1,200–£5,000. Here's what each buys, when you need which, and why the split often fails.",
    category: "CFO Advisory",
    readTime: "5 min read",
    date: "October 2026",
    publishedAt: "2026-10-03",
    excerpt:
      "UK fractional CFOs cost £3,000–£10,000+ a month; an outsourced finance function £1,200–£5,000. Here's what each buys, when you need which, and why the split often fails.",
    sections: [
      {
        paragraphs: [
          "Most UK businesses between £1m and £20m turnover don't need a £200k finance director. They need someone who can close the books on time, explain the numbers to the board, and model cash before the bank asks. The question is which model buys that.",
        ],
      },
      {
        heading: "The three options, side by side",
        table: {
          headers: ["Model", "Typical UK cost", "What you get", "Best for"],
          rows: [
            [
              "Full-time CFO",
              "Around £216k median base in PE-backed firms; £120k–£250k in London (The CFO)",
              "One senior leader, full time, plus the team you still have to hire",
              "Larger, complex or pre-IPO businesses",
            ],
            [
              "Fractional CFO",
              "£3,000–£10,000+ per month; day rates of roughly £700–£1,500",
              "One named senior person, a few days a month, strategy and board work",
              "Fundraising, scaling, investor reporting",
            ],
            [
              "Outsourced finance function",
              "£1,200–£5,000 per month",
              "A firm's team: bookkeeping, close, management accounts, CFO oversight",
              "Companies without a controller yet",
            ],
          ],
          footnote:
            "UK pricing bands as compiled by Eightx from FD Capital, ScaleWithCFO and others. Treat them as ranges, not quotes.",
        },
      },
      {
        heading: "The difference that matters",
        paragraphs: [
          "A fractional CFO is one named individual on a strategic retainer. An outsourced finance function is a firm's team doing the work, with a senior person overseeing it. The first gives you judgement; the second gives you capacity.",
          "The trap is buying one and expecting the other. A £6,000-a-month fractional CFO who ends up reconciling the bank feed is an expensive bookkeeper. A bookkeeping firm asked to build a fundraising model is out of its depth.",
        ],
      },
      {
        heading: "When you need which",
        paragraphs: ["You need a fractional CFO when:"],
        bulletPoints: [
          {
            text: "You're raising equity or debt and need a data room, model and diligence answers.",
          },
          {
            text: "Your board or investors want a monthly pack and nobody owns it.",
          },
          {
            text: "Margins are slipping and you can't say which product, client or channel is responsible.",
          },
        ],
      },
      {
        paragraphs: ["You need an outsourced finance function when:"],
        bulletPoints: [
          {
            text: "Month-end close takes more than 15 working days, or doesn't happen.",
          },
          {
            text: "VAT returns, payroll and Companies House filings depend on one person. You've added entities or currencies and consolidation is a spreadsheet.",
          },
        ],
      },
      {
        paragraphs: [
          "Most growing companies need both, which is where the usual set-up breaks down.",
        ],
      },
      {
        heading: "Why the split often fails",
        paragraphs: [
          "The common UK pattern is a bookkeeper, a part-time FD and a year-end accountant from three different firms. The FD builds the board pack on numbers they didn't close; the accountant finds adjustments in March that change last year's story. Nobody owns the whole picture.",
        ],
      },
      {
        heading: "Questions to ask before you sign",
        numberedList: [
          "Who exactly will attend my board meetings, and will that change?",
          "Who closes the books, and does the CFO review the close before the pack goes out?",
          "Is the fee fixed for a written scope, or hourly?",
          "Do you know UK GAAP, VAT and Making Tax Digital — and our second jurisdiction, if we have one?",
          "What's the notice period if we hire in-house later?",
        ],
      },
      {
        heading: "How Step 1 Advisors helps",
        paragraphs: [
          "Step 1 runs both layers from one team: our Fractional CFO practice sits in your leadership meetings, and our Remote Accounting team closes the books it reports on. You get one fixed monthly fee, scoped in writing, and the same people at every review. For UK companies with US or Indian entities, that team already works across all three. Book a diagnostic call.",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "new-uk-audit-thresholds-2025",
    title:
      "The new UK audit thresholds: does your company still need an audit?",
    metaDescription:
      "From April 2025, UK companies with up to £15m turnover can qualify as small and audit-exempt. Who benefits, who doesn't, and why some businesses should keep an audit anyway.",
    category: "UK Audit",
    readTime: "5 min read",
    date: "October 2026",
    publishedAt: "2026-10-04",
    excerpt:
      "From April 2025, UK companies with up to £15m turnover can qualify as small and audit-exempt. Who benefits, who doesn't, and why some businesses should keep an audit anyway.",
    sections: [
      {
        paragraphs: [
          "Thousands of UK companies that needed a statutory audit last year may not need one now. For financial years starting on or after 6 April 2025, the government raised the size thresholds that decide which accounts you prepare — and whether you need an audit — by roughly 50%.",
        ],
      },
      {
        heading: "The new thresholds",
        paragraphs: [
          "A company is small if it meets at least two of these three tests (ICAEW):",
        ],
        table: {
          headers: ["Size", "Turnover", "Balance sheet total", "Employees"],
          rows: [
            ["Micro", "£1m (was £632k)", "£500k", "10"],
            ["Small", "£15m (was £10.2m)", "£7.5m", "50"],
            ["Medium", "£54m (was £36m)", "£27m", "250"],
          ],
        },
      },
      {
        paragraphs: [
          "The audit exemption stays tied to the small-company limits. Around 14,000 companies could move into the small regime and out of audit (Rödl & Partner).",
        ],
      },
      {
        heading: "The two-year rule has a one-off shortcut",
        paragraphs: [
          "Normally a company must meet the criteria for two consecutive years to change size. In the first year under the new limits, you can treat the previous year as if the new thresholds had already applied (ACCA). A company with £12m turnover last year and this year can be small immediately.",
        ],
      },
      {
        heading: "When you still need an audit",
        paragraphs: [
          "Meeting the numbers isn't always enough. You may still need an audit if:",
        ],
        bulletPoints: [
          {
            text: "You're in a group that isn't small. Group size can override a subsidiary's own figures. Check consolidated turnover and assets, net and gross.",
          },
          {
            text: "You're a public company or in a regulated sector, such as certain financial services businesses.",
          },
          {
            text: "Shareholders ask for one. Members holding at least 10% of shares can require an audit.",
          },
          {
            text: "Your lender requires one under your facility agreement.",
          },
        ],
      },
      {
        heading: "Should you drop your audit?",
        paragraphs: [
          "Not automatically. An audit is a cost, but it also does work for you. Consider keeping one, or switching to a lighter review, if:",
        ],
        bulletPoints: [
          {
            text: "You plan to raise money or sell within two to three years — buyers and investors discount unaudited history.",
          },
          {
            text: "You have overseas parents or investors who need audited figures for their own reporting.",
          },
          {
            text: "Your FRS 102 lease and revenue changes are material this year and you want them independently checked.",
          },
        ],
      },
      {
        paragraphs: [
          "If you do drop it, your controls matter more, not less. Nobody external is testing your numbers any more.",
        ],
      },
      {
        heading: "Your five-minute check",
        numberedList: [
          "Confirm your first financial year starting on or after 6 April 2025.",
          "Test turnover, balance sheet and headcount for this year and last.",
          "Check group status, ownership and any regulated activity.",
          "Read your loan and shareholder agreements for audit clauses.",
          "Decide: statutory audit, voluntary audit, review, or exemption — and minute it.",
        ],
      },
      {
        heading: "How Step 1 Advisors helps",
        paragraphs: [
          "Our Audit & Assurance team assesses whether your UK entity is exempt, prepares audit-ready schedules and PBC lists, and liaises with your registered auditor so fieldwork runs to schedule. If you're exempt, we help you decide what level of independent assurance your lenders and investors still expect. Book a diagnostic call.",
        ],
      },
    ],
    disclaimer:
      "This article is general guidance, not advice for your specific company.",
  },
  {
    id: 5,
    slug: "indian-ca-aca-acca-or-us-cpa",
    title:
      "Indian CA, ACA, ACCA or US CPA: Different Badges, Same Expertise",
    metaDescription:
      "Indian Chartered Accountants, UK ACA and ACCA members and US CPAs train to the same professional standards. Why your UK business can rely on an Indian CA, and what really matters when you choose an accountant.",
    category: "Accounting Qualifications",
    readTime: "5 min read",
    date: "October 2026",
    publishedAt: "2026-10-05",
    excerpt:
      "Indian Chartered Accountants, UK ACA and ACCA members and US CPAs train to the same professional standards. Why your UK business can rely on an Indian CA, and what really matters when you choose an accountant.",
    sections: [
      {
        paragraphs: [
          "If you're a UK business thinking about an offshore accounting team, one question usually comes up first: is an Indian Chartered Accountant as capable as a UK-qualified one?",
          "The answer is yes.",
        ],
      },
      {
        heading: "Same profession, different home markets",
        paragraphs: [
          "ICAI in India, ICAEW and ICAS in the UK, ACCA, and the US state boards that license CPAs all produce accountants with the same core training: financial reporting, audit, tax, law and ethics. Each one simply starts from its own country's rules.",
        ],
        table: {
          headers: ["Qualification", "Built around"],
          rows: [
            [
              "Indian CA (ICAI)",
              "Ind AS (converged with IFRS), Indian tax and company law",
            ],
            ["ACA (ICAEW / ICAS)", "IFRS and UK GAAP, UK tax"],
            ["ACCA", "IFRS and UK GAAP, UK tax"],
            ["US CPA", "US GAAP, US tax"],
          ],
        },
      },
      {
        paragraphs: [
          "All four combine demanding exams with years of supervised practical experience. None is an easier route than the others.",
        ],
      },
      {
        heading: "The profession already treats them as equals",
        bulletPoints: [
          {
            text: "ICAI and ICAEW have a mutual recognition agreement that gives Indian CAs a route to ICAEW membership.",
          },
          {
            text: "ACCA exempts qualified Indian CAs from 9 of its 13 exams.",
          },
          {
            text: "India's Ind AS is converged with IFRS, so Indian CAs already work with the same reporting concepts as UK GAAP and IFRS.",
          },
        ],
      },
      {
        heading: "Standards are learned, not inherited",
        paragraphs: [
          "FRS 102, IFRS and US GAAP are published standards. A qualified accountant who works with them every day applies them as well as anyone, wherever they sat their exams. Many Indian CAs prepare UK accounts, VAT returns and payroll in Xero, QuickBooks and Sage every day.",
          "What sets a good accountant apart is current experience, not the badge. Ask any accountant how recently they prepared UK accounts, filed with HMRC and dealt with Companies House.",
        ],
      },
      {
        heading: "Why an offshore Indian team works for UK businesses",
        bulletPoints: [
          {
            label: "Time zone:",
            text: "India is 4.5 to 5.5 hours ahead, so your reconciliations and reports can be ready before your day starts.",
          },
          {
            label: "Cost:",
            text: "you get qualified, audit-trained professionals for less than the cost of junior staff in the UK.",
          },
          {
            label: "Range:",
            text: "one team can cover UK GAAP, IFRS and US GAAP.",
          },
        ],
      },
      {
        heading: "One thing to check, whoever you hire",
        paragraphs: [
          "Two rules apply to every accountant, whatever their qualification. Only a UK registered auditor can sign a UK statutory audit report, in the same way that US attest work is reserved for licensed CPAs. Since 1 April 2026, anyone dealing with HMRC on a client's behalf must also register with HMRC and be supervised for anti-money laundering. Choose a firm that meets both requirements.",
        ],
      },
      {
        heading: "How Step 1 Advisors helps",
        paragraphs: [
          "Our qualified team brings hands-on expertise to UK bookkeeping, VAT, payroll, year-end accounts and group reporting. You get experienced professionals, working in your framework, at a cost that suits a growing business.",
          "To be clear about what we do and don't do: Step 1 Advisors is not a UK registered audit firm, so we don't sign UK statutory audit reports. What we do is get you audit-ready:",
        ],
        bulletPoints: [
          {
            text: "Clean, reconciled books and a complete trial balance",
          },
          {
            text: "Year-end accounts drafted under FRS 102 or FRS 105",
          },
          {
            text: "Supporting schedules, working papers and evidence for your auditor",
          },
          {
            text: "Answers to your auditor's queries during the audit",
          },
        ],
      },
      {
        paragraphs: [
          "That means a smoother, faster audit with your registered auditor, and often a lower audit fee.",
        ],
        callout: {
          prompt: "Not sure what your business needs?",
          actionText: "Book a free consultation with Step 1 Advisors.",
          actionHref: "/#contact",
        },
      },
    ],
  },
  {
    id: 6,
    slug: "ifrs-vs-us-gaap-differences",
    title:
      "IFRS vs US GAAP: The Differences That Matter for UK Businesses with Global Links",
    metaDescription:
      "IFRS vs US GAAP explained for UK businesses — the key accounting differences, why they change your reported profit, and what US-owned UK subsidiaries need to do.",
    category: "IFRS & US GAAP",
    readTime: "6 min read",
    date: "October 2026",
    publishedAt: "2026-10-06",
    excerpt:
      "IFRS vs US GAAP explained for UK businesses — the key accounting differences, why they change your reported profit, and what US-owned UK subsidiaries need to do.",
    sections: [
      {
        paragraphs: [
          "IFRS and US GAAP agree on most things, but the gaps that remain can move reported profit, equity and covenant ratios. If your UK company reports to a US parent, raises money from US investors or is acquired by a US buyer, those gaps become your problem.",
        ],
      },
      {
        heading: "Who uses which framework in the UK?",
        bulletPoints: [
          {
            text: "UK listed groups prepare consolidated accounts under UK-adopted IFRS.",
          },
          {
            text: "Subsidiaries of IFRS groups often use FRS 101, which applies IFRS measurement with reduced disclosures.",
          },
          {
            text: "Most private UK companies use FRS 102 or, if very small, FRS 105.",
          },
          {
            text: "UK subsidiaries of US groups usually file FRS 102 accounts at Companies House while sending US GAAP numbers to their parent every month or quarter.",
          },
        ],
        paragraphs: [
          "That last group runs two sets of rules at once. Each difference below is a reconciling item someone must track.",
        ],
      },
      {
        heading: "Principles vs rules",
        paragraphs: [
          "IFRS is principles-based: it sets objectives and expects judgement. US GAAP is more rules-based, with detailed, industry-specific guidance in the FASB Codification. In practice, IFRS asks \"what is the substance?\" while US GAAP more often asks \"which rule applies?\"",
        ],
      },
      {
        heading: "Key differences at a glance",
        table: {
          headers: ["Area", "IFRS", "US GAAP"],
          rows: [
            ["Inventory costing", "LIFO prohibited", "LIFO permitted"],
            [
              "Inventory write-down reversals",
              "Required when value recovers",
              "Prohibited",
            ],
            [
              "Development costs",
              "Capitalised once strict criteria are met (IAS 38)",
              "Generally expensed (software has specific rules)",
            ],
            [
              "Property, plant and equipment",
              "Cost or revaluation model",
              "Cost model only",
            ],
            [
              "Component depreciation",
              "Required for significant parts",
              "Permitted, rarely used",
            ],
            [
              "Asset impairment",
              "One-step test; reversals allowed (except goodwill)",
              "Two-step test for long-lived assets; reversals prohibited",
            ],
            [
              "Lessee accounting",
              "Single on-balance-sheet model (IFRS 16)",
              "Finance vs operating leases; operating leases show a straight-line expense (ASC 842)",
            ],
            [
              "Provisions",
              "Recognised if \"probable\" (more likely than not); midpoint of a range",
              "\"Probable\" is a higher threshold; low end of a range",
            ],
            [
              "Interest paid (cash flow)",
              "Policy choice today; financing under IFRS 18",
              "Operating activities",
            ],
            ["Revenue", "IFRS 15", "ASC 606 (largely converged)"],
          ],
        },
      },
      {
        heading: "Why these differences hit the numbers",
        bulletPoints: [
          {
            label: "Development spend.",
            text: "A UK tech company capitalising development costs under IFRS or FRS 102 can show higher profit than the same company under US GAAP, which generally expenses them. Your US parent may see a loss where your UK accounts show a profit.",
          },
          {
            label: "Leases.",
            text: "Under IFRS 16, all lessee leases produce depreciation plus interest, so EBITDA rises. Under US GAAP, operating leases produce a single straight-line cost within operating expenses. Covenants based on EBITDA can tell different stories.",
          },
          {
            label: "Impairments.",
            text: "IFRS lets you reverse an impairment when an asset's value recovers. US GAAP does not. A one-off write-down under US GAAP is permanent.",
          },
          {
            label: "Inventory.",
            text: "US businesses using LIFO must convert to FIFO or weighted average for IFRS, which can change both stock values and margins.",
          },
        ],
      },
      {
        heading: "What's changing: IFRS 18",
        paragraphs: [
          "IFRS 18 Presentation and Disclosure in Financial Statements replaces IAS 1 for periods beginning on or after 1 January 2027, and the UK Endorsement Board adopted it for UK use in December 2025. It introduces defined subtotals in the income statement (operating, investing and financing categories) and requires disclosure of management-defined performance measures. Comparatives must be restated, so 2026 figures need representing too. US GAAP has no equivalent, so presentation gaps between the two frameworks will widen for UK IFRS reporters.",
        ],
      },
      {
        heading: "Practical steps for US-linked UK businesses",
        numberedList: [
          "Map every account in your chart of accounts to both frameworks before year-end, not after.",
          "Keep a running GAAP reconciliation for known differences: development costs, leases, impairments and share-based payments.",
          "Agree group accounting policies in writing with your parent's finance team.",
          "Check that your FRS 102 accounts still meet Companies House requirements after group adjustments.",
          "Review covenant definitions to see which framework they reference.",
        ],
      },
      {
        heading: "How Step 1 Advisors helps",
        paragraphs: [
          "Our GAAP advisory team prepares FRS 102 statutory accounts alongside US GAAP or IFRS reporting packs, maintains GAAP reconciliations and supports group audits. You get one team that speaks both languages, so your UK accounts and your group reporting always tie up.",
        ],
        callout: {
          prompt: "Reporting to a US parent or investor?",
          actionText: "Talk to Step 1 Advisors about GAAP conversion and reporting.",
          actionHref: "/#contact",
        },
      },
    ],
  },
  {
    id: 7,
    slug: "frs-105-or-frs-102-section-1a",
    title:
      "FRS 105 or FRS 102 Section 1A? Choosing the Right Framework, with Pro Forma Accounts",
    metaDescription:
      "FRS 105 or FRS 102 Section 1A? How UK company size decides your accounting framework, the key differences, links to free model accounts, and the April 2028 Companies House filing rules.",
    category: "Financial Reporting",
    readTime: "6 min read",
    date: "October 2026",
    publishedAt: "2026-10-07",
    excerpt:
      "FRS 105 or FRS 102 Section 1A? How UK company size decides your accounting framework, the key differences, links to free model accounts, and the April 2028 Companies House filing rules.",
    sections: [
      {
        paragraphs: [
          "Most UK private companies prepare accounts under one of two standards: FRS 105 for the smallest companies, or FRS 102 (often its Section 1A small-entity regime) for everyone else. The choice affects how much you disclose, how your assets are valued and what lenders and investors can see.",
        ],
      },
      {
        heading: "Step 1: check your size",
        paragraphs: [
          "A company qualifies for a size category if it meets two of the three limits below, for two consecutive years. These thresholds apply to financial years beginning on or after 6 April 2025.",
        ],
        table: {
          headers: [
            "Category",
            "Turnover",
            "Balance sheet total",
            "Average employees",
            "Framework",
          ],
          rows: [
            ["Micro-entity", "≤ £1m", "≤ £500k", "≤ 10", "FRS 105 (or FRS 102 1A)"],
            ["Small", "≤ £15m", "≤ £7.5m", "≤ 50", "FRS 102 Section 1A"],
            [
              "Medium / large",
              "Above small limits",
              "Above small limits",
              "Above small limits",
              "Full FRS 102 (or IFRS / FRS 101)",
            ],
          ],
        },
      },
      {
        paragraphs: [
          "Some companies cannot use the micro or small regimes even if they meet the numbers, such as certain financial services firms and public companies. Check eligibility before choosing.",
        ],
      },
      {
        heading: "FRS 105 vs FRS 102 Section 1A: the key differences",
        table: {
          headers: ["Area", "FRS 105 (micro)", "FRS 102 Section 1A (small)"],
          rows: [
            [
              "Asset valuation",
              "Historical cost only; no revaluations or fair value",
              "Revaluation and fair value permitted",
            ],
            ["Deferred tax", "Not recognised", "Recognised"],
            [
              "Development costs, borrowing costs",
              "Expensed",
              "Can be capitalised",
            ],
            [
              "Notes",
              "Minimal: directors' advances and guarantees, commitments",
              "Fuller set of required disclosures",
            ],
            [
              "True and fair view",
              "Presumed by law",
              "Must be achieved; extra disclosure may be needed",
            ],
          ],
        },
      },
      {
        heading: "Pro forma accounts: EY and BDO model layouts and the statutory formats",
        paragraphs: [
          "Rather than reproduce full layouts here, use the reference sets below. Each link opens the publisher's own page.",
        ],
        table: {
          headers: ["Framework", "Reference", "Publisher", "Access"],
          rows: [
            [
              "Full FRS 102 (private group)",
              "Good Practice Group Limited — FRS 102 illustrative financial statements",
              "EY",
              "Free PDF download",
            ],
            [
              "Full FRS 102 (large private company)",
              "FRS 102 Layout Limited — illustrative financial statements 2025",
              "BDO",
              "Free PDF download",
            ],
            [
              "FRS 102 Section 1A (small company)",
              "Balance sheet and profit and loss formats — Schedule 1, Part 1, Section B",
              "Small Companies Regulations 2008",
              "Free",
            ],
            [
              "FRS 105 (microentity)",
              "Micro-entity formats — Schedule 1, Part 1, Section C",
              "Small Companies Regulations 2008",
              "Free",
            ],
          ],
        },
      },
      {
        paragraphs: [
          "A small company's balance sheet and profit and loss account follow the same statutory formats as larger companies. Section 1A mainly cuts the notes, so the EY and BDO models show the layout and your notes are a reduced set. Micro-entities use the much shorter Section C formats.",
          "Model accounts are illustrative. Your own accounts must follow the Companies Act formats and the disclosures your framework requires.",
        ],
      },
      {
        heading: "Filing changes coming in April 2028",
        paragraphs: [
          "Under the Economic Crime and Corporate Transparency Act, small companies and micro-entities will have to file a profit and loss account at Companies House, and abridged accounts will be abolished. All accounts will need to be filed through commercial software. The start date has moved from April 2027 to 1 April 2028, and companies will be able to opt out of having their P&L published on the public register.",
        ],
      },
      {
        heading: "Which framework should you choose?",
        bulletPoints: [
          {
            text: "Choose FRS 105 if you qualify, have no need for revaluations or deferred tax, and want the simplest accounts.",
          },
          {
            text: "Choose FRS 102 Section 1A if lenders or investors want fuller information, you hold investment property or revalued assets, or you expect to grow out of micro-entity limits soon.",
          },
          {
            text: "Review the choice every year, especially after the April 2025 threshold increases, which moved many companies into a smaller category.",
          },
        ],
      },
      {
        callout: {
          prompt: "Need help choosing a framework or preparing FRS 102 transition adjustments?",
          actionText: "Speak to Step 1 Advisors about year-end accounts.",
          actionHref: "/#contact",
        },
      },
    ],
  },
  {
    id: 8,
    slug: "10-common-pitfalls-non-finance-company-accounts",
    title:
      "10 Common Pitfalls When a Non-Finance Person Does the Company Accounts",
    metaDescription:
      "Doing your own bookkeeping? The 10 most common accounting mistakes UK directors make — from overdrawn director's loans to VAT errors and missed deadlines — and how to avoid them.",
    category: "Bookkeeping & Tax",
    readTime: "7 min read",
    date: "October 2026",
    publishedAt: "2026-10-08",
    excerpt:
      "Doing your own bookkeeping? The 10 most common accounting mistakes UK directors make — from overdrawn director's loans to VAT errors and missed deadlines — and how to avoid them.",
    sections: [
      {
        paragraphs: [
          "Many UK small businesses start with the founder, a family member or an office manager keeping the books. Cloud software makes it look easy. But the costliest errors we see are not data entry slips. They are gaps in knowledge about tax, law and accounting principles that software cannot fill.",
          "Here are the ten pitfalls we fix most often.",
        ],
      },
      {
        heading: "1. Mixing personal and business money",
        paragraphs: [
          "Paying personal bills from the company account, or business costs from a personal card, blurs the records. For a limited company, it also creates a director's loan account. If that loan is still overdrawn nine months and one day after the year-end, the company pays a temporary tax charge of 33.75% of the balance under section 455. Large interest-free loans can also create a taxable benefit in kind.",
        ],
      },
      {
        heading: "2. Recording cash, not what was earned and owed",
        paragraphs: [
          "Company accounts are prepared on an accruals basis. Income belongs to the period the work was done, and costs to the period they were incurred. Bookkeeping straight from the bank statement misses unpaid invoices, accruals and prepayments, so monthly profit swings wildly and year-end figures are wrong.",
        ],
      },
      {
        heading: "3. Expensing assets (or capitalising expenses)",
        paragraphs: [
          "A new laptop or van is a fixed asset, not an expense in the accounts, even when the Annual Investment Allowance gives full tax relief. Mixing the two distorts profit, the balance sheet and your tax computation. The opposite mistake, capitalising repairs, inflates assets.",
        ],
      },
      {
        heading: "4. VAT errors",
        paragraphs: [
          "VAT is where small errors become expensive. Common problems include:",
        ],
        bulletPoints: [
          {
            text: "Missing the £90,000 registration threshold, which is a rolling 12-month test, not a tax year test.",
          },
          {
            text: "Reclaiming input VAT without a valid VAT invoice.",
          },
          {
            text: "Forgetting the reverse charge on services bought from overseas suppliers or under the construction industry rules.",
          },
          {
            text: "Staying on the Flat Rate Scheme when it no longer saves money.",
          },
        ],
        afterParagraphs: [
          "HMRC can charge penalties and interest on errors, even honest ones.",
        ],
      },
      {
        heading: "5. Skipping bank reconciliations",
        paragraphs: [
          "If the bank balance in your software does not match the actual statement, every report built on it is wrong. Duplicate transactions, missed payments and bank feed errors pile up quietly until year-end, when they are slow and costly to untangle.",
        ],
      },
      {
        heading: "6. Payroll and employment status mistakes",
        paragraphs: [
          "PAYE must be reported to HMRC through Real Time Information on or before each payday. Auto-enrolment pension duties apply once staff qualify. Treating someone as a self-employed contractor when they are really an employee, or ignoring IR35 for personal service contractors, can lead to backdated tax, National Insurance and penalties.",
        ],
      },
      {
        heading: "7. Paying dividends without the profits to cover them",
        paragraphs: [
          "Dividends can only be paid from distributable reserves. Paying them from cash alone, when the company has accumulated losses, makes them unlawful. Directors may have to repay them, and HMRC may treat them as salary or loans instead.",
        ],
      },
      {
        heading: "8. Missing statutory deadlines",
        table: {
          headers: ["Obligation", "Deadline (private company)"],
          rows: [
            [
              "Corporation tax payment (most companies)",
              "9 months and 1 day after year-end",
            ],
            ["Annual accounts to Companies House", "9 months after year-end"],
            ["Corporation tax return (CT600)", "12 months after year-end"],
            ["Confirmation statement", "At least once every 12 months"],
            [
              "VAT return and payment",
              "1 month and 7 days after the period end",
            ],
          ],
          footnote:
            "Late accounts trigger automatic Companies House penalties from £150 to £1,500, doubled if accounts are late two years running.",
        },
      },
      {
        heading: "9. Not preparing for Making Tax Digital",
        paragraphs: [
          "Since 6 April 2026, sole traders and landlords with qualifying income over £50,000 must keep digital records and send quarterly updates to HMRC. The threshold falls to £30,000 from April 2027 and £20,000 from April 2028. Spreadsheets kept \"for the accountant at year-end\" no longer meet the rules.",
        ],
      },
      {
        heading: "10. Bookkeeping that never becomes management information",
        paragraphs: [
          "The biggest hidden cost is lost insight. Without monthly management accounts, cash-flow forecasts and margin analysis, owners make pricing, hiring and borrowing decisions blind.",
          "Correct records are the minimum; useful information is the goal.",
        ],
      },
      {
        heading: "Why these mistakes keep happening",
        paragraphs: [
          "None of these errors comes from carelessness. They come from asking someone to apply tax law, company law and accounting standards without the training to do so. Software automates entries, but it cannot judge whether a payment is a dividend, a loan or a salary.",
        ],
      },
      {
        heading: "How Step 1 Advisors can help",
        paragraphs: [
          "You do not need a full in-house finance team to get this right. Our remote accounting service keeps your books, VAT and payroll accurate every month, and our fractional CFO service turns those numbers into decisions. If you are cleaning up after a year of DIY bookkeeping, we can review, correct and bring you up to date.",
        ],
        callout: {
          prompt: "Worried about your books?",
          actionText: "Book a free bookkeeping health check with Step 1 Advisors.",
          actionHref: "/#contact",
        },
      },
    ],
  },
  {
    id: 9,
    slug: "why-ai-tools-cannot-replace-your-accountant",
    title:
      "Why AI Tools Cannot Replace Your Accountant (But Make a Good One Better)",
    metaDescription:
      "AI can categorise transactions and draft reports, but it cannot take responsibility, exercise judgement or sign your accounts. Here's what AI does well in accounting — and where UK businesses still need a human.",
    category: "AI in Accounting",
    readTime: "6 min read",
    date: "October 2026",
    publishedAt: "2026-10-09",
    excerpt:
      "AI can categorise transactions and draft reports, but it cannot take responsibility, exercise judgement or sign your accounts. Here's what AI does well in accounting — and where UK businesses still need a human.",
    sections: [
      {
        paragraphs: [
          "AI is changing accounting fast. Bank feeds categorise themselves, receipts are read automatically and chatbots answer tax questions in seconds. It is fair to ask whether you still need an accountant.",
          "The honest answer: AI replaces tasks, not accountability. The work that protects your business — judgement, responsibility and advice — still needs a qualified human.",
        ],
      },
      {
        heading: "What AI genuinely does well",
        paragraphs: ["We use AI tools ourselves, and they are excellent at:"],
        bulletPoints: [
          {
            text: "Matching bank transactions and suggesting categories.",
          },
          {
            text: "Reading invoices and receipts into accounting software.",
          },
          {
            text: "Flagging duplicates, unusual payments and missing documents.",
          },
          {
            text: "Drafting first versions of reports, commentary and emails. Summarising long documents such as leases or contracts.",
          },
        ],
        afterParagraphs: [
          "These are high-volume, rules-based tasks. Automating them saves time and reduces typing errors.",
        ],
      },
      {
        heading: "Where AI falls short",
        numberedList: [
          "Accounting standards require judgement. From 1 January 2026, FRS 102 asks companies to decide whether a contract contains a lease and how revenue splits across performance obligations. Those answers depend on the commercial substance of each contract. An AI tool can describe the rules; it cannot reliably weigh the facts of your arrangement and defend the conclusion to an auditor.",
          "AI can be confidently wrong. Generative AI tools sometimes produce plausible but incorrect answers, out-of-date thresholds or rules from the wrong country. A US-trained answer about \"depreciation\" or \"S corporations\" is worse than useless for a UK limited company. Spotting the error requires knowing the right answer.",
          "Responsibility cannot be delegated to software. HMRC expects taxpayers to take reasonable care. \"The AI told me\" is not a defence against penalties. A qualified accountant is regulated by a professional body, carries professional indemnity insurance and is supervised for anti-money laundering purposes. When they advise you, someone is accountable.",
          "Some work is legally reserved. Only registered auditors can sign a UK statutory audit report. Representing you in an HMRC enquiry, negotiating a payment plan or acting as your agent requires a person with authority to act.",
          "Context lives outside the ledger. AI sees transactions. It does not know you plan to bring in an investor next year, that your biggest customer is wobbling, or that a family member wants to exit the business. Good tax planning and financial advice start from those conversations.",
          "Data protection and confidentiality. Uploading client lists, payroll or bank data to a public AI tool may breach UK GDPR or your own confidentiality obligations. Accountants work within controlled systems and professional confidentiality rules.",
          "Professional scepticism. Auditors and good accountants ask \"does this make sense?\" Unusual margins, round-sum payments or transactions with related parties need a human who knows when to question, not just process.",
        ],
      },
      {
        heading: "The real future: accountants who use AI",
        paragraphs: [
          "The question is not AI or accountants. It is whether your accountant uses AI to give you more. With routine processing automated, a good firm spends its time on what you actually value:",
        ],
        table: {
          headers: ["Task", "AI's role", "Accountant's role"],
          rows: [
            [
              "Bookkeeping",
              "Categorises and matches transactions",
              "Reviews exceptions, posts adjustments, signs off",
            ],
            [
              "VAT returns",
              "Prepares draft figures",
              "Checks treatment, reverse charges and partial exemption",
            ],
            [
              "Year-end accounts",
              "Drafts schedules and notes",
              "Applies FRS 102 / FRS 105 judgement, takes responsibility",
            ],
            [
              "Management reporting",
              "Builds charts and variance tables",
              "Explains what changed and what to do about it",
            ],
            [
              "Tax planning",
              "Summarises rules",
              "Designs a plan around your goals and defends it",
            ],
          ],
        },
      },
      {
        heading: "How Step 1 Advisors works",
        paragraphs: [
          "At Step 1 Advisors, we combine automation with qualified review. AI tools speed up the processing; our accountants check every output, apply UK GAAP and tax rules, and stand behind the result. You get faster turnaround and lower cost, without giving up the judgement and accountability that keep your business safe.",
        ],
        callout: {
          prompt: "Want the speed of AI with the assurance of a qualified team?",
          actionText:
            "Talk to Step 1 Advisors about remote accounting and fractional CFO support.",
          actionHref: "/#contact",
        },
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}
