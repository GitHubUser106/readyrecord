import type {
  ReadyRecordData,
  PersonalInformation,
  Debts,
  BankAccounts,
  RealEstate,
  PhysicalAssets,
  BusinessInterests,
  Insurance,
  Income,
  Expenses,
  DigitalAccounts,
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

export function emptyPhysicalAssets(): PhysicalAssets {
  return {
    assets: [],
  };
}

export function emptyBusinessInterests(): BusinessInterests {
  return {
    businesses: [],
  };
}

export function emptyInsurance(): Insurance {
  return {
    automobile: [],
    homeowners: [],
    life: [],
    termLife: [],
    wholeLife: [],
    criticalIllness: [],
    disability: [],
    extendedHealth: [],
    travel: [],
    longTermCare: [],
    mortgage: [],
    pet: [],
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

export function emptyDigitalAccounts(): DigitalAccounts {
  return {
    accounts: [],
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
    serviceCanadaNumber: "",
    veteransAffairsNumber: "",
    unionLocal: "",
    pensionAdministrator: "",
    funeralHome: "",
    funeralPrePaid: "",
    funeralDetails: "",
    executorOfWill: "",
    locationOfWill: "",
    safetyDepositBoxLocation: "",
    safetyDepositBoxKeyLocation: "",
    otherNotes: "",
    clergyName: "",
    clergyContact: "",
    closeFriends: [],
    employerContact: "",
    pensionPlanAdministrator: "",
    unionRepresentative: "",
    veteransAffairsContact: "",
    craMyAccountSetUp: "",
    poaName: "",
    poaDocumentLocation: "",
    representationAgreement: "",
    advancedDirectiveLocation: "",
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
    physicalAssets: emptyPhysicalAssets(),
    businessInterests: emptyBusinessInterests(),
    digitalAccounts: emptyDigitalAccounts(),
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
    const defaults = emptyData();
    // Deep merge: top-level spread, then merge sub-objects so new fields get defaults
    const merged = {
      ...defaults,
      ...parsed,
      insurance: { ...defaults.insurance, ...(parsed.insurance || {}) },
      importantContacts: {
        ...defaults.importantContacts,
        ...(parsed.importantContacts || {}),
        closeFriends: parsed.importantContacts?.closeFriends ?? [],
      },
    };
    // Backfill new fields on existing income sources
    if (merged.income?.sources) {
      merged.income.sources = merged.income.sources.map((s) => ({
        ...s,
        splitWithSpouse: s.splitWithSpouse ?? "",
      }));
    }
    return merged;
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

  const physicalAssetsCount = data.physicalAssets.assets.length;

  const businessCount = data.businessInterests.businesses.length;

  const insuranceCount = Object.values(data.insurance).reduce(
    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
    0
  );

  const incomeCount = data.income.sources.length;

  const expensesFilled = data.expenses.expenses.filter(
    (e) => e.companyName.trim() !== "" || e.monthlyAmount.trim() !== ""
  ).length;

  const digitalCount = data.digitalAccounts.accounts.length;

  // Important Contacts: count filled flat string fields (skip closeFriends array)
  const contacts = data.importantContacts;
  const contactStringFields = Object.entries(contacts)
    .filter(([key, val]) => key !== "closeFriends" && typeof val === "string")
    .filter(([, val]) => (val as string).trim() !== "").length;
  const contactStringTotal = Object.entries(contacts)
    .filter(([key, val]) => key !== "closeFriends" && typeof val === "string").length;
  const friendBonus = contacts.closeFriends.length > 0 ? 1 : 0;
  const contactFilled = contactStringFields + friendBonus;
  const contactTotal = contactStringTotal + 1; // +1 for the closeFriends "section"

  return {
    "personal-info": personalTotal > 0 ? Math.round((personalFields / personalTotal) * 100) : 0,
    "important-contacts":
      contactTotal > 0 ? Math.round((contactFilled / contactTotal) * 100) : 0,
    "bank-accounts": bankCount > 0 ? 100 : 0,
    income: incomeCount > 0 ? 100 : 0,
    debts: debtsCount > 0 ? 100 : 0,
    "real-estate": realEstateCount > 0 ? 100 : 0,
    "physical-assets": physicalAssetsCount > 0 ? 100 : 0,
    "business-interests": businessCount > 0 ? 100 : 0,
    insurance: insuranceCount > 0 ? 100 : 0,
    expenses: expensesFilled > 0 ? 100 : 0,
    "digital-accounts": digitalCount > 0 ? 100 : 0,
    summary: 0, // summary is always derived
    "action-guide": 100, // reference content, always complete
  };
}

export function getOverallCompletion(data: ReadyRecordData): number {
  const completions = getSectionCompletion(data);
  const excludeKeys = new Set(["summary", "action-guide"]);
  const sections = Object.keys(completions).filter((k) => !excludeKeys.has(k)) as SectionId[];
  const total = sections.reduce((sum, key) => sum + completions[key], 0);
  return Math.round(total / sections.length);
}
