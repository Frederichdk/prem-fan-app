import { Routes, Route } from "react-router-dom";
import TeamsPage from "./pages/TeamsPage";
import ClubPage from "./pages/ClubPage";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
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
  );
}

export default App;
