export async function getClubGames(teamID) {
  const params = new URLSearchParams({ limit: "100" });
  const res = await fetch(
    `/api-football/v4/teams/${teamID}/matches?` + params.toString(),
    {
      headers: { "X-Auth-Token": import.meta.env.VITE_FD_KEY },
    }
  );
  const data = await res.json();

  function formatScore(e, isHome) {
    const home = e.score.fullTime.home;
    const away = e.score.fullTime.away;

    if (home == null || away == null) return null;

    return isHome ? `${home}-${away}` : `${away}-${home}`;
  }

  function formatResult(e, isHome) {
    let result = null;
    const winner = e.score.winner;
    if (winner == "DRAW") {
      return "D";
    }

    if (isHome) {
      if (winner == "HOME_TEAM") {
        result = "W";
      } else {
        result = "L";
      }
    } else {
      if (winner == "HOME_TEAM") {
        result = "L";
      } else {
        result = "W";
      }
    }
    return result;
  }

  function formatDate(utcDate) {
    const date = new Date(utcDate);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
    }).format(date);
  }

  function formatTime(utcDate) {
    const date = new Date(utcDate);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }

  const recentResults = data.matches
    .filter((e) => e.status === "FINISHED")
    .sort((a, b) => Date.parse(b.utcDate) - Date.parse(a.utcDate))
    .slice(0, 3)
    .map((e) => {
      const isHome = e.homeTeam.id === teamID;
      return {
        key: e.id,
        isHome,
        opponent: isHome ? e.awayTeam.shortName : e.homeTeam.shortName,
        date: formatDate(e.utcDate),
        time: formatTime(e.utcDate),
        result: formatResult(e, isHome),
        score: formatScore(e, isHome),
        competition: e.competition.code,
        venue: "Missing",
      };
    });

  const upcoming = data.matches
    .filter((e) => e.status === "TIMED" || e.status === "SCHEDULED")
    .sort((a, b) => Date.parse(a.utcDate) - Date.parse(b.utcDate));

  const nextGame = upcoming[0];
  const isHome = nextGame.homeTeam.id === teamID;
  const nextMatch = {
    date: formatDate(nextGame.utcDate),
    time: formatTime(nextGame.utcDate),
    opponent: isHome
      ? nextGame.awayTeam.shortName
      : nextGame.homeTeam.shortName,
    competition: nextGame.competition.name,
    venue: "Missing",
  };

  return { nextMatch, recentResults };
}
