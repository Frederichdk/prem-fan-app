import { Result } from "postcss";

export const mockClub = {
  slug: "Nottingham Forrest",
  name: "Nottingham Forrest",
  crest: "/nffcCrest.png",
  colors: { primary: "#DD0000", secondary: "#FFFFFF" },
};

export const mockNextMatch = {
  date: "Aug 27",
  time: "5:00 pm",
  opponent: "Newcastle United",
  venue: "The City Ground",
  competition: "Premier League",
};

export const mockRecentResults = [
  {
    date: "Aug 20",
    opponent: "Everton",
    venue: "Hill Dickinson Stadium",
    score: "2-0",
    result: "W",
    competition: "PL",
  },
  {
    date: "Aug 16",
    opponent: "West Ham",
    venue: "The City Ground",
    score: "0-1",
    result: "L",
    competition: "Europa",
  },
  {
    date: "Aug 13",
    opponent: "Brentford",
    venue: "Gtech Community Stadium",
    score: "1-1",
    result: "D",
    competition: "PL",
  },
];
