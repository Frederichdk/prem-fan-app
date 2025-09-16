import { createContext, useContext, useState } from "react";

const StandingsContext = createContext(null);

export function StandingsProvider({ children }) {
  const [row, setRow] = useState(null);

  return (
    <StandingsContext.Provider value={{ row, setRow }}>
      {children}
    </StandingsContext.Provider>
  );
}

export function useStandings() {
  return useContext(StandingsContext);
}
