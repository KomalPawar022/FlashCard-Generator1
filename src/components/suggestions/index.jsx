export default function Suggestions({ groupNameList, handleClick }) {
  return (
    <ul>
      {groupNameList && groupNameList.length
        ? groupNameList.map((item, index) => (
            <li onClick={handleClick} key={index}>
              {item}
            </li>
          ))
        : null}
    </ul>
  );
}
