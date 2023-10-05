import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";

import Badge from "../components/badge/Badge";
import Table from "../components/table/Table";
import SourceReport from "./SourceReport";

// Redux-action
import { getChannelDetail } from "../redux/actions/ChannelAction";

// loading-err
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";

// import contentList from "../assets/JsonData/content-data.json";
// import sourceList from "../assets/JsonData/source-data.json";
import "./Pages.css";

const contentTableHead = ["#", "Video", "Nội dung", "Loại", "Chi tiết của video"];

const SourceInfo = () => {
  const { channelid } = useParams();

  // Set Video by tag detail
  const dispatch = useDispatch();
  const ThemeReducer = useSelector((state) => state.theme.mode);
  const videoByChannel = useSelector((state) => state.channelDetails)

  const { loading, channelData, error } = videoByChannel
  useEffect(async () => {
    await dispatch(getChannelDetail(channelid))
  }, [channelid, dispatch]);

  const history = useHistory();

  const viewContentDetails = (videoid) => history.push("/video/" + videoid);

  const renderContentHead = (item, index) => <th key={index}>{item}</th>;

  const renderContentBody = (item, index) => (
    <tr key={index}>
      <td>
        {index + 1}
      </td>
      <td>
        <a href={item.vd_link}>{item.vd_link}</a>
      </td>
      <td style={{ width: "50%" }}>
        <div className="td-content">
          <span>{item.vd_content}</span>
        </div>
      </td>
      <td>
        <div className="flex-div">
          <Badge
            className="text-bold"
            type={
              item.vd_label === 2
                ? "danger"
                : item.vd_label === 1
                  ? "success"
                  : "primary"
            }
            clickable={"none"}
            content={
              item.vd_label === 2
                ? "Tiêu cực"
                : item.vd_label === 1
                  ? "Tích cực"
                  : "Trung tính"
            }
          />
        </div>
      </td>
      <td>
        <div className="flex-div">
          <button
            onClick={() => viewContentDetails(item._id)}
            className="btn btn-view"
          >
            <i className="bx bx-search-alt mr-0-5"></i>Details
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : error ? (
        <div>
          <Message variant="alert-danger">{error}</Message>
        </div>
      ) : (
        <div>
          <p className="section__header page-header">
            Quản lý kênh / Kênh{" "}
            <span className="tag-span">{channelData["channel_name"]}</span>
          </p>
          <div className="col-12">
            <div className="justify-div"></div>
            <div className="card row">
              <div className="col-4 col-md-12">
                <div className="card__body card__body-p">
                  <p>
                    Tên kênh:{" "}
                    <span className="text-bold tag-span">
                      {channelData["channel_name"]}
                    </span>
                  </p>
                  <p>
                    Liên kết khả dụng:{" "}
                    <span className="text-bold tag-span">
                      <a href={channelData["channel_link"]}>
                        {channelData["channel_link"]}
                      </a>
                    </span>
                  </p>
                  <p>
                    Video đăng tải:{" "}
                    <span className="text-bold tag-span">
                      {channelData["video_count"]}
                    </span>
                  </p>
                  <p>
                    Video đăng tải ngày gần nhất:{" "}
                    <span className="text-bold tag-span">11</span>
                  </p>
                  <p>
                    Số lượt tương tác trong ngày:{" "}
                    <span className="text-bold tag-span">{50}</span>
                  </p>
                </div>
              </div>
              <div className="col-8 col-md-12">
                <div className="card-chart full-height col-12">
                  {channelData.chartData && (<Chart
                    options={{
                      chart: { type: "line", },
                      xaxis: { categories: channelData.chartData.categories, },
                      title: { text: "Thống kê video theo tháng", },
                      stroke: { curve: 'straight' },
                      colors: ["#43c8ff", "#fb0b12"],
                    }}
                    series={[
                      {
                        name: "Tổng số video",
                        data: channelData.chartData.totalVideos,
                      },
                      {
                        name: "Video tiêu cực",
                        data: channelData.chartData.negativeVideos,
                      },
                    ]}
                    height="300"
                    type="line"
                  />)}
                </div>
              </div>
            </div>
            <div className="card__header">
              <div className="card__container">
                <div className="card__header">
                  <p>Video của kênh</p>
                </div>
                <div className="card__header">
                  <SourceReport channelId={channelid} />
                </div>
              </div>
            </div>
            <div className="card row">
              <div className="col-12">
                <div className="card__body">
                  <Table
                    limit="10"
                    headerData={contentTableHead}
                    bodyData={channelData["videos"] ? channelData["videos"] : []}
                    renderHeader={(item, index) => renderContentHead(item, index)}
                    renderBody={(item, index) => renderContentBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );


};

export default SourceInfo;
