//To navigate between pages
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Tabs() {
  const [selected, setSelected] = useState(1); //For Styling

  return (
    <div className="w-full">
      <div className="w-full">
        <nav className="flex items-left h-20 max-w-6xl w-full">
          {/* ---Create FlashCard will also open home page that is 'Create New Flashcards'----- */}
          <Link to="/">
            <div className="ml-5 flex flex-row w-full">
              <div className="flex flex-col w-auto">
                <h1 className="mt-5 ml-1 font-bold text-xl sm:text-2xl md:text-3xl cursor-pointer tracking-wide inline-block">
                  Create FlashCard
                </h1>
                <h5 className="italic font-mono font-bold ml-2">
                  Click, Create, Conquer...
                </h5>
              </div>
            </div>
          </Link>
        </nav>
      </div>
      <div>
        <nav className="flex items-left h-20 max-w-6xl ml-5">
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
