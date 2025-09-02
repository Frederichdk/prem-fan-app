import { useEffect } from "react";
import { TEAMS } from "../data/teams";

export function useTeamTheme(selectedTeamID) {
  useEffect(() => {
    const team = TEAMS[selectedTeamID];
    if (!team) return;

    const root = document.documentElement;
    root.style.setProperty("--color-primary", team.colors.primary);
    root.style.setProperty("--color-secondary", team.colors.secondary);
    root.style.setProperty("--color-textcol", team.colors.text);
  }, [selectedTeamID]);
}
