import { createContext, useContext, useState } from "react";

const NewsContext = createContext(null);

export function NewsProvider({ children }) {
  const [news, setNews] = useState(null);
  return (
    <NewsContext.Provider value={{ news, setNews }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  return useContext(NewsContext);
}
