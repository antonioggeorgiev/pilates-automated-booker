import { createContext, useContext, useState } from "react";

interface PilatesDateContextType {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const PilatesDateContext = createContext<PilatesDateContextType | undefined>(
  undefined,
);

export function PilatesDateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  return (
    <PilatesDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </PilatesDateContext.Provider>
  );
}

export function usePilatesDate() {
  const context = useContext(PilatesDateContext);
  if (context === undefined) {
    throw new Error("usePilatesDate must be used within a PilatesDateProvider");
  }
  return context;
}
