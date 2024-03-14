import { Link } from "react-router-dom";
export default function GroupTile({ group, description, noOfCards, groupImg }) {
  return (
    <>
      <div className="group flex flex-col justify-center items-center border-2 border-lime-300 gap-1 p-4 h-[360px] mt-10 ml-5 rounded-xl">
        <div className="rounded-full border border-lime-600 h-[100px] w-[100px] mt-3">
          {groupImg ? (
            <img
              src={URL.createObjectURL(groupImg)}
              className="w-[99px] h-[99px] rounded-full"
            />
          ) : null}
        </div>
        <div className="flex p-1">
          <h1 className="font-bold text-2xl">{group}</h1>
        </div>
        <div className="flex p-1 flex-col space-y-1 justify-center items-center">
          <p className="w-full h-[80px] text-center">{description}</p>
          <p>
            {noOfCards} {noOfCards === 1 ? "Card" : "Cards"}
          </p>
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
