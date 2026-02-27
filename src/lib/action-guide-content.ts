import type { ReadyRecordData } from "./types";

// --- Timeline Sections ---

export interface ActionItem {
  title: string;
  description: string;
}

export interface TimelineSection {
  title: string;
  timeframe: string;
  items: ActionItem[];
}

export const TIMELINE_SECTIONS: TimelineSection[] = [
  {
    title: "Immediate — First 48 Hours",
    timeframe: "Day 1 – 2",
    items: [
      {
        title: "Notify immediate family and close friends",
        description:
          "Call or visit in person. Refer to the Close Friends to Notify list in this document.",
      },
      {
        title: "Contact the funeral home",
        description:
          "If pre-arrangements were made, contact the funeral home listed in the Important Contacts section. If not, ask family or friends for recommendations.",
      },
      {
        title: "Obtain death certificates",
        description:
          "Request at least 10–15 certified copies of the death certificate. You will need more than you think — banks, insurance companies, government agencies, and lawyers will each require an original.",
      },
      {
        title: "Secure the home and vehicles",
        description:
          "Lock the home, collect mail, ensure vehicles are secured. If the person lived alone, consider having someone stay or check regularly.",
      },
      {
        title: "Locate the will and contact the executor / lawyer",
        description:
          "Check the Will & Estate section of this document for the will location and executor details. Contact the lawyer listed.",
      },
    ],
  },
  {
    title: "First Two Weeks",
    timeframe: "Days 3 – 14",
    items: [
      {
        title: "Notify Service Canada (CPP/OAS)",
        description:
          "Call 1-800-277-9914. CPP and OAS payments will need to stop. Apply for the CPP Death Benefit (currently a one-time payment of $2,500). Apply for CPP Survivor's Pension if eligible.",
      },
      {
        title: "Notify Canada Revenue Agency (CRA)",
        description:
          "Call 1-800-959-8281. Inform them of the passing. A final tax return will need to be filed.",
      },
      {
        title: "Contact banks and financial institutions",
        description:
          "They will freeze accounts upon notification. You will need the death certificate and proof of executor/administrator status (Letters Probate or Letters of Administration). Refer to the Bank Accounts section of this document.",
      },
      {
        title: "Cancel or transfer utilities and subscriptions",
        description:
          "Refer to the Monthly Expenses and Digital Accounts sections. Contact each provider to cancel or transfer service.",
      },
      {
        title: "Notify insurance companies and file claims",
        description:
          "Contact each insurance provider listed in the Insurance section. File life insurance claims as soon as possible — they often pay within 30 days.",
      },
      {
        title: "Contact employer / pension administrator",
        description:
          "If applicable, notify the employer and pension administrator. Ask about final pay, survivor pension benefits, and employer life insurance.",
      },
      {
        title: "Apply for CPP Survivor's Pension",
        description:
          "If the deceased contributed to CPP and has a surviving spouse/common-law partner, you may be eligible for a monthly Survivor's Pension.",
      },
      {
        title: "Contact Veterans Affairs (if applicable)",
        description:
          "Call 1-866-522-2122. Ask about funeral and burial benefits, survivor benefits, and the Last Post Fund.",
      },
      {
        title: "Redirect mail through Canada Post",
        description:
          "Set up mail forwarding to the executor's address to catch any outstanding bills or correspondence.",
      },
    ],
  },
  {
    title: "First Three Months",
    timeframe: "Weeks 3 – 12",
    items: [
      {
        title: "Work with the lawyer to begin probate (if required)",
        description:
          "Probate is the legal process of validating the will. Not all estates require probate — your lawyer can advise. In BC, probate fees are approximately $14 per $1,000 of estate value over $50,000.",
      },
      {
        title: "File the final tax return",
        description:
          "Due by April 30 of the following year, or 6 months after the date of death — whichever is later. Consider hiring the accountant listed in this document.",
      },
      {
        title: "Transfer or close financial accounts",
        description:
          "Once probate is granted (if required), work with each institution to transfer or close accounts. Joint accounts may transfer automatically to the surviving holder.",
      },
      {
        title: "Transfer vehicle ownership",
        description:
          "Visit ICBC (in BC) or your provincial motor vehicle office with the death certificate and executor documents. Refer to the Physical Assets section for vehicle details.",
      },
      {
        title: "Update property titles",
        description:
          "Work with your lawyer to transfer property titles. In BC, this is done through the Land Title Office.",
      },
      {
        title: "Cancel subscriptions and memberships",
        description:
          "Refer to the Digital Accounts section. Cancel streaming services, gym memberships, magazine subscriptions, professional associations, clubs, and alumni organizations.",
      },
      {
        title: "Review and update your own estate plan",
        description:
          "This experience often highlights the importance of having your own affairs in order. Consider updating your own will, POA, and beneficiary designations.",
      },
    ],
  },
];

// --- Template Letters ---

export interface TemplateLetter {
  id: string;
  title: string;
  body: string;
}

