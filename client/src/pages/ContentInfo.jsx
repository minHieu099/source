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

// Component hiển thị một bình luận
function Comment(props) {
  return (
    <div className="comment">
      <img src={props.authorProfileImageUrl} alt={`${props.authorDisplayName}'s avatar`} className="avatar" />
      <div className="comment-content">
        <div className="comment-username">{props.authorDisplayName}</div>
        <div className="comment-publishedat">{props.publishedAt.slice(0, 10)}</div>
        <div className="comment-text"><p dangerouslySetInnerHTML={{ __html: props.textDisplay }} /></div>
      </div>
    </div>
  );
}

const ContentInfo = () => {
  const { videoid } = useParams();

  const dispatch = useDispatch();

  const videoDetail = useSelector((state) => state.videoDetails);

  const { loading, video, error } = videoDetail;

  const [selection, setSelection] = useState('0');

  const handleToggleFollow = () => {

    dispatch(toggleFollow(video._id, !video.vd_followed));
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelection(selectedValue);
  }

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
            <div className="card video-details__card">
              <div className="card__body card__body-p">
                <p className="text-bold">
                  Tiêu đề:{" "}
                  <span className="text-bold tag-span">{video.vd_title}</span>
                </p>
                <p className="text-bold">
                  Kênh:{" "}
                  <span className="text-bold tag-span">{video.vd_channel}</span>
                </p>
                <p className="text-bold">
                  Thời gian phát hành :{" "}
                  <span className="text-bold tag-span">
                    {video.vd_publishAt}
                  </span>
                </p>
                <div className="badge-div">
                  <p className=" text-bold badge-line">Loại: </p>
                  <Badge
                    className="text-bold"
                    type={
                      video.vd_label === 2
                        ? "primary"
                        : video.vd_label === 1
                          ? "success"
                          : "danger"
                    }
                    clickable={"none"}
                    content={
                      video.vd_label === 0
                        ? "Tiêu cực"
                        : video.vd_label === 1
                          ? "Tích cực"
                          : "Trung tính"
                    }
                  />
                </div>
                <p className="text-bold">
                  Lượt tương tác:{" "}
                  <span className="text-bold tag-span">
                    <a href={video.vd_link}>
                      {video.vd_react + video.vd_comment}
                    </a>
                  </span>
                </p>
                <div className="badge-div mb-1">
                  <p className="badge-line text-bold">Chủ đề theo dõi: </p>
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
                      Theo dõi
                    </button>
                  ) : (
                    <button
                      className="btn btn-delete btn-gotovideo"
                      onClick={() => {
                        handleToggleFollow();
                      }}
                    >
                      <i className="bx bx-user-x mr-0-5"></i>
                      Bỏ theo dõi
                    </button>
                  )}
                  <a href={video.vd_link} target="_blank" rel="noreferrer">
                    <button className="btn btn-view btn-gotovideo">
                      <i className="bx bx-fast-forward"></i>
                      Chuyển hướng đến Youtube
                    </button>
                  </a>
                </div>
              </div>
            </div>
            {video.vd_followed === 1 && <div className="card video-details__card">
              <div className="card__body card__body-p">
                <p className="text-bold">
                  Điều hướng liên quan:
                </p>
                {video.vd_links && video.vd_links.length > 0 ? (
                  video.vd_links.map((link, index) => (
                    <a href={link}><p>{link}</p></a>
                  ))
                ) : (
                  <p>Chưa có thông tin</p>
                )}
                {video.vd_hashtags && video.vd_hashtags.length > 0 && (
                  <p className="text-bold">
                    Hashtags:
                  </p>
                )}
                {video.vd_hashtags && video.vd_hashtags.length > 0 &&
                  video.vd_hashtags.map((hashtag, index) => (
                    <span>{hashtag} </span>
                  ))
                }
              </div>
            </div>}
            <div className="card__header">
              <p>Video</p>
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
            <div className="card__header justify-div" style={{ alignItems: 'baseline' }}>
              <p>Thông tin video</p>
              <select value={selection} onChange={handleChange}>
                <option value='0'>Nội dung</option>
                <option value='1'>Xem nhanh</option>
                <option value='2'>Trích xuất thông tin</option>
              </select>

            </div>
            <div className="card row">
              <div className="card__body">
                {selection === '2' && <CardNote />}
                <p
                  className="text-content"
                  dangerouslySetInnerHTML={{
                    __html: selection === '2' ? video.vd_highlight : video.vd_content,
                  }}
                ></p>
              </div>
            </div>
            {video.vd_followed === 1 &&
              <div>
                <div className="card__header">
                  <p>Các bình luận</p>
                </div>
                <div className="card row">
                  <div className="card__body">
                    <div className="comment-list">
                      {video.vd_comments && video.vd_comments.length > 0 ? (
                        video.vd_comments.map((comment, index) => (
                          <Comment key={index} {...comment} />
                        ))
                      ) : (
                        <p>Chưa có thông tin</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
};

export default ContentInfo;
