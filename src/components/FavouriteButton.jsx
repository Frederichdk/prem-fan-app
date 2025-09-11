import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const FavouriteButton = ({ teamId }) => {
  const { user } = useAuth0();
  const [isFavourite, setIsFavourite] = useState(null);

  useEffect(() => {
    if (!user?.sub) return;
    const load = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/favourites/${encodeURIComponent(
          user.sub
        )}`
      );
      const { teamId: savedId } = await res.json();
      setIsFavourite(savedId === teamId);
    };

    load();
  }, [user.sub, teamId]);

  const onClick = async () => {
    if (!isFavourite) {
      await fetch(`${import.meta.env.VITE_API_URL}/favourites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.sub, teamId }),
      });
      setIsFavourite(true);
    } else {
      await fetch(`${import.meta.env.VITE_API_URL}/favourites`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.sub, teamId }),
      });
      setIsFavourite(false);
    }
  };

  return isFavourite ? (
    <MdFavorite
      size={42}
      className="hover:scale-120 hover:-translate-y-1 transition-transform duration-200 text-red-500"
      onClick={onClick}
    />
  ) : (
    <MdFavoriteBorder
      size={42}
      className="hover:scale-120 hover:-translate-y-1 transition-transform duration-200"
      onClick={onClick}
    />
  );
};

export default FavouriteButton;
