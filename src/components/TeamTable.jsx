const TeamTable = ({ rows = [], hoverTeam = null }) => {
  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);
  const first = top3[0];
  const second = top3[1];
  const third = top3[2];

  return (
    <div className=" flex flex-col justify-center items-center gap-6 pt-10 pb-5 rounded-xl  w-[40%] h-full">
      {/*Becoming to messy, podium Wrapper starts here*/}
      <div className="flex justify-center items-end h-fit w-full">
        {/* Silver podium starts here */}
        <div className="relative flex w-[14rem] h-44 items-end">
          <div className="relative w-full rounded-l-2xl bg-slate-200 shadow-lg">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 h-14 w-14 ">
              <img
                src={second.team.crest}
                alt="Crest"
                style={
                  hoverTeam && hoverTeam.teamID === second.team.id
                    ? { transform: "scale(1.2)", transition: "transform 0.8s" }
                    : { transition: "transform 0.8ss" }
                }
                className="h-full w-full object-cover drop-shadow-lg"
              />
            </div>
            <div className="p-4 pt-10 text-center">
              <p className="text-lg font-semibold">{second.team.name}</p>
              <p className="mt-1 text-3xl font-black tracking-tight">
                {second.points} Pts
              </p>
            </div>
            <div className="h-10 rounded-bl-2xl bg-gradient-to-t from-slate-50"></div>
          </div>
        </div>
        {/* Gold podium starts here */}
        <div className="relative flex w-[16rem] items-end">
          <div className="relative w-full rounded-t-2xl bg-amber-400 shadow-2xl ">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-24 w-24">
              <img
                src={first.team.crest}
                alt="Crest"
                style={
                  hoverTeam && hoverTeam.teamID === first.team.id
                    ? { transform: "scale(1.2)", transition: "transform 0.8s" }
                    : { transition: "transform 0.8s" }
                }
                className="h-full w-full object-cover drop-shadow-lg"
              />
            </div>
            <div className="p-5 pt-16 text-center text-amber-950">
              <p className="text-xl font-bold">{first.team.name}</p>
              <p className="mt-1 text-4xl font-black tracking-tight">
                {first.points} Pts
              </p>
            </div>
            <div className="h-10 bg-gradient-to-t from-yellow-100"></div>
          </div>
        </div>
        {/* Bronze podium starts here */}
        <div className="relative flex w-[14rem] h-44 items-end">
          <div className="relative w-full rounded-r-2xl bg-amber-800 text-white shadow-lg">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 h-14 w-14 ">
              <img
                src={third.team.crest}
                alt="Crest"
                style={
                  hoverTeam && hoverTeam.teamID === third.team.id
                    ? { transform: "scale(1.2)", transition: "transform 0.8s" }
                    : { transition: "transform 0.8ss" }
                }
                className="h-full w-full object-cover drop-shadow-lg"
              />
            </div>
            <div className="p-4 pt-10 text-center">
              <p className="text-lg font-semibold">{third.team.name}</p>
              <p className="mt-1 text-3xl font-black tracking-tight text-white">
                {third.points} Pts
              </p>
            </div>
            <div className="h-10 rounded-br-2xl bg-gradient-to-t from-amber-700 to-amber-800"></div>
          </div>
        </div>
      </div>
      {/*Rest of the teams*/}
      <div className="overflow-hidden w-[80%] h-full rounded-2xl ring-gray-300 ring-1 bg-white">
        <table className="w-full h-full table-fixed ">
          <thead className="h-10 border-b-1 border-gray-300">
            <tr>
              <th className="w-[25%]">#</th>
              <th className="text-left pl-4">Team</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rest.map((t) => {
              const isActive = hoverTeam
                ? hoverTeam.teamID === t.team.id
                : false;
              return (
                <tr
                  key={t.team.id}
                  style={
                    isActive
                      ? {
                          backgroundColor: `${hoverTeam.primaryColor}22`,
                          outline: `2px solid ${hoverTeam.primaryColor}`,
                        }
                      : {}
                    // This is the last thing I have done Today, the color and ID is not in the comp need to use it still
                  }
                  className="hover:bg-gray-50 h-[calc(100%/20)]"
                >
                  <td className="text-center px-3 py-1 font-semibold">
                    {t.position}
                  </td>
                  <td className="px-3 py-1 flex items-center gap-2">
                    <img
                      src={t.team.crest}
                      alt={t.team.shortName}
                      className="h-6 w-6"
                    />
                    {t.team.shortName}
                  </td>
                  <td className="px-3 py-1 text-center">{t.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTable;
