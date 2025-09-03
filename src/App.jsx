import { Routes, Route } from "react-router-dom";
import TeamsPage from "./pages/TeamsPage";
import ClubPage from "./pages/ClubPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TeamsPage />} />
      <Route path="/club/:id" element={<ClubPage />} />
    </Routes>
  );
}

export default App;
