export default function CardTile({ group, description }) {
  return (
    <>
      <div className="flex items-center p-5 justify-between border border-lime-300 mt-2 mb-2 rounded-xl">
        <div className="flex p-3">
          <h1>{group}</h1>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}
