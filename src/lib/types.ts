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

// --- Debts ---
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

// --- Bank Accounts & Investments ---
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

// --- Real Estate ---
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

// --- Physical Assets & Valuables ---
export interface PhysicalAsset {
  id: string;
  description: string;
  category: string;
  location: string;
  approximateValue: string;
  intendedRecipient: string;
  notes: string;
  photoReference: string;
  // Vehicle-specific fields (when category = "vehicle")
  vehicleYearMakeModel: string;
  vehicleVin: string;
  vehicleLicensePlate: string;
  vehicleRegistrationLocation: string;
  vehicleLienHolder: string;
  vehicleKeysLocation: string;
  vehicleRegistrationPinkSlipLocation: string;
  // Firearms-specific (when category = "firearms")
  firearmsPalRpalNumber: string;
}

export interface PhysicalAssets {
  assets: PhysicalAsset[];
}

// --- Business Interests ---
export interface BusinessInterest {
  id: string;
  businessName: string;
  businessType: string;
  yourRole: string;
  ownershipPercentage: string;
  bnGstNumber: string;
  corporationNumber: string;
  partners: string;
  accountant: string;
  lawyer: string;
  bankAccount: string;
  corporateRecordsLocation: string;
  buySellAgreement: string;
  shareholderAgreement: string;
  keyEmployees: string;
  notes: string;
}

export interface BusinessInterests {
  businesses: BusinessInterest[];
}

// --- Insurance Plans ---
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

// --- Income Sources ---
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

// --- Monthly Expenses & Bills ---
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

// --- Digital Accounts & Subscriptions ---
export interface DigitalAccount {
  id: string;
  serviceName: string;
  category: string;
  usernameEmail: string;
  passwordHint: string;
  autoPayment: string;
  monthlyCost: string;
  actionNeeded: string;
  notes: string;
}

export interface DigitalAccounts {
  accounts: DigitalAccount[];
}

// --- Important Contacts & Notes ---
export interface CloseFriend {
  id: string;
  name: string;
  phone: string;
  email: string;
}

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
  // New fields
  clergyName: string;
  clergyContact: string;
  closeFriends: CloseFriend[];
  employerContact: string;
  pensionPlanAdministrator: string;
  unionRepresentative: string;
  veteransAffairsContact: string;
  craMyAccountSetUp: string;
  poaName: string;
  poaDocumentLocation: string;
  representationAgreement: string;
  advancedDirectiveLocation: string;
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
  physicalAssets: PhysicalAssets;
  businessInterests: BusinessInterests;
  digitalAccounts: DigitalAccounts;
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
  | "important-contacts"
  | "bank-accounts"
  | "income"
  | "debts"
  | "real-estate"
  | "physical-assets"
  | "business-interests"
  | "insurance"
  | "expenses"
  | "digital-accounts"
  | "summary"
  | "action-guide";

export const SECTIONS: SectionMeta[] = [
  {
    id: "personal-info",
    title: "Personal Information",
    description:
      "Let's start with the basics — just pull out your wallet and any ID you have handy.",
    icon: "User",
  },
  {
    id: "important-contacts",
    title: "Important Contacts & Advisors",
    description:
      "Your lawyer, accountant, family contacts, and important details your family will need first.",
    icon: "BookOpen",
  },
  {
    id: "bank-accounts",
    title: "Bank Accounts & Investments",
    description:
      "Your bank accounts, RRSPs, TFSAs, and any investments. Check your latest statements if you have them.",
    icon: "Landmark",
  },
  {
    id: "income",
    title: "Income Sources",
    description:
      "Pensions, CPP, OAS, rental income — everything that comes in each month.",
    icon: "DollarSign",
  },
  {
    id: "debts",
    title: "Debts",
    description:
      "Credit cards, lines of credit — anything your family should know about. No judgement here.",
    icon: "CreditCard",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    description:
      "Any properties you own — your home, cottage, rental properties. Gather your mortgage papers if you can.",
    icon: "Home",
  },
  {
    id: "physical-assets",
    title: "Physical Assets & Valuables",
    description:
      "Vehicles, jewelry, collectibles, firearms — anything of value your family should know about.",
    icon: "Package",
  },
  {
    id: "business-interests",
    title: "Business Interests",
    description:
      "Any businesses you own or have a stake in — corporations, partnerships, or sole proprietorships.",
    icon: "Briefcase",
  },
  {
    id: "insurance",
    title: "Insurance Plans",
    description:
      "Car insurance, home insurance, life insurance, health plans — all in one place.",
    icon: "Shield",
  },
  {
    id: "expenses",
    title: "Monthly Expenses & Bills",
    description:
      "Your regular monthly bills. We've pre-filled some common ones to get you started.",
    icon: "Receipt",
  },
  {
    id: "digital-accounts",
    title: "Digital Accounts & Subscriptions",
    description:
      "Email, social media, streaming, online banking — accounts your family may need to manage.",
    icon: "Globe",
  },
  {
    id: "summary",
    title: "Summary",
    description:
      "A complete overview of everything you've entered. You're almost done!",
    icon: "BarChart3",
  },
  {
    id: "action-guide",
    title: "What To Do — Action Guide",
    description:
      "A step-by-step guide for your family, with timelines, template letters, and important phone numbers.",
    icon: "ClipboardList",
  },
];
