import { useState, useEffect, useCallback } from "react";

import VideoGrid from "../components/videogrid/VideoGrid";
import Search from "../components/search/Search";
import { Select } from "antd";

import "./Pages.css";
import "antd/dist/antd.css";

// Get list video
import { useDispatch, useSelector } from "react-redux";
import { getListVideo } from "../redux/actions/VideoAction";

// Xu ly state Loading/error
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";

const { Option } = Select;

const handleChange = (value) => {

};

const Contents = () => {
  const [searchKey, setSearchKey] = useState("");

  const [option, setOption] = useState("");

  const [params, setParams] = useState({});

  const dispatch = useDispatch();

  const videoList = useSelector((state) => state.videoList);

  const { loading, videos, error } = videoList;

  useEffect(() => {
    dispatch(getListVideo());
  }, [dispatch]);

  const handleSearchVideo = useCallback(() => {
    let params = {};
    if (searchKey !== "") {
      params = { ...params, keyword: searchKey };
    }
    if (option === "negative") {
      params = { label: 2, ...params };
    } else if (option === "high_interaction") {
      params = { react: true, ...params };
    }

    dispatch(getListVideo(params));
  }, [dispatch, searchKey, option]);

  const handleChangeOption = (value) => {
    setOption(value);
  };
  return (
    <>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : error ? (
        <Message variant={"alert-warning"}>{error}</Message>
      ) : (
        <div>
          <div className="mb-36 justify-div align-center">
            <Search
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder={"Search Here ..."}
              handleEvent={handleSearchVideo}
            />
            {videos.length > 0 && (
              <p style={{ margin: 10, fontWeight: 600 }}>
                Tìm thấy {videos.length} video.
              </p>
            )}
            <Select
              className="selectFilter"
              defaultValue="All videos"
              onChange={handleChangeOption}
              dropdownStyle={{ fontSize: 16, padding: 0 }}
            >
              <Option value="default" className="option-padding">
                All Videos
              </Option>
              <Option value="negative" className="option-padding">
                Tin tiêu cực
              </Option>
              <Option value="high_interaction" className="option-padding">
                Tương tác nhiều
              </Option>
            </Select>
          </div>
          <div>
            <VideoGrid limit={8} videos={videos} />
          </div>
        </div>
      )}
    </>
  );
};

export default Contents;
