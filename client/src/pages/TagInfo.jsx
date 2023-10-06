import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MyWordCloud from "../components/wordcloud/MyWordCloud";
import VideoGrid from "../components/videogrid/VideoGrid";
import TagReport from "./TagReport";

// Redux-action
import { getTagDetail } from "../redux/actions/TagAction";

// loading-err
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";

import "./Pages.css";

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

  useEffect(() => {
    dispatch(getTagDetail(tagid))
  }, [tagid, dispatch]);


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
            {console.log(tagData)}
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
                    <span className="text-bold tag-span">{tagData["recentCount"]}</span>
                  </p>
                  {tagData["trend"] && (
                    <p style={{color: 'red'}}>
                      Xu hướng chủ đề:{" "}
                      <span className="text-bold tag-span" style={{color: 'red'}}>{tagData["trend"]}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="col-8 col-md-12">
                <div className="card-chart full-height col-12">
                  {tagData.chartData && (<Chart
                    options={{
                      xaxis: { categories: tagData.chartData.categories, },
                      title: { text: "Thống kê video theo tháng", },
                      stroke: { curve: 'smooth' },
                      colors: ["#fb0b12", "#43c8ff"],
                    }}
                    series={[
                      {
                        name: "Video tiêu cực",
                        data: tagData.chartData.negativeVideos,
                      },
                      {
                        name: "Video tích cực và trung tính",
                        data: tagData.chartData.positiveNeutralVideos,
                      },
                    ]}
                    height="300"
                    type="area"
                  />)}
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
            <div className="card__container">
              <div className="card__header">
                <p>Top các nội dung liên quan</p>
              </div>
              <div className="card__header">
                <TagReport tagId={tagid} />
              </div>
            </div>

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

export default TagInfo;
