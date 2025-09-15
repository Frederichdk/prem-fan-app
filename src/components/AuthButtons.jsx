import { useAuth0 } from "@auth0/auth0-react";
import { TbRefresh } from "react-icons/tb";
import { refreshStandings } from "../api/getStandings";
import { useStandings } from "../context/StandingsContext";

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();
  const { setRow } = useStandings();

  if (isLoading) return null;

  const onClick = async () => {
    const fresh = await refreshStandings();
    setRow(fresh.table);
  };

  return isAuthenticated ? (
    <div className="flex justify-end items-center h-14">
      <TbRefresh
        size={42}
        className="hover:-rotate-180 transition-transform duration-700"
        onClick={onClick}
      />
      <button
        className=" h-8 text-center rounded-2xl ml-5 bg-gray-300 px-3 py-1 hover:scale-110 hover:shadow-lg transition-transform duration-2s"
        onClick={() => logout()}
      >
        Log Out
      </button>
      <img
        src={user?.picture}
        alt="Profile photo"
        className="rounded-full h-14 w-14 mx-5"
      />
    </div>
  ) : (
    <div className="flex justify-end items-center pr-8 h-14">
      <button
        className="h-8 text-center rounded-2xl bg-gray-300 px-3 py-1 hover:scale-110 hover:shadow-lg transition-transform duration-2s"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    </div>
  );
};

export default AuthButtons;
