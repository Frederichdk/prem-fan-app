import { RiHome3Line } from "react-icons/ri";
import FavouriteButton from "./FavouriteButton";
import { useNavigate } from "react-router-dom";

const ClubHeader = ({ teamInfo: { name, crest }, teamID }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-f-white p-3 rounded-2xl shadow-lg">
      <div className="flex justify-between border-[3px] border-f-isabelline rounded-xl p-7">
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
        <div className="flex gap-10 items-center">
          <FavouriteButton teamId={teamID} />
          <RiHome3Line
            size={42}
            className="hover:scale-120 hover:-translate-y-1 transition-transform duration-2s"
            onClick={() => {
              navigate("/?pick=1");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClubHeader;
