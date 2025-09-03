const TeamTable = ({ rows = [] }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow w-[30%] h-full">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead className="bg-white/90">
          <tr className="text-sm text-gray-500">
            <th className="px-3 py-2 font-semibold tracking-wide">#</th>
            <th className="px-3 py-2 font-semibold tracking-wide">Team</th>
            <th className="px-3 py-2 font-semibold tracking-wide text-center">
              P
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr
              key={t.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="px-3 py-1 font-semibold">{t.position}</td>
              <td className="px-3 py-1 flex items-center gap-2">
                <img src={t.team.crest} alt={t.shortName} className="h-6 w-6" />
                {t.team.shortName}
              </td>
              <td className="px-3 py-1 text-center">{t.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
