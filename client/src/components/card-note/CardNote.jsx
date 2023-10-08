import CardNoteItem from "./CardNoteItem";

import "./cardnote.css";

const CardNote = () => {
  return (
    <div className="row justify-div">
      <CardNoteItem backgroundColor={"#ff0000"} define={"Đối tượng"} />
      <CardNoteItem backgroundColor={"#007924"} define={"Vị trí"} />
      <CardNoteItem backgroundColor={"#2f00ff"} define={"Hành động"} />
      <CardNoteItem backgroundColor={"#522500"} define={"Tổ chức"} />
      <CardNoteItem backgroundColor={"#da6900"} define={"Con số"} />
    </div>
  );
};

export default CardNote;
