import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Badge from "../components/badge/Badge";
import CardNote from "../components/card-note/CardNote";

//  Get list video
import { useDispatch, useSelector } from "react-redux";
import { toggleFollow, getVideoDetails } from "../redux/actions/VideoAction";

//  Loading/error
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";

import "./Pages.css";

const ContentInfo = () => {
  const { videoid } = useParams();

  const dispatch = useDispatch();

  const videoDetail = useSelector((state) => state.videoDetails);

  const { loading, video, error } = videoDetail;

  const [isDetected, setIsDetected] = useState(false);

  const handleToggleFollow = () => {

    dispatch(toggleFollow(video._id, !video.vd_followed));
  };

  useEffect(() => {
    dispatch(getVideoDetails(videoid));
  }, [videoid, dispatch]);

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
          <p className="section__header page-header">Video Details</p>
          <div className="col-12">
            <div className="card row video-details__card">
              <div className="card__body card__body-p">
                <p className="text-bold">
                  Title:{" "}
                  <span className="text-bold tag-span">{video.vd_title}</span>
                </p>
                <p className="text-bold">
                  Channel:{" "}
                  <span className="text-bold tag-span">{video.vd_channel}</span>
                </p>
                <p className="text-bold">
                  Published Date:{" "}
                  <span className="text-bold tag-span">
                    {video.vd_publishAt}
                  </span>
                </p>
                <div className="badge-div">
                  <p className=" text-bold badge-line">Type: </p>
                  <Badge
                    className="text-bold"
                    type={
                      video.vd_label === 0
                        ? "primary"
                        : video.vd_label === 1
                        ? "success"
                        : "danger"
                    }
                    clickable={"none"}
                    content={
                      video.vd_label === 2
                        ? "Tiêu cực"
                        : video.vd_label === 1
                        ? "Tích cực"
                        : "Trung tính"
                    }
                  />
                </div>
                <p className="text-bold">
                  Reactive Number:{" "}
                  <span className="text-bold tag-span">
                    <a href={video.vd_link}>
                      {video.vd_react + video.vd_comment}
                    </a>
                  </span>
                </p>
                <div className="badge-div mb-1">
                  <p className="badge-line text-bold">Tags: </p>
                  <Badge
                    className="text-bold mr-0-5"
                    type={"primary"}
                    content={video.vd_tag}
                  />
                </div>
                <div className="row gap-20">
                  {video.vd_followed === 0 ? (
                    <button
                      className="btn btn-view btn-gotovideo"
                      onClick={() => {
                        handleToggleFollow();
                      }}
                    >
                      <i className="bx bx-user-check mr-0-5"></i>
                      Follow
                    </button>
                  ) : (
                    <button
                      className="btn btn-delete btn-gotovideo"
                      onClick={() => {
                        handleToggleFollow();
                      }}
                    >
                      <i className="bx bx-user-x mr-0-5"></i>
                      Unfollow
                    </button>
                  )}
                  <a href={video.vd_link} target="_blank" rel="noreferrer">
                    <button className="btn btn-view btn-gotovideo">
                      <i className="bx bx-fast-forward"></i>
                      Go to Video
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="card__header">
              <p>Embed Video</p>
            </div>
            <div className="card row flex-center">
              <div className="card__body">
                <iframe
                  width="942"
                  height="530"
                  src={video.vd_embedlink}
                  title={video.vd_title}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div className="card__header justify-div">
              <p>Information Extraction</p>
              {!isDetected ? (
                <button
                  className="btn btn-view btn-gotovideo mb-1"
                  onClick={() => {
                    setIsDetected(!isDetected);
                  }}
                >
                  <i className="bx bx-transfer mr-0-5"></i>
                  Dectect Objects
                </button>
              ) : (
                <button
                  className="btn btn-delete btn-gotovideo mb-1"
                  onClick={() => {
                    setIsDetected(!isDetected);
                  }}
                >
                  <i className="bx bx-transfer mr-0-5"></i>
                  Plain Text
                </button>
              )}
            </div>
            <div className="card row">
              <div className="card__body">
                {isDetected ? <CardNote /> : null}
                <p
                  className="text-content"
                  dangerouslySetInnerHTML={{
                    __html: isDetected ? video.vd_highlight : video.vd_content,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentInfo;
