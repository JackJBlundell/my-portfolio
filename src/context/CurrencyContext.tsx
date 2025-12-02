import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency, currencies, getCurrencyByCode, detectUserCurrency } from '../utils/currency';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (code: string) => void;
  currencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const detected = detectUserCurrency();
    return getCurrencyByCode(detected);
  });

  const setCurrency = (code: string) => {
    const newCurrency = getCurrencyByCode(code);
    setCurrencyState(newCurrency);
    localStorage.setItem('preferredCurrency', code);
  };

  // Re-detect on mount (in case localStorage was updated elsewhere)
  useEffect(() => {
    const detected = detectUserCurrency();
    setCurrencyState(getCurrencyByCode(detected));
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
