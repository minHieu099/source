import axios from "axios";
import URL from "../Url";

// GET ALL LIST VIDEO
export const getListVideo = (params) => async (dispatch) => {
  try {

    dispatch({ type: "VIDEO_LIST_REQUEST" });

    let query = "";
    if (params?.keyword) {
      query += `keyword=${params.keyword}`;
    }
    if (params?.label) {
      query += query.length
        ? `&label=${params.label}`
        : `label=${params.label}`;
    }
    if (params?.react) {
      query += query.length
        ? `&react=${params.react}`
        : `react=${params.react}`;
    }

    const { data } = await axios.get(`${URL}/api/videos/all?${query}`);

    dispatch({ type: "VIDEO_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: "VIDEO_LIST_FAIL",
      payload: message,
    });
  }
};

// GET SINGLE VIDEO
export const getVideoDetails = (id) => async (dispatch) => {
  try {

    dispatch({ type: "VIDEO_DETAILS_REQUEST" });
    const { data } = await axios.get(`${URL}/api/videos/${id}`);

    dispatch({ type: "VIDEO_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "VIDEO_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Toggle isFollowed attribute of video
export const toggleFollow = (id, isFollowed) => async (dispatch) => {
  try {
    dispatch({ type: "VIDEO_DETAILS_REQUEST" });
    const { data } = await axios.post(`${URL}/api/videos/${id}`, {
      vd_followed: isFollowed,
    });
    dispatch({ type: "VIDEO_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "VIDEO_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get top negative videos
export const getTopNegVideo = () => async (dispatch) => {
  try {
    dispatch({ type: "VIDEO_LIST_REQUEST" });
    const { data } = await axios.get(`${URL}/api/videos/top-neg`);

    dispatch({ type: "VIDEO_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message = "Có lỗi khi load dashboard";
    dispatch({
      type: "VIDEO_LIST_FAIL",
      payload: message,
    });
  }
};
