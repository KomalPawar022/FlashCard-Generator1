import { Link } from "react-router-dom";
import { useState } from "react";
// import { MdNightlight } from "react-icons/md";
// import NightMode from "../night-mode";
// import Switch from "react-switch";

export default function Tabs() {
  const [selected, setSelected] = useState(1);
  // const [theme, setTheme] = NightMode("theme", "dark");

  // function handleNightModeChange() {
  //   setTheme(theme === "light" ? "dark" : "light");
  //   console.log(theme);
  // }
  return (
    <div className="w-full">
      {/* <div className="float-right mr-5 mt-5 flex flex-row">
        {" "}
        <MdNightlight className="w-[30px] h-[30px]" />
        <Switch onChange={() => handleNightModeChange()} />
      </div> */}
      <div className="w-full">
        <nav className="flex items-left h-20 max-w-6xl w-full">
          <Link to="/">
            <div className="ml-5 flex flex-row w-full">
              <h1 className="mt-5 ml-1 font-bold text-xl sm:text-2xl md:text-3xl cursor-pointer tracking-wide inline-block">
                Create FlashCard
              </h1>
            </div>
          </Link>
        </nav>
      </div>
      <div>
        <nav className="flex items-left h-20 max-w-6xl ml-1">
          <ul className=" flex list-none items-center space-x-6 text-gray-800 font-semibold">
            <Link to="/">
              <li
                className={
                  selected === 1
                    ? "cursor-pointer text-lime-600 font-bold text-xl"
                    : "cursor-pointer"
                }
                onClick={() => setSelected(1)}
              >
                Create New Flashcards
              </li>
            </Link>
            <Link to="/my-flashcards">
              <li
                className={
                  selected === 2
                    ? "cursor-pointer text-lime-600 font-bold text-xl"
                    : "cursor-pointer"
                }
                onClick={() => setSelected(2)}
              >
                My Flashcards
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}
