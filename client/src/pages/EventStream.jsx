import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import VideoGrid from "../components/videogrid/VideoGrid";
import Search from "../components/search/Search";

// import tagList from "../assets/JsonData/tag-data.json";

import "./Pages.css";
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";

// Redux
import { getListStream } from "../redux/actions/EventAction";

import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";

const EventStream = () => {
  const [items, setItems] = useState({});

  const dispatch = useDispatch();

  const streamListState = useSelector((state) => state.streamList);

  const { loading, videos, error } = streamListState;

  const videosByTag = {};

  videos.forEach((video) => {
    const tag = video.vd_tag;
    if (!videosByTag[tag]) {
      videosByTag[tag] = [];
    }
    videosByTag[tag].push(video);
  });

  useEffect(() => {
    dispatch(getListStream());
  }, [dispatch]);

  const history = useHistory();

  const viewDetails = (id) => history.push("/tag/" + id);

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
          {Object.keys(videosByTag).length > 0 ? (
            Object.keys(videosByTag).map((tag) => (
              <div key={tag}>
                <div className="tag-btn__line">
                  <button
                    className="btn btn-add"
                    onClick={() => {
                      alert("Tính năng đang xây dựng")
                    }}
                  >
                    <i className="bx bx-fast-forward"></i>
                    {tag}
                  </button>
                </div>
                <VideoGrid videos={videosByTag[tag]} limit={4} />
              </div>
            ))
          ) : (
            <div>Không có dữ liệu</div>
          )}
        </div>
      )}
    </>
  );
};

export default EventStream;
