import { Link } from "react-router-dom";

export default function Tabs() {
  return (
    <div>
      <div>
        <nav className="flex items-left h-20 max-w-6xl">
          <Link to="/">
            <div className="ml-5">
              <h1 className="mt-5 ml-1 font-bold text-xl sm:text-2xl md:text-3xl cursor-pointer tracking-wide">
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
              <li className="cursor-pointer">Create New Flashcards</li>
            </Link>
            <Link to="/my-flashcards">
              <li className="cursor-pointer">My Flashcards</li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}
