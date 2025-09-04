import TeamCards from "../components/TeamCards";
import { useNavigate } from "react-router-dom";
import TeamTable from "../components/TeamTable";
import { useEffect, useState } from "react";
import { getStandings } from "../api/getStandings";

export default function TeamsPage() {
  const navigate = useNavigate();
  const [row, setRow] = useState(null);

  useEffect(() => {
    async function fetchStandings() {
      const data = await getStandings();
      setRow(data);
    }
    fetchStandings();
  }, []);

  return (
    <>
      <div className="flex flex-row h-full w-full justify-center items-center gap-24 ">
        {row ? <TeamTable rows={row} /> : <div>Loading...</div>}
        <TeamCards onSelect={(id) => navigate(`/club/${id}`)} />
      </div>
    </>
  );
}
