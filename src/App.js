import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Tabs from "./components/tabs";
import CreateFlashcards from "./pages/create-new";
import MyFlashcards from "./pages/my-flashcards";

export default function App() {
  return (
    <div>
      <Tabs />
      <Routes>
        <Route path="/" element={<CreateFlashcards />} />
        <Route path="/my-flashcards" element={<MyFlashcards />} />
      </Routes>
    </div>
  );
}
