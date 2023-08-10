import { useHistory } from "react-router-dom";
import "./statuscard.css";

const StatusCard = (props) => {
  const history = useHistory();

  const viewDetails = (id) => history.push("/source/" + id);

  return (
    <div className="status-card" onClick={() => viewDetails(props.id)}>
      <div className="row pr-0-5">
        <div className="status-card_icon">
          <i className="bx bxl-youtube"></i>
        </div>
        <div className="status-card_title cut-text">
          <p>{props.title}</p>
        </div>
      </div>
      <div className="row">
        <div className="status-card_info">
          <div className="justify-div">
            <p className="mb-0-5">Scanned videos:</p>
            <span>{props.count}</span>
          </div>
          <div className="justify-div">
            <p className="mb-0-5">Last 7 days:</p>
            <span>{props.new}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
