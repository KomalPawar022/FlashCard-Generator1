import { Link } from "react-router-dom";
export default function GroupTile({ group, description }) {
  return (
    <>
      <div className="group flex flex-col justify-center items-center border-2 border-lime-300 gap-3 p-4 h-[360px] mt-10 ml-5 rounded-xl">
        <div className="flex p-3">
          <h1 className="font-bold text-2xl">{group}</h1>
        </div>
        <div className="flex p-3 ">
          <p>{description}</p>
        </div>
        <div className="flex p-3">
          <button className="border border-lime-600 rounded-lg w-[15vw] h-[40px] text-lime-600">
            <Link to={`/view-card/:${group}`}>View Cards</Link>
          </button>
        </div>
      </div>
    </>
  );
}
