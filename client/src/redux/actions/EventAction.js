import axios from "axios";
import URL from "../Url";

export const getListStream = () => async (dispatch) => {
  try {
    dispatch({ type: "STREAM_LIST_REQUEST" });

    const { data } = await axios.get(`${URL}/api/videos/followed`);
    dispatch({ type: "STREAM_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: "STREAM_LIST_FAIL",
      payload: message,
    });
  }
};
