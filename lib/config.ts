export const PRODUCT_NAME =
  process.env.NEXT_PUBLIC_PRODUCT_NAME || "Step 1 Advisors";

const words = PRODUCT_NAME.trim().split(/\s+/);

export const PRODUCT_FIRST_PART =
  words.length > 1 ? words.slice(0, -1).join(" ") : PRODUCT_NAME;

export const PRODUCT_LAST_PART =
  words.length > 1 ? words[words.length - 1] : "";

export const PRODUCT_SHORT_NAME =
  process.env.NEXT_PUBLIC_PRODUCT_SHORT_NAME || PRODUCT_FIRST_PART;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://step1advisors.com";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "welcome@step1advisors.com";
