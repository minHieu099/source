import axios from "axios";
import URL from "../Url";

// GET ALL TAG FROM DB
export const getListData = () => async (dispatch) => {
  try {
    dispatch({ type: "DASHBOARD_REQUEST" });
    const {data} = await axios.get(`${URL}/api/dashboard`);

    dispatch({
      type: "DASHBOARD_SUCCESS",
      payload:data
    });
  } catch (error) {

    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: "DASHBOARD_FAIL",
      payload: message,
    });
  }
};
