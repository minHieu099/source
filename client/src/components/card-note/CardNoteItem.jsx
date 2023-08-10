import "./cardnote.css";

const CardNoteItem = (props) => {
  return (
    <div className="col-2">
      <div className="row" style={{ paddingBottom: "10px", gap: "10px" }}>
        <div
          className="card__note__item__color"
          style={{ backgroundColor: props.backgroundColor }}
        ></div>
        <div className="card__note__item__define"> {props.define}</div>
      </div>
    </div>
  );
};

export default CardNoteItem;
