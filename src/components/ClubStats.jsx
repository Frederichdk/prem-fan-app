const ClubStats = ({ wins, losses, draws, points, position, played }) => {
  const stats = [
    { label: "Position", value: position },
    { label: "Played", value: played },
    { label: "Wins", value: wins },
    { label: "Draws", value: draws },
    { label: "Losses", value: losses },
    { label: "Points", value: points },
  ];

  return (
    <div className="h-full w-[40%] rounded-2xl bg-f-red p-6 shadow-xl">
      <h2 className="mb-8 text-4xl font-bold text-white">Club Stats</h2>
      <div className="flex flex-col gap-8">
        {stats.map((e) => (
          <div
            key={e.label}
            className="flex justify-between rounded-lg bg-white/20 py-4 px-14"
          >
            <p className="text-2xl text-f-white">{e.label}</p>
            <p className="text-2xl text-f-white">{e.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubStats;
