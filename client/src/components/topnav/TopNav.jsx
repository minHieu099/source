import { Link } from "react-router-dom";

import Dropdown from "../dropdown/Dropdown";
import ThemeMenu from "../thememenu/ThemeMenu";

import user_image from "../../assets/images/hieu.jpg";
import user_menu from "../../assets/JsonData/user_menus.json";
import notifications from "../../assets/JsonData/notification.json";
import "./topnav.css";

const curr_user = {
  display_name: "Trinh sát viên",
  image: user_image,
};

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img alt="User avatar" src={user.image} />
    </div>
    <div className="topnav__right-user__name">{user.display_name}</div>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link to="/" key={index}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
);

const renderNotificationItem = (item, index) => {
  return (
    <div className="notification-item" key={index}>
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  );
};

const TopNav = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="topnav">
      <button className="btn btn-add" onClick={refreshPage}>
        <i className="bx bx-refresh mr-0-5"></i>Làm mới
      </button>
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
          // contentData={notifications}
          // renderItems={(item, index) => renderNotificationItem(item, index)}
          // renderFooter={() => <Link to="/">View All</Link>}
          />
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
