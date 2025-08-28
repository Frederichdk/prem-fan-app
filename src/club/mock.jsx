import { Result } from "postcss";

export const mockClub = {
  slug: "Nottingham Forrest",
  name: "Nottingham Forrest",
  crest: "/nffcCrest.png",
  colors: { primary: "#DD0000", secondary: "#FFFFFF" },
};

export const mockStats = {
  played: 3,
  wins: 1,
  draws: 1,
  losses: 1,
  points: 4,
  position: 5,
};

export const mockNextMatch = {
  kickoffDate: "Aug 27",
  kickoffTime: "5:00 pm",
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

export const mockNews = [
  {
    title: "Forest clinch home win at The City Ground",
    source: "BBC Sport",
    publishedAt: "2025-08-26T10:05:00Z",
    url: "#",
  },
  {
    title: "Injury update ahead of Newcastle clash",
    source: "Sky Sports",
    publishedAt: "2025-08-25T14:00:00Z",
    url: "#",
  },
];
