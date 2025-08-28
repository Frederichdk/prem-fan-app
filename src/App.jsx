import "./App.css";
import {
  mockClub,
  mockNews,
  mockNextMatch,
  mockRecentResults,
  mockStats,
} from "./club/mock";
import ClubGames from "./components/ClubGames";
import ClubHeader from "./components/ClubHeader";
import ClubNews from "./components/ClubNews";
import ClubStats from "./components/ClubStats";

function App() {
  return (
    <>
      <div className="h-full w-full flex flex-col gap-10">
        <ClubHeader
          name={mockClub.name}
          crest={mockClub.crest}
          primary={mockClub.colors.primary}
        />
        <div className="w-full h-[70%] flex flex-row gap-10">
          <ClubStats
            played={mockStats.played}
            wins={mockStats.wins}
            losses={mockStats.losses}
            draws={mockStats.draws}
            points={mockStats.points}
            position={mockStats.position}
          />
          <div className="w-full h-full flex flex-col gap-10">
            <ClubGames
              nextMatch={mockNextMatch}
              recentResults={mockRecentResults}
            />
            <ClubNews news={mockNews} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
