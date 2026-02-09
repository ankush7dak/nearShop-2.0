import { createContext, useContext, useState } from "react";

const CustomerContext = createContext(null);

export function CustomerProvider({ children }) {
  const [shopDetails, setShopDetails] = useState(null);

  return (
    <CustomerContext.Provider value={{ shopDetails, setShopDetails }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  return useContext(CustomerContext);
}
