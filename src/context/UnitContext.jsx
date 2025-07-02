import React, { createContext, useState } from "react";

export const UnitContext = createContext();

export const UnitProvider = ({ children }) => {
  const [unit, setUnit] = useState("metric"); // 'metric' for Celsius, 'imperial' for Fahrenheit
  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
}; 