import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Tabs from "./components/tabs";
import CreateFlashcards from "./pages/create-new";
import MyFlashcards from "./pages/my-flashcards";
import ViewCard from "./pages/view-card";

export default function App() {
  return (
    <div>
      <Tabs />

      <Routes>
        <Route path="/" element={<CreateFlashcards />} />
        <Route path="/my-flashcards" element={<MyFlashcards />} />
        <Route path="/view-card/:group" element={<ViewCard />} />
      </Routes>
    </div>
  );
}
