const ClubHeader = ({ teamInfo: { name, crest } }) => {
  return (
    <div className="w-full bg-f-white p-3 rounded-2xl shadow-lg">
      <div className="border-[3px] border-f-isabelline rounded-xl p-7">
        <div className="flex items-center gap-4">
          <img
            src={crest}
            alt={`${name} crest`}
            className="h-28 w-28 rounded-lg p-2"
          />
          <h1 className="text-6xl text-f-jet font-bold drop-shadow-sm">
            {name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ClubHeader;
