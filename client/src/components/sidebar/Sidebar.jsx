import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import sidebar_items from "../../assets/JsonData/sidebar_routes.json";

import "./sidebar.css";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";
  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const tagid = window.location.pathname.split("/tag/")[1];

  const sourceid = window.location.pathname.split("/source/")[1];

  const videoid = window.location.pathname.split("/video/")[1];

  const locationPath = useLocation();

  const handleLocation = () => {
    switch (window.location.pathname) {
      case "/tag":
        return "/tag";
      case "/source":
        return "/source";
      case "/tag/" + tagid:
        return "/tag";
      case "/source/" + sourceid:
        return "/source";
      case "/video/" + videoid:
        return "/video";
      case "/video":
        return "/video";
      case "/stream":
        return "/stream";
      case "/settings":
        return "/settings";
      default:
        return "/";
    }
  };

  const activeItem = sidebar_items.findIndex(
    (item) => item.route === handleLocation()
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <div id="logo-img" className="light-logo"></div>
      </div>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
