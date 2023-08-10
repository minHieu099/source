import { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Routing from "../Routing";
import Sidebar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";
import exportDefault from "../../redux/actions/ThemeActions.js";
import "./layout.css";
import ScrollToTop from "../scroll-to-top/ScrollToTop";

const Layout = () => {
  const ThemeReducer = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode");
    const colorClass = localStorage.getItem("colorMode");
    dispatch(exportDefault.setMode(themeClass));
    dispatch(exportDefault.setColor(colorClass));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className={`layout ${ThemeReducer.mode} ${ThemeReducer.color}`}>
            <ScrollToTop />
            <Sidebar {...props} />
            <div className="layout__content">
              <TopNav />
              <div className="layout__content-main">
                <Routing />
              </div>
            </div>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
