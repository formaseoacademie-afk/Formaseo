import React, { createContext, useContext, useState } from 'react';

type Currency = 'MAD' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceMAD: number, priceEUR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('MAD');

  const formatPrice = (priceMAD: number, priceEUR: number) => {
    if (currency === 'MAD') {
      return `${priceMAD.toLocaleString('fr-MA')} DH`;
    }
    return `${priceEUR} €`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
