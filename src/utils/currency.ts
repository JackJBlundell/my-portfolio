export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Rate relative to USD
  locale: string;
  flag: string;
}

// Exchange rates relative to USD (base currency)
// These are approximate rates - in production you'd fetch live rates
export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1, locale: 'en-US', flag: '🇺🇸' },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, locale: 'en-GB', flag: '🇬🇧' },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, locale: 'de-DE', flag: '🇪🇺' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.40, locale: 'en-CA', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.54, locale: 'en-AU', flag: '🇦🇺' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', rate: 1.70, locale: 'en-NZ', flag: '🇳🇿' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rate: 0.88, locale: 'de-CH', flag: '🇨🇭' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', rate: 10.85, locale: 'sv-SE', flag: '🇸🇪' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', rate: 11.05, locale: 'nb-NO', flag: '🇳🇴' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', rate: 6.88, locale: 'da-DK', flag: '🇩🇰' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.50, locale: 'ja-JP', flag: '🇯🇵' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 1.34, locale: 'en-SG', flag: '🇸🇬' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', rate: 7.79, locale: 'zh-HK', flag: '🇭🇰' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.50, locale: 'en-IN', flag: '🇮🇳' },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', rate: 17.15, locale: 'es-MX', flag: '🇲🇽' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 4.97, locale: 'pt-BR', flag: '🇧🇷' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 18.65, locale: 'en-ZA', flag: '🇿🇦' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67, locale: 'ar-AE', flag: '🇦🇪' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', rate: 3.98, locale: 'pl-PL', flag: '🇵🇱' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', rate: 3.65, locale: 'he-IL', flag: '🇮🇱' },
];

export const getCurrencyByCode = (code: string): Currency => {
  return currencies.find(c => c.code === code) || currencies[0];
};

// Map browser locales to currency codes
const localeToCurrency: Record<string, string> = {
  'en-US': 'USD',
  'en-GB': 'GBP',
  'en-AU': 'AUD',
  'en-CA': 'CAD',
  'en-NZ': 'NZD',
  'en-SG': 'SGD',
  'en-IN': 'INR',
  'en-ZA': 'ZAR',
  'de-DE': 'EUR',
  'de-AT': 'EUR',
  'fr-FR': 'EUR',
  'fr-BE': 'EUR',
  'es-ES': 'EUR',
  'it-IT': 'EUR',
  'nl-NL': 'EUR',
  'pt-PT': 'EUR',
  'fi-FI': 'EUR',
  'el-GR': 'EUR',
  'de-CH': 'CHF',
  'fr-CH': 'CHF',
  'sv-SE': 'SEK',
  'nb-NO': 'NOK',
  'nn-NO': 'NOK',
  'da-DK': 'DKK',
  'ja-JP': 'JPY',
  'zh-HK': 'HKD',
  'es-MX': 'MXN',
  'pt-BR': 'BRL',
  'ar-AE': 'AED',
  'pl-PL': 'PLN',
  'he-IL': 'ILS',
};

export const detectUserCurrency = (): string => {
  // Check localStorage first
  const stored = localStorage.getItem('preferredCurrency');
  if (stored && currencies.some(c => c.code === stored)) {
    return stored;
  }

  // Try to detect from browser locale
  const browserLocale = navigator.language;

  // Direct match
  if (localeToCurrency[browserLocale]) {
    return localeToCurrency[browserLocale];
  }

  // Try language-only match (e.g., 'en' -> 'USD')
  const languageOnly = browserLocale.split('-')[0];
  const languageMatch = Object.entries(localeToCurrency).find(
    ([locale]) => locale.startsWith(languageOnly + '-')
  );
  if (languageMatch) {
    return languageMatch[1];
  }

  // Default to USD
  return 'USD';
};

export const convertPrice = (usdAmount: number, currency: Currency): number => {
  return Math.round(usdAmount * currency.rate);
};

export const formatPrice = (amount: number, currency: Currency): string => {
  // For currencies with large values (JPY, INR, etc.), round to nearest 100 or 1000
  let roundedAmount = amount;
  if (currency.rate > 50) {
    roundedAmount = Math.round(amount / 100) * 100;
  } else if (currency.rate > 10) {
    roundedAmount = Math.round(amount / 10) * 10;
  }

  try {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(roundedAmount);
  } catch {
    // Fallback formatting
    return `${currency.symbol}${roundedAmount.toLocaleString()}`;
  }
};

export const formatPriceRange = (
  minUsd: number,
  maxUsd: number,
  currency: Currency,
  includesPlus: boolean = false
): string => {
  const minConverted = convertPrice(minUsd, currency);
  const maxConverted = convertPrice(maxUsd, currency);

  const minFormatted = formatPrice(minConverted, currency);
  const maxFormatted = formatPrice(maxConverted, currency);

  if (includesPlus) {
    return `${minFormatted} - ${maxFormatted}+`;
  }
  return `${minFormatted} - ${maxFormatted}`;
};
