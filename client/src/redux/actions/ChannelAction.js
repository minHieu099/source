import axios from "axios";
import URL from "../Url";

// GET ALL Channel FROM DB
export const getListChannel = () => async (dispatch) => {
  try {
    dispatch({ type: "CHANNEL_LIST_REQUEST" });
    const response_channel = await axios.get(`${URL}/api/channels/all`);
    const response_by_channel = await axios.get(`${URL}/api/videos/by-channel`);
    const data_channel = response_channel["data"];
    const data_by_channel = response_by_channel["data"];
    dispatch({
      type: "CHANNEL_LIST_SUCCESS",
      payload1: data_channel,
      payload2: data_by_channel,
    });
  } catch (error) {
    
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: "CHANNEL_LIST_FAIL",
      payload: message,
    });
  }
};

// Get video by channel 
export const getChannelDetail = (channelid) => async (dispatch) => {
    try {
      dispatch({ type: "CHANNEL_DETAILS_REQUEST" });

      const { data } = await axios.get(`${URL}/api/channels/${channelid}`);

      dispatch({ type: "CHANNEL_DETAILS_SUCCESS", payload: data });
    } catch (error) {

      dispatch({
        type: "CHANNEL_DETAILS_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  // CREATE CHANNEL

  export const createChannel = (channelId) => async (dispatch) => {
    try {
      dispatch({ type: "CHANNEL_CREATE_REQUEST" });
      const { data } = await axios.post(`${URL}/api/channels/`, { channelValue: channelId });
      dispatch({ type: "CHANNEL_CREATE_SUCCESS", payload: data });
    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      dispatch({
        type: "CHANNEL_CREATE_FAIL",
        payload: message,
      });
    }
  };
  