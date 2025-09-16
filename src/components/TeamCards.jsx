import { TEAMS } from "../data/teams";

const TeamCards = ({ onSelect, onHover }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 px-6 h-full">
      <h1 className="flex justify-center text-8xl font-bold">Premier League</h1>
      <h2 className="flex justify-center text-4xl font-bold">Pick Your Club</h2>
      <div className="grid grid-cols-4 gap-4">
        {Object.values(TEAMS).map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            onMouseEnter={() =>
              onHover({ teamId: t.id, primaryColor: t.colors.primary })
            }
            onMouseLeave={() => onHover(null)}
            style={{ "--shadow-color": t.colors.primary }}
            className="flex justify-center items-center p-4 px-10 bg-white rounded-xl shadow transition-transform duration-200
                     hover:-translate-y-1 hover:scale-[1.01]
                     hover:shadow-[0_6px_12px_var(--shadow-color)]"
          >
            <img src={t.crest} alt={t.shortName} className="h-20 " />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeamCards;
