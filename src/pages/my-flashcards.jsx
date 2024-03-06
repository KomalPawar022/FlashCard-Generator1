import GroupTile from "../components/group-tile";
import { useSelector } from "react-redux";

export default function MyFlashcards() {
  const { group } = useSelector((state) => state);
  return (
    <div>
      {group && group.length ? (
        <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 max-w-6xl mx-auto p-3">
          {group.map((item) => (
            <GroupTile group={item.group} description={item.description} />
          ))}
        </div>
      ) : (
        <h1>No Groups</h1>
      )}
    </div>
  );
}
