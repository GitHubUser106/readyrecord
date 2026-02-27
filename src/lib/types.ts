// ============================================================
// ReadyRecord — TypeScript Types
// All form data structures for localStorage persistence
// ============================================================

// --- Section 1: Personal Information ---
export interface PersonalInformation {
  fullLegalName: string;
  address: string;
  dateOfBirth: string;
  placeOfBirth: string;
  sin: string;
  driversLicense: string;
  mothersMaidenName: string;
  spouseName: string;
  spouseSin: string;
  dateOfMarriage: string;
  spouseDateOfBirth: string;
}

// --- Section 2: Debts ---
export interface CreditCard {
  id: string;
  issuer: string;
  phoneNumber: string;
  cardNumber: string;
  interestRate: string;
  cvv: string;
  minimumPayment: string;
  balanceOwing: string;
}

export interface LineOfCredit {
  id: string;
  lender: string;
  accountNumber: string;
  balance: string;
}

export interface Debts {
  creditCards: CreditCard[];
  linesOfCredit: LineOfCredit[];
}

// --- Section 3: Bank Accounts & Investments ---
export interface BankAccount {
  id: string;
  institutionName: string;
  accountType: string;
  phoneNumber: string;
  accountNumber: string;
  interestRate: string;
  avgMonthlyActivity: string;
  availableFunds: string;
  totalBalance: string;
}

export interface BankAccounts {
  accounts: BankAccount[];
}

// --- Section 4: Real Estate ---
export interface RealEstateProperty {
  id: string;
  propertyName: string;
  address: string;
  purchaseDate: string;
  realEstateAgent: string;
  mortgageLender: string;
  propertyRollNumber: string;
  mortgageBalance: string;
  approximateValue: string;
}

export interface RealEstate {
  properties: RealEstateProperty[];
}

// --- Section 5: Insurance Plans ---
export interface InsurancePolicy {
  id: string;
  provider: string;
  policyNumber: string;
  contactInfo: string;
  coverageDetails: string;
  premium: string;
  beneficiary?: string;
}

export interface Insurance {
  automobile: InsurancePolicy[];
  homeowners: InsurancePolicy[];
  life: InsurancePolicy[];
  termLife: InsurancePolicy[];
  wholeLife: InsurancePolicy[];
  criticalIllness: InsurancePolicy[];
  disability: InsurancePolicy[];
  extendedHealth: InsurancePolicy[];
  travel: InsurancePolicy[];
  longTermCare: InsurancePolicy[];
  mortgage: InsurancePolicy[];
  pet: InsurancePolicy[];
  other: InsurancePolicy[];
}

// --- Section 6: Income Sources ---
export interface IncomeSource {
  id: string;
  companyOrSource: string;
  type: string;
  originalPaymentAmount: string;
  notes: string;
  paymentDayOfMonth: string;
  policyReferenceNumber: string;
  monthlyPaymentAmount: string;
  splitWithSpouse: string;
}

export interface Income {
  sources: IncomeSource[];
}

// --- Section 7: Monthly Expenses & Bills ---
export interface MonthlyExpense {
  id: string;
  companyName: string;
  paymentType: string;
  contactInfo: string;
  description: string;
  paymentDayOfMonth: string;
  accountNumber: string;
  notes: string;
  monthlyAmount: string;
}

export interface Expenses {
  expenses: MonthlyExpense[];
}

// --- Section 8: Important Contacts & Notes ---
export interface ImportantContacts {
  lawyerName: string;
  lawyerContact: string;
  accountantName: string;
  accountantContact: string;
  financialAdvisorName: string;
  financialAdvisorContact: string;
  serviceCanadaNumber: string;
  veteransAffairsNumber: string;
  unionLocal: string;
  pensionAdministrator: string;
  funeralHome: string;
  funeralPrePaid: string;
  funeralDetails: string;
  executorOfWill: string;
  locationOfWill: string;
  safetyDepositBoxLocation: string;
  safetyDepositBoxKeyLocation: string;
  otherNotes: string;
}

// --- Master form data ---
export interface ReadyRecordData {
  personalInfo: PersonalInformation;
  debts: Debts;
  bankAccounts: BankAccounts;
  realEstate: RealEstate;
  insurance: Insurance;
  income: Income;
  expenses: Expenses;
  importantContacts: ImportantContacts;
  lastUpdated: string;
}

// --- Section metadata ---
export interface SectionMeta {
  id: SectionId;
  title: string;
  description: string;
  icon: string;
}

export type SectionId =
  | "personal-info"
  | "debts"
  | "bank-accounts"
  | "real-estate"
  | "insurance"
  | "income"
  | "expenses"
  | "important-contacts"
  | "summary";

export const SECTIONS: SectionMeta[] = [
  {
    id: "personal-info",
    title: "Personal Information",
    description:
      "Let's start with the basics — just pull out your wallet and any ID you have handy.",
    icon: "User",
  },
  {
    id: "debts",
    title: "Debts",
    description:
      "Credit cards, lines of credit — anything your family should know about. No judgement here.",
    icon: "CreditCard",
  },
  {
    id: "bank-accounts",
    title: "Bank Accounts & Investments",
    description:
      "Your bank accounts, RRSPs, TFSAs, and any investments. Check your latest statements if you have them.",
    icon: "Landmark",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    description:
      "Any properties you own — your home, cottage, rental properties. Gather your mortgage papers if you can.",
    icon: "Home",
  },
  {
    id: "insurance",
    title: "Insurance Plans",
    description:
      "Car insurance, home insurance, life insurance, health plans — all in one place.",
    icon: "Shield",
  },
  {
    id: "income",
    title: "Income Sources",
    description:
      "Pensions, CPP, OAS, rental income — everything that comes in each month.",
    icon: "DollarSign",
  },
  {
    id: "expenses",
    title: "Monthly Expenses & Bills",
    description:
      "Your regular monthly bills. We've pre-filled some common ones to get you started.",
    icon: "Receipt",
  },
  {
    id: "important-contacts",
    title: "Important Contacts & Notes",
    description:
      "Your lawyer, accountant, and any other important details your family should have.",
    icon: "BookOpen",
  },
  {
    id: "summary",
    title: "Summary",
    description:
      "A complete overview of everything you've entered. You're almost done!",
    icon: "BarChart3",
  },
];
