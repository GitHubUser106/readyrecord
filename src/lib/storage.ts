import type {
  ReadyRecordData,
  PersonalInformation,
  Debts,
  BankAccounts,
  RealEstate,
  Insurance,
  Income,
  Expenses,
  ImportantContacts,
  SectionId,
} from "./types";

const STORAGE_KEY = "readyrecord-data";

// --- Default empty states ---

export function emptyPersonalInfo(): PersonalInformation {
  return {
    fullLegalName: "",
    address: "",
    dateOfBirth: "",
    placeOfBirth: "",
    sin: "",
    driversLicense: "",
    mothersMaidenName: "",
    spouseName: "",
    spouseSin: "",
    dateOfMarriage: "",
    spouseDateOfBirth: "",
  };
}

export function emptyDebts(): Debts {
  return {
    creditCards: [],
    linesOfCredit: [],
  };
}

export function emptyBankAccounts(): BankAccounts {
  return {
    accounts: [],
  };
}

export function emptyRealEstate(): RealEstate {
  return {
    properties: [],
  };
}

export function emptyInsurance(): Insurance {
  return {
    automobile: [],
    homeowners: [],
    medical: [],
    life: [],
    longTermCare: [],
    other: [],
  };
}

export function emptyIncome(): Income {
  return {
    sources: [],
  };
}

export function defaultExpenses(): Expenses {
  return {
    expenses: [
      {
        id: crypto.randomUUID(),
        companyName: "",
        paymentType: "",
        contactInfo: "",
        description: "Telephone",
        paymentDayOfMonth: "",
        accountNumber: "",
        notes: "",
        monthlyAmount: "",
      },
      {
        id: crypto.randomUUID(),
        companyName: "",
        paymentType: "",
        contactInfo: "",
        description: "Natural Gas",
        paymentDayOfMonth: "",
        accountNumber: "",
        notes: "",
        monthlyAmount: "",
      },
      {
        id: crypto.randomUUID(),
        companyName: "",
        paymentType: "",
        contactInfo: "",
        description: "Internet / Cable",
        paymentDayOfMonth: "",
        accountNumber: "",
        notes: "",
        monthlyAmount: "",
      },
      {
        id: crypto.randomUUID(),
        companyName: "",
        paymentType: "",
        contactInfo: "",
        description: "Hydro / Electricity",
        paymentDayOfMonth: "",
        accountNumber: "",
        notes: "",
        monthlyAmount: "",
      },
      {
        id: crypto.randomUUID(),
        companyName: "",
        paymentType: "",
        contactInfo: "",
        description: "Strata / Condo Fee",
        paymentDayOfMonth: "",
        accountNumber: "",
        notes: "",
        monthlyAmount: "",
      },
      {
        id: crypto.randomUUID(),
        companyName: "",
        paymentType: "",
        contactInfo: "",
        description: "Property Tax",
        paymentDayOfMonth: "",
        accountNumber: "",
        notes: "",
        monthlyAmount: "",
      },
      {
        id: crypto.randomUUID(),
        companyName: "",
        paymentType: "",
        contactInfo: "",
        description: "Food / Groceries",
        paymentDayOfMonth: "",
        accountNumber: "",
        notes: "",
        monthlyAmount: "",
      },
      {
        id: crypto.randomUUID(),
        companyName: "",
        paymentType: "",
        contactInfo: "",
        description: "Car Insurance",
        paymentDayOfMonth: "",
        accountNumber: "",
        notes: "",
        monthlyAmount: "",
      },
      {
        id: crypto.randomUUID(),
        companyName: "",
        paymentType: "",
        contactInfo: "",
        description: "Car Maintenance & Gas",
        paymentDayOfMonth: "",
        accountNumber: "",
        notes: "",
        monthlyAmount: "",
      },
    ],
  };
}

export function emptyImportantContacts(): ImportantContacts {
  return {
    lawyerName: "",
    lawyerContact: "",
    accountantName: "",
    accountantContact: "",
    financialAdvisorName: "",
    financialAdvisorContact: "",
    funeralHome: "",
    funeralPrePaid: "",
    funeralDetails: "",
    executorOfWill: "",
    locationOfWill: "",
    safetyDepositBoxLocation: "",
    safetyDepositBoxKeyLocation: "",
    otherNotes: "",
  };
}

function emptyData(): ReadyRecordData {
  return {
    personalInfo: emptyPersonalInfo(),
    debts: emptyDebts(),
    bankAccounts: emptyBankAccounts(),
    realEstate: emptyRealEstate(),
    insurance: emptyInsurance(),
    income: emptyIncome(),
    expenses: defaultExpenses(),
    importantContacts: emptyImportantContacts(),
    lastUpdated: new Date().toISOString(),
  };
}

// --- Read/Write ---

export function loadAllData(): ReadyRecordData {
  if (typeof window === "undefined") return emptyData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyData();
    const parsed = JSON.parse(raw) as ReadyRecordData;
    // Merge with empty data to fill any missing fields from older saves
    return { ...emptyData(), ...parsed };
  } catch {
    return emptyData();
  }
}

export function saveAllData(data: ReadyRecordData): void {
  if (typeof window === "undefined") return;
  data.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Section-specific save helpers
export function saveSection<K extends keyof ReadyRecordData>(
  key: K,
  value: ReadyRecordData[K]
): void {
  const data = loadAllData();
  data[key] = value;
  saveAllData(data);
}

export function loadSection<K extends keyof ReadyRecordData>(
  key: K
): ReadyRecordData[K] {
  return loadAllData()[key];
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// --- Completion tracking ---

export function getSectionCompletion(data: ReadyRecordData): Record<SectionId, number> {
  const personal = data.personalInfo;
  const personalFields = Object.values(personal).filter((v) => v.trim() !== "").length;
  const personalTotal = Object.keys(personal).length;

  const debtsCount =
    data.debts.creditCards.length + data.debts.linesOfCredit.length;

  const bankCount = data.bankAccounts.accounts.length;

  const realEstateCount = data.realEstate.properties.length;

  const insuranceCount =
    data.insurance.automobile.length +
    data.insurance.homeowners.length +
    data.insurance.medical.length +
    data.insurance.life.length +
    data.insurance.longTermCare.length +
    data.insurance.other.length;

  const incomeCount = data.income.sources.length;

  const expensesFilled = data.expenses.expenses.filter(
    (e) => e.companyName.trim() !== "" || e.monthlyAmount.trim() !== ""
  ).length;

  const contacts = data.importantContacts;
  const contactFields = Object.values(contacts).filter(
    (v) => v.trim() !== ""
  ).length;
  const contactTotal = Object.keys(contacts).length;

  return {
    "personal-info": personalTotal > 0 ? Math.round((personalFields / personalTotal) * 100) : 0,
    debts: debtsCount > 0 ? 100 : 0,
    "bank-accounts": bankCount > 0 ? 100 : 0,
    "real-estate": realEstateCount > 0 ? 100 : 0,
    insurance: insuranceCount > 0 ? 100 : 0,
    income: incomeCount > 0 ? 100 : 0,
    expenses: expensesFilled > 0 ? 100 : 0,
    "important-contacts":
      contactTotal > 0 ? Math.round((contactFields / contactTotal) * 100) : 0,
    summary: 0, // summary is always derived
  };
}

export function getOverallCompletion(data: ReadyRecordData): number {
  const completions = getSectionCompletion(data);
  const sections = Object.keys(completions).filter((k) => k !== "summary") as SectionId[];
  const total = sections.reduce((sum, key) => sum + completions[key], 0);
  return Math.round(total / sections.length);
}
