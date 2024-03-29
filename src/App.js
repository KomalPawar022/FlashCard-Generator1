import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Tabs from "./components/tabs";
import CreateFlashcards from "./pages/create-new";
import MyFlashcards from "./pages/my-flashcards";
import ViewCard from "./pages/view-card";
import { MdNightlight } from "react-icons/md";
import NightMode from "./components/night-mode";
import Switch from "react-switch";
import { useState, useEffect } from "react";

export default function App() {
  const [checked, setChecked] = useState(false);
  const [theme, setTheme] = NightMode("light");

  useEffect(() => {
    //Because even after refreshing the page it will remember the theme
    if (theme === "light") setChecked(false);
    else setChecked(true);
  }, []);

  function handleNightModeChange() {
    setTheme(theme === "light" ? "dark" : "light");
    setChecked(!checked);
  }

  return (
    <div data-theme={theme} className="light-dark-mode">
      <div className="flex flex-row">
        <Tabs />
        <div className="float-right mr-5 mt-5 flex flex-row ">
          {" "}
          <MdNightlight className="w-[30px] h-[30px]" />
          <Switch onChange={() => handleNightModeChange()} checked={checked} />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<CreateFlashcards />} />
        <Route path="/my-flashcards" element={<MyFlashcards />} />
        <Route path="/view-card/:group" element={<ViewCard />} />
      </Routes>
    </div>
  );
}
