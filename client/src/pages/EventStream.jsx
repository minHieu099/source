import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import VideoGrid from "../components/videogrid/VideoGrid";

import "./Pages.css";
import "antd/dist/antd.css";

// Redux
import { getListStream } from "../redux/actions/EventAction";

import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";
import tutorialImage from '../assets/images/tutorial.png';
import playImage from '../assets/images/play.png';
import minusImage from '../assets/images/minus.png';
import likeImage from '../assets/images/like.png';
import shuffleImage from '../assets/images/shuffle.png';
import commentImage from '../assets/images/comment.png';
import badReviewImage from '../assets/images/bad-review.png';
import shareImage from '../assets/images/share-2.png';


const EventStream = () => {

  const dispatch = useDispatch();

  const streamListState = useSelector((state) => state.streamList);

  const { loading, videos: videoStreams, error } = streamListState;


  useEffect(() => {
    dispatch(getListStream());
  }, [dispatch]);

  return (
    <>
      {console.log(videoStreams)}
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : error ? (
        <Message variant={"alert-warning"}>{error}</Message>
      ) : videoStreams[0] ? (
        <div>
          <div className="row stretch__item justify-div">
            <p className="section__header"></p>
            <p style={{ margin: 10, fontWeight: 600, color: '#70757a' }}>
              Dữ liệu lấy từ 01/03/2023 đến 30/09/2023
            </p>
          </div>
          <div className="row" style={{ alignItems: 'start' }}>
            <div className="col-9 col-md-12">
              {videoStreams[0].videos.length > 0 ? (
                <VideoGrid videos={videoStreams[0].videos} limit={3} />
              ) : (
                <div>Không có dữ liệu</div>
              )}
            </div>
            <div className="col-3 col-md-12">
              <div className="card" style={{ padding: '0' }}>
                {console.log(videoStreams[0].videos)}
                <div class="analysis-stats" id="stats">
                  <div class="analysis-stats-section">
                    <img src={tutorialImage} />
                    <div class="analysis-stats-result" >{videoStreams[0].channels}</div>
                    <div class="analysis-stats-title">Tổng số kênh</div>
                  </div>
                  <div class="analysis-stats-section">
                    <img src={playImage} />
                    <div class="analysis-stats-result" >{videoStreams[0].totalVideos}</div>
                    <div class="analysis-stats-title">Số video</div>
                  </div>
                  <div class="analysis-stats-section">
                    <img src={minusImage} />
                    <div class="analysis-stats-result stat_pos" >{videoStreams[0].negativeVideos}</div>
                    <div class="analysis-stats-title">Số video tiêu cực</div>
                  </div>
                  <div class="analysis-stats-section">
                    <img src={shareImage} />
                    <div class="analysis-stats-result" >{videoStreams[0].recentVideos}</div>
                    <div class="analysis-stats-title">Số video gần đây</div>
                  </div>
                  <div class="analysis-stats-section">
                    <img src={likeImage} />
                    <div class="analysis-stats-result" >{videoStreams[0].totalReacts}</div>
                    <div class="analysis-stats-title">Lượng tương tác</div>
                  </div>
                  <div class="analysis-stats-section">
                    <img src={shuffleImage} />
                    <div class="analysis-stats-result">{videoStreams[0].shares}</div>
                    <div class="analysis-stats-title">Lượng chia sẻ</div>
                  </div>
                  <div class="analysis-stats-section">
                    <img src={commentImage} />
                    <div class="analysis-stats-result" >{videoStreams[0].totalComments}</div>
                    <div class="analysis-stats-title">Lượng bình luận</div>
                  </div>
                  <div class="analysis-stats-section">
                    <img src={badReviewImage} />
                    <div class="analysis-stats-result stat_neg" >{videoStreams[0].negativeComments}</div>
                    <div class="analysis-stats-title">Bình luận tiêu cực</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (<p>Không có dữ liệu</p>)
      }
    </>
  );
};

export default EventStream;
