import { Routes, Route } from "react-router-dom";
import TeamsPage from "./pages/TeamsPage";
import ClubPage from "./pages/ClubPage";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { StandingsProvider } from "./context/StandingsContext";
import { NewsProvider } from "./context/NewsContext";

function App() {
  return (
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
  );
}

export default App;
