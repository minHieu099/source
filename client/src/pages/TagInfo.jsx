import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MyWordCloud from "../components/wordcloud/MyWordCloud";
import VideoGrid from "../components/videogrid/VideoGrid";

import tagList from "../assets/JsonData/tag-data.json";

// Redux-action
import { getTagDetail } from "../redux/actions/TagAction";

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
  const [dataAnalys, setDataAnalys] = useState([1, 0, 0])
  // Set Video by tag detail
  const dispatch = useDispatch();
  const ThemeReducer = useSelector((state) => state.theme.mode);
  const videoByTag = useSelector((state) => state.tagDetails)
  const { loading, tagData, error } = videoByTag
  useEffect(() => {
    dispatch(getTagDetail(tagid))
  }, [tagid,dispatch]);
  console.log(tagData)
  return (
    <>
      {
        loading ? (<div> <Loading /> </div>) :
          error ? (<div> <Message variant="alert-danger">{error}</Message></div>) :
            <div>
              <p className="section__header page-header">
                Tag Manager / Tag: <span className="tag-span">{tagData["vd_tag"]}</span>
              </p>
              <div className="col-12">
                <div className="card row">
                  <div className="col-4 col-md-12">
                    <div className="card__body card__body-p">
                      <p>
                        Tag Name:{" "}
                        <span className="text-bold tag-span">{tagData["vd_tag"]}</span>
                      </p>
                      <p>
                        All Scanned Contents:{" "}
                        <span className="text-bold tag-span">{
                          tagData["countVideos"] ? tagData["countVideos"]:0 }</span>
                      </p>
                      <p>
                        Scanned Videos In Last 1 Year:{" "}
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
                  <p>Tag analysis</p>
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
                        series={tagData["arr_statitics"] ? tagData["arr_statitics"] :[1,0,0] }
                        type="pie"
                      />
                    </div>
                  </div>
                  <div className="col-8 col-md-12">
                    <MyWordCloud />
                  </div>
                </div>
                <div className="card__header">
                  <p>Top videos of Tag</p>
                </div>
                <VideoGrid limit={8} videos={tagData["videos"]?tagData["videos"]: [] } />
              </div>
            </div>

      }
    </>

  );
};

export default TagInfo;
