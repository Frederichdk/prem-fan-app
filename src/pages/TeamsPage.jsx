import TeamCards from "../components/TeamCards";
import { useNavigate } from "react-router-dom";
import TeamTable from "../components/TeamTable";
import { useEffect, useRef, useState } from "react";
import { getStandings } from "../api/getStandings";
import AuthButtons from "../components/AuthButtons";
import { useAuth0 } from "@auth0/auth0-react";
import useFavouriteRedirect from "../hook/useFavouriteRedirect";

export default function TeamsPage() {
  const navigate = useNavigate();
  const [row, setRow] = useState(null);
  //to show when last updated to know when to refresh not implemented yet
  const [updatedAt, setUpdatedAt] = useState(null);
  const [hoverTeam, setHoverTeam] = useState(null);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const fetchRef = useRef(false);

  useFavouriteRedirect();

  useEffect(() => {
    if (fetchRef.current) {
      return;
    }
    fetchRef.current = true;
    async function fetchStandings() {
      const data = await getStandings();
      setRow(data.table);
      setUpdatedAt(data.updatedAt);
    }
    fetchStandings();
  }, []);

  const handleClick = async (id) => {
    if (!isAuthenticated) {
      await loginWithRedirect({ appState: { returnTo: `#/club/${id}` } });
      return;
    }
    navigate(`/club/${id}`);
  };

  return (
    <>
      <div className="flex flex-row h-full w-full justify-center gap-24 ">
        {row ? (
          <TeamTable rows={row} hoverTeam={hoverTeam} />
        ) : (
          <div>Loading...</div>
        )}
        <div className="flex flex-col">
          <AuthButtons />
          <TeamCards onSelect={handleClick} onHover={setHoverTeam} />
        </div>
      </div>
    </>
  );
}
