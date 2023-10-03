import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MyWordCloud from "../components/wordcloud/MyWordCloud";
import VideoGrid from "../components/videogrid/VideoGrid";
import TagReport from "./TagReport";

// Redux-action
import { getTagDetail } from "../redux/actions/TagAction";
import { getTagReport } from "../redux/actions/TagAction";

// loading-err
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";

import "./Pages.css";

const chartOption2 = {
  series: [
    {
      data: [12, 16, 4, 8, 21, 3, 12, 16, 4, 8, 21, 3],
    },
  ],
  options: {
    chart: {
      type: "area",
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
      ],
    },
    title: {
      text: "Monthly Videos",
    },
    grid: {
      show: false,
    },
  },
};

const chartOption4 = {
  series: [44, 55, 26],
  options: {
    chart: {
      width: 500,
      height: 300,
      type: "pie",
    },
    dataLabels: {
      style: {
        fontSize: "12px",
      },
    },
    labels: ["Tích cực", "Tiêu cực", "Trung tính"],
    colors: ["#00E396", "#FF4560", "#008FFB"],
    legend: {
      show: true,
      position: "bottom",
      fontSize: "16px",
    },
  },
};

const TagInfo = () => {
  const { tagid } = useParams();

  // Set Video by tag detail
  const dispatch = useDispatch();
  const ThemeReducer = useSelector((state) => state.theme.mode);
  const videoByTag = useSelector((state) => state.tagDetails);
  const { loading, tagData, error } = videoByTag

  const reportByTag = useSelector((state) => state.tagReport);
  const {
    loading: loadingReportTag,
    tagReportData,
    error: errorReportTag,
  } = reportByTag;

  useEffect(() => {
    dispatch(getTagDetail(tagid))
    dispatch(getTagReport(tagid))
  }, [tagid, dispatch]);
  console.log(tagData)


  const [reportData, setReportData] = useState();
  const [reloadData, setReloadData] = useState(false);

  const handleClickReport = () => {
    dispatch(getTagReport(tagid));
    setReportData(tagReportData);
    console.log('hihia', tagReportData)
    setReloadData(true);
  }

  const completeExport = () => {
    setReloadData(false);
  }

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
                  <Chart
                    options={
                      ThemeReducer === "theme-mode-dark"
                        ? {
                          ...chartOption2.options,
                          theme: { mode: "dark" },
                          background: "#2d2d2d",
                        }
                        : {
                          ...chartOption2.options,
                          theme: { mode: "light" },
                        }
                    }
                    series={chartOption2.series}
                    height="120%"
                    type="area"
                  />
                </div>
              </div>
            </div>
            <div className="card__header">
              <p>Video của kênh</p>
              <div className="card__container">
                <div className="card__header">
                  <p>Scanned Contents</p>
                </div>
                <div className="card__header">
                  <button
                    onClick={handleClickReport}
                    className="btn btn-view"
                  >
                    <i className="bx bx-file-blank mr-0-5"></i>Tạo báo cáo
                  </button>
                </div>
              </div>
            </div>
            <div className="card row">
              <div className="col-12">
                <div className="card__body">
                  <SourceReport reportData={reportData} reloadData={reloadData} />
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

export default TagInfo;
