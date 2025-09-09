import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function useFavouriteRedirect() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user?.sub) return;

    const checkFavorite = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/favourites/${encodeURIComponent(
          user.sub
        )}`
      );
      const data = await res.json();
      if (data.teamId) {
        navigate(`/club/${data.teamId}`);
      }
    };

    checkFavorite();
  }, [isAuthenticated, user]);
}
