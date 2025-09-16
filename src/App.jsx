import { Routes, Route } from "react-router-dom";
import TeamsPage from "./pages/TeamsPage";
import ClubPage from "./pages/ClubPage";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { StandingsProvider } from "./context/StandingsContext";
import { NewsProvider } from "./context/NewsContext";
import { GamesProvider } from "./context/GamesContext";

function App() {
  return (
    <GamesProvider>
      <NewsProvider>
        <StandingsProvider>
          <Routes>
            <Route path="/" element={<TeamsPage />} />
            <Route
              path="/club/:id"
              element={
                <ProtectedRoute>
                  <ClubPage />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </StandingsProvider>
      </NewsProvider>
    </GamesProvider>
  );
}

export default App;
