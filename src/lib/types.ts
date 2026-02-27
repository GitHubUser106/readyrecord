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
  encouragement?: string;
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
  | "summary";

export const SECTIONS: SectionMeta[] = [
  {
    id: "personal-info",
    title: "About You",
    description:
      "Let\u2019s start with the basics \u2014 just pull out your wallet and any ID you have handy.",
    icon: "User",
  },
  {
    id: "important-contacts",
    title: "Your People",
    description:
      "Who should your family call first? Your lawyer, accountant, close friends \u2014 anyone who\u2019d want to know.",
    icon: "BookOpen",
    encouragement: "Great start \u2014 the basics are done.",
  },
  {
    id: "bank-accounts",
    title: "Your Accounts",
    description:
      "Let\u2019s note down your bank accounts and investments. If you have statements handy, great \u2014 but even just the bank names and rough balances are helpful.",
    icon: "Landmark",
    encouragement: "Your contacts are saved. Nice work.",
  },
  {
    id: "income",
    title: "Your Income",
    description:
      "Pensions, CPP, OAS, rental income \u2014 everything that comes in each month. Your family will need to know what to expect.",
    icon: "DollarSign",
    encouragement: "That\u2019s your accounts done. You\u2019re doing great.",
  },
  {
    id: "debts",
    title: "What You Owe",
    description:
      "Nobody loves this part, but it helps your family know what needs to be paid off. Just the cards and loans you can think of \u2014 it doesn\u2019t need to be exact.",
    icon: "CreditCard",
    encouragement: "Income section complete. Keep going!",
  },
  {
    id: "real-estate",
    title: "Your Properties",
    description:
      "Any properties you own \u2014 your home, cottage, rental properties. Grab your mortgage papers if you can find them.",
    icon: "Home",
    encouragement: "Almost halfway \u2014 you\u2019re making great progress.",
  },
  {
    id: "physical-assets",
    title: "Your Valuables",
    description:
      "Things like vehicles, jewelry, collections, or anything your family should know about. Also a good place to note who you\u2019d like certain things to go to.",
    icon: "Package",
    encouragement: "Properties are noted. Well done.",
  },
  {
    id: "business-interests",
    title: "Your Businesses",
    description:
      "If you own or co-own a business of any kind, your family will need to know who to contact. If this doesn\u2019t apply, just skip ahead.",
    icon: "Briefcase",
    encouragement: "Your valuables are recorded. Nearly there.",
  },
  {
    id: "insurance",
    title: "Your Insurance",
    description:
      "Car insurance, home insurance, life insurance, health plans \u2014 all the policies that keep you and your family covered.",
    icon: "Shield",
    encouragement: "Businesses done. Just a few more to go.",
  },
  {
    id: "expenses",
    title: "Your Monthly Bills",
    description:
      "Your regular monthly bills. We\u2019ve started a list of common ones \u2014 just fill in what applies to you.",
    icon: "Receipt",
    encouragement: "Insurance is sorted. Almost finished!",
  },
  {
    id: "digital-accounts",
    title: "Your Online Accounts",
    description:
      "Email, social media, streaming, online banking \u2014 accounts your family may need to manage or cancel.",
    icon: "Globe",
    encouragement: "Bills are covered. Just one more section after this.",
  },
  {
    id: "summary",
    title: "Your Summary",
    description:
      "Here\u2019s everything you\u2019ve put together. Your family will be so grateful you did this.",
    icon: "BarChart3",
    encouragement: "That\u2019s everything! Let\u2019s see what you\u2019ve put together.",
  },
];
