import { createContext, useContext, useState } from "react";

const GamesContext = createContext(null);

export function GamesProvider({ children }) {
  const [game, setGame] = useState(null);
  return (
    <GamesContext.Provider value={{ game, setGame }}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  return useContext(GamesContext);
}
