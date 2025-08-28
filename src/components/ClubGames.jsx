const ClubGames = ({ nextMatch = null, recentResults = [] }) => {
  return (
    <div className="h-[50%] w-full bg-f-white rounded-2xl shadow-xl p-6 flex flex-col gap-6">
      <div className="flex flex-row gap-30">
        <h2 className="text-4xl text-f-jet font-bold ">Next Game</h2>
        <h2 className="text-4xl text-f-jet font-bold ">Recent Results</h2>
      </div>
      <div className="flex flex-row gap-8 h-full">
        <div className="h-full flex-1 bg-f-red rounded-2xl p-4 flex flex-col justify-between">
          <p class="text-xl font-medium tracking-wide text-red-100 uppercase">
            {nextMatch.competition}
          </p>
          <div>
            <p class="text-3xl font-semibold text-f-white">
              {nextMatch.opponent}
            </p>
            <p class="text-xl text-red-100">
              {nextMatch.kickoffDate} · {nextMatch.kickoffTime}
            </p>
          </div>
          <p class="text-xl text-red-200">{nextMatch.venue}</p>
        </div>
        {recentResults.map((e) => (
          <div className="h-full flex-1 bg-[#e7e7e7] rounded-2xl p-4 flex flex-col justify-between shadow-lg">
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
