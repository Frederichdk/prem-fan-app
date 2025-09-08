import { useAuth0 } from "@auth0/auth0-react";
const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();

  if (isLoading) return null;
  return isAuthenticated ? (
    <div className="flex justify-end">
      {/* <img
        src={user?.picture}
        alt="Profile photo"
        className="rounded-full h-7 w-7"
      /> */}
      <button
        className="text-center rounded-2xl bg-gray-300 px-3 py-1 hover:scale-110 hover:shadow-lg transition-transform duration-2s"
        onClick={() => logout()}
      >
        Log Out
      </button>
    </div>
  ) : (
    <div className="flex justify-end pr-8">
      <button
        className="text-center rounded-2xl bg-gray-300 px-3 py-1 hover:scale-110 hover:shadow-lg transition-transform duration-2s"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    </div>
  );
};

export default AuthButtons;
