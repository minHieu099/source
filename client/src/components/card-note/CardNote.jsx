import CardNoteItem from "./CardNoteItem";

import "./cardnote.css";

const CardNote = () => {
  return (
    <div className="row justify-div">
      <CardNoteItem backgroundColor={"#ff0000"} define={"Objects"} />
      <CardNoteItem backgroundColor={"#007924"} define={"Locations"} />
      <CardNoteItem backgroundColor={"#2f00ff"} define={"Activities"} />
      <CardNoteItem backgroundColor={"#522500"} define={"Organizations"} />
      <CardNoteItem backgroundColor={"#da6900"} define={"Numbers"} />
    </div>
  );
};

export default CardNote;
