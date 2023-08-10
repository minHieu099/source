import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./contentcard.css";

const ContentCard = (props) => {
  const history = useHistory();

  const viewContentDetails = (item) => history.push("/video/" + props.id);

  const cardBorder = `3px solid ${(props.type === 2) ? "#FF4560" : ((props.type === 1) ? "#00E396" : "#008FFB")}`

  return (
    <div className="content-card" style={{ border: cardBorder }}>
      <div className="row" style={{ flexWrap: "nowrap", whiteSpace: "nowrap", lineHeight: "48px" }}>
        <div className="content-card_icon">
          <i className={"bx bxl-youtube"}></i>
        </div>
        <div className="content-card_type">
          <p>{props.channel}</p>
        </div>
      </div>
      <div className="row fixed_video_card" style={{ padding: "10px 0px 20px" }}>
        <div className="content-card_content">
          <p>{props.title}</p>
        </div>
      </div>
      <div className="row justify-div">
        <a href={props.url} target="_blank" rel="noreferrer">
          <button className="content-card_button" type="button">
            Link
          </button>
        </a>
        <button className="content-card_button" onClick={viewContentDetails}>
          <p className="mb-0-5"></p>
          <i className="bx bx-search-alt mr-0-5"></i>
          <span>Details
            <Link to={`/videos/${props._id}`}>
            </Link>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ContentCard;