export const TEMPLATE_LETTERS: TemplateLetter[] = [
  {
    id: "bank-notification",
    title: "Bank / Financial Institution Notification",
    body: `Dear Sir/Madam,

I am writing to notify you of the passing of [FULL_LEGAL_NAME], who held account(s) with your institution.

[FULL_LEGAL_NAME] passed away on [DATE_OF_DEATH]. I am the [EXECUTOR_ROLE] of the estate.

Please find enclosed a copy of the death certificate and Letters Probate / Letters of Administration. I request that the account(s) be frozen and that you advise on the process for closing or transferring them as appropriate.

Please advise on any further documentation required.

The account(s) in question:
[ACCOUNT_DETAILS]

Sincerely,
[YOUR_NAME]
[YOUR_CONTACT]`,
  },
  {
    id: "utility-cancellation",
    title: "Utility Company Cancellation / Transfer",
    body: `Dear Sir/Madam,

I am writing regarding the account of [FULL_LEGAL_NAME] at [ADDRESS], account number [ACCOUNT_NUMBER].

[FULL_LEGAL_NAME] passed away on [DATE_OF_DEATH]. Please cancel the service effective [EFFECTIVE_DATE] / transfer the account to [NEW_NAME].

The final bill should be sent to [MAILING_ADDRESS].

Please contact me at [YOUR_CONTACT] if you require additional documentation.

Sincerely,
[YOUR_NAME]`,
  },
  {
    id: "subscription-cancellation",
    title: "Subscription Cancellation",
    body: `Dear Sir/Madam,

I am notifying you that [FULL_LEGAL_NAME], a subscriber to your service, passed away on [DATE_OF_DEATH].

Please cancel the account and any recurring charges effective immediately. The account email was [ACCOUNT_EMAIL].

Please confirm cancellation to [YOUR_EMAIL].

Thank you,
[YOUR_NAME]`,
  },
  {
    id: "government-notification",
    title: "Government Notification (Service Canada)",
    body: `Note: Service Canada is usually notified by phone at 1-800-277-9914. Have the following information ready:

- Deceased's full legal name: [FULL_LEGAL_NAME]
- Social Insurance Number (last 3 digits): [SIN_LAST_3]
- Date of birth: [DATE_OF_BIRTH]
- Date of death: [DATE_OF_DEATH]
- Death certificate (certified copy)
- Executor documentation (Letters Probate or Letters of Administration)
- Your own identification as the caller

Ask about:
- Stopping CPP and OAS payments
- CPP Death Benefit ($2,500 one-time payment)
- CPP Survivor's Pension (if eligible)
- GIS (Guaranteed Income Supplement) adjustments`,
  },
  {
    id: "employer-pension",
    title: "Employer / Pension Notification",
    body: `Dear [HR_OR_PENSION_ADMIN],

I am writing to inform you that [FULL_LEGAL_NAME], [EMPLOYEE_OR_RETIREE] and member of [PENSION_PLAN_NAME], passed away on [DATE_OF_DEATH].

Please advise on:
- Any final payments owed
- Survivor pension benefits
- Life insurance claims through the employer
- Any required documentation

[FULL_LEGAL_NAME]'s employee number was [EMPLOYEE_NUMBER].

Sincerely,
[YOUR_NAME]
[YOUR_RELATIONSHIP] of the deceased
[YOUR_CONTACT]`,
  },
  {
    id: "generic-notification",
    title: "Generic Notification (Clubs, Memberships, Organizations)",
    body: `Dear Sir/Madam,

I regret to inform you that [FULL_LEGAL_NAME], a member of [ORGANIZATION_NAME], passed away on [DATE_OF_DEATH].

Please update your records accordingly and cancel any memberships or recurring fees.

If there are any outstanding matters, please contact me at [YOUR_CONTACT].

Thank you for your understanding.

[YOUR_NAME]`,
  },
];

// --- Important Phone Numbers ---

export interface PhoneReference {
  name: string;
  number: string;
  notes: string;
}

export const IMPORTANT_PHONE_NUMBERS: PhoneReference[] = [
  {
    name: "Service Canada (CPP/OAS/GIS)",
    number: "1-800-277-9914",
    notes: "Mon–Fri 8:30am–4:30pm local time",
  },
  {
    name: "Canada Revenue Agency (CRA)",
    number: "1-800-959-8281",
    notes: "Individual tax enquiries",
  },
  {
    name: "Veterans Affairs Canada",
    number: "1-866-522-2122",
    notes: "If applicable",
  },
  {
    name: "BC Vital Statistics",
    number: "1-250-952-2681",
    notes: "Death certificates in BC",
  },
  {
    name: "BC Probate Registry",
    number: "Varies by courthouse",
    notes: "Check bc.gov.ca for your local registry",
  },
  {
    name: "Canada Pension Plan — Online",
    number: "canada.ca/my-service-canada",
    notes: "Apply for benefits online",
  },
  {
    name: "Crime Stoppers (identity theft concerns)",
    number: "1-800-222-8477",
    notes: "If you suspect fraud using the deceased's identity",
  },
];

// --- Variable Substitution ---

const VARIABLE_MAP: Record<string, (data: ReadyRecordData) => string> = {
  "[FULL_LEGAL_NAME]": (d) => d.personalInfo.fullLegalName || "[Full Legal Name]",
  "[ADDRESS]": (d) => d.personalInfo.address || "[Address]",
  "[DATE_OF_BIRTH]": (d) => d.personalInfo.dateOfBirth || "[Date of Birth]",
  "[SIN_LAST_3]": (d) => {
    const digits = d.personalInfo.sin.replace(/\D/g, "");
    return digits.length >= 3 ? `***-***-${digits.slice(-3)}` : "[Last 3 of SIN]";
  },
  "[EXECUTOR_ROLE]": (d) =>
    d.importantContacts.executorOfWill
      ? `executor (${d.importantContacts.executorOfWill})`
      : "[executor/administrator]",
  "[SPOUSE_NAME]": (d) => d.personalInfo.spouseName || "[Spouse Name]",
};

export function fillTemplate(template: string, data: ReadyRecordData): string {
  let result = template;
  for (const [key, getter] of Object.entries(VARIABLE_MAP)) {
    result = result.replaceAll(key, getter(data));
  }
  return result;
}
