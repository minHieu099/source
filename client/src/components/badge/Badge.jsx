import { useHistory } from "react-router-dom";

import './badge.css'

const Badge = (props) => {
  const history = useHistory();
  const handleClickBadge = (item) => history.push('/taginfo');
  return (
    <span className={`badge badge-${props.type} ${props.className}`} onClick={handleClickBadge} style={props.clickable === "none" ? {pointerEvents: "none", fontSize: "16px"} : {fontSize: "16px"} }>
      {props.content}
    </span>
  )
}

export default Badge