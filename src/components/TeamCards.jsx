import { TEAMS } from "../data/teams";

const TeamCards = ({ onSelect }) => {
  return (
    <div className="flex flex-col gap-10 px-6 w-[50%] h-full ">
      <h1 className="flex justify-center text-8xl font-bold">Premier League</h1>
      <div className="grid grid-cols-4 gap-4">
        {Object.values(TEAMS).map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{ "--shadow-color": t.colors.primary }}
            className="flex justify-center items-center p-4 bg-white rounded-xl shadow transition-transform duration-200
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
