export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Diagnostic Call",
    description:
      "A 45-minute working session on your books, your stack, and where the finance function is actually straining. You leave with a written read of what's broken, not a sales pitch.",
  },
  {
    number: "02",
    title: "Scoped Engagement Design",
    description:
      "We propose a specific scope, deliverable calendar, and monthly fee — tied to your entity structure and reporting obligations, not a generic package tier.",
  },
  {
    number: "03",
    title: "Embedded Delivery",
    description:
      "Your team joins your Slack, your board deck, your close calendar. Reporting lands on the same date every month, and the same people show up to every review.",
  },
];
