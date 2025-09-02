const ClubGames = ({ nextMatch = null, recentResults = [] }) => {
  return (
    <div className="h-[50%] w-full bg-f-white rounded-2xl shadow-xl p-6 flex flex-col gap-6">
      <div className="flex flex-row gap-30">
        <h2 className="text-4xl text-f-jet font-bold ">Next Game</h2>
        <h2 className="text-4xl text-f-jet font-bold ">Recent Results</h2>
      </div>
      <div className="flex flex-row gap-8 h-full">
        <div className="h-full flex-1 bg-primary rounded-2xl p-4 flex flex-col justify-between">
          <p className="text-xl font-medium tracking-wide text-textcol/85 uppercase">
            {nextMatch.competition}
          </p>
          <div>
            <p className="text-3xl font-semibold text-textcol">
              {nextMatch.opponent}
            </p>
            <p className="text-xl text-textcol/85">
              {nextMatch.date} · {nextMatch.time}
            </p>
          </div>
          <p className="text-xl text-textcol/70">{nextMatch.venue}</p>
        </div>
        {recentResults.map((e) => (
          <div
            key={e.date}
            className="h-full flex-1 bg-[#e7e7e7] rounded-2xl p-4 flex flex-col justify-between shadow-lg"
          >
            <div className="flex flex-row justify-between">
              <p className="text-2xl font-bold ">{e.result}</p>
              <p className="text-2xl font-semibold">{e.score}</p>
            </div>
            <div className="flex flex-col ">
              <p className="text-2xl font-semibold">{e.opponent}</p>
              <p>{e.date}</p>
              <div className="flex flex-row justify-between">
                <p>{e.venue}</p>
                <p>{e.competition}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubGames;
