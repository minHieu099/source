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

const chartOption2 = {
  series: [
    {
      data: [
        1271, 1051, 2163, 1235, 1271, 1581, 2163, 1235, 3012, 1851, 2163, 1271,
      ],
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
      text: "Monthly Reactives",
    },
    grid: {
      show: false,
    },
  },
};

const contentTableHead = ["#", "Video", "Nội dung", "Loại", "Chi tiết của video"];

const SourceInfo = () => {
  const { channelid } = useParams();

  // Set Video by tag detail
  const dispatch = useDispatch();
  const ThemeReducer = useSelector((state) => state.theme.mode);
  const videoByChannel = useSelector((state) => state.channelDetails)

  const { loading, channelData, error } = videoByChannel
  useEffect(() => {
    dispatch(getChannelDetail(channelid))
  }, [channelid, dispatch]);

  const history = useHistory();

  const [reportData, setReportData] = useState();
  const [reloadData, setReloadData] = useState(false);

  const handleClickReport = () => {
    dispatch(getChannelDetail(channelid));
    setReportData(channelData);
    setReloadData(true);
  }


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
            Quản lý chủ đề / Chủ đề:{" "}
            <span className="tag-span">{tagData["vd_tag"]}</span>
          </p>
          <div className="col-12">
            <div className="card row">
              <div className="col-4 col-md-12">
                <div className="card__body card__body-p">
                  <p>
                    Tên chủ đề:{" "}
                    <span className="text-bold tag-span">{tagData["vd_tag"]}</span>
                  </p>
                  <p>
                    Nội dung thu được:{" "}
                    <span className="text-bold tag-span">
                      {tagData["countVideos"] ? tagData["countVideos"] : 0}
                    </span>
                  </p>
                  <p>
                    Nội dung thu được gần đây:{" "}
                    <span className="text-bold tag-span">20</span>
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
              <p>Phân tích nội dung</p>
            </div>
            <div className="card row">
              <div className="col-4 col-md-12">
                <div className="card-chart full-height col-12">
                  <Chart
                    options={
                      ThemeReducer === "theme-mode-dark"
                        ? {
                          ...chartOption4.options,
                          theme: { mode: "dark" },
                        }
                        : {
                          ...chartOption4.options,
                          theme: { mode: "light" },
                        }
                    }
                    series={
                      tagData["arr_statitics"]
                        ? tagData["arr_statitics"]
                        : [1, 0, 0]
                    }
                    type="pie"
                  />
                </div>
              </div>
              <div className="col-8 col-md-12">
                <MyWordCloud />
              </div>
            </div>
            <div className="card__header">
              <p>Top các nội dung liên quan</p>
            </div>
            <div className="card__container">
              <div className="card__header">
                <p>Top videos of Tag</p>
              </div>
              <div className="card__header">
                <button onClick={handleClickReport} className="btn btn-view">
                  <i className="bx bx-file-blank mr-0-5"></i>Tạo báo cáo
                </button>
              </div>
            </div>
            <TagReport
              reportData={reportData}
              reloadData={reloadData}
              completeExport={completeExport}
            />
            <VideoGrid
              limit={8}
              videos={tagData["videos"] ? tagData["videos"] : []}
            />
          </div>
        </div>
      )}
    </>
  );

};

export default SourceInfo;
