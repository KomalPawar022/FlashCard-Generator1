import GroupTile from "../components/group-tile";
import { useSelector } from "react-redux";

export default function MyFlashcards() {
  const { cardGroup } = useSelector((state) => state);
  return (
    <div>
      {cardGroup && cardGroup.length ? (
        <div className="min-h-[80vh] grid sm:grid-cols-2  lg:grid-cols-3 max-w-6xl mx-auto p-3">
          {cardGroup.map((item) => (
            <GroupTile
              group={item.group}
              description={item.description}
              noOfCards={item.noOfCards}
            />
          ))}
        </div>
      ) : (
        <h1>No Groups</h1>
      )}
    </div>
  );
}
