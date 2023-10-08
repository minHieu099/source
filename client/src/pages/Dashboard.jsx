import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";

import StatusCard from "../components/status-card/StatusCard";
import Table from "../components/table/Table";
import Button from "../components/button/Button";

import statusCards from "../assets/JsonData/status-card-data.json";
import last7Tag from "../assets/JsonData/last-7-tag.json";
import last7Reactive from "../assets/JsonData/last-7-reactive.json";
import "./Pages.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getTopNegVideo } from "../redux/actions/VideoAction";
import { getListData } from "../redux/actions/DashboardAction";

// loading error
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";

const topTags = {
  head: ["Chủ đề", "Liên kết"],
};

const renderTagHead = (item, index) => <th key={index}>{item}</th>;

const renderTagBody = (item, index) => (
  <tr key={index}>
    <td>{item.vd_tag}</td>
    <td>{item.count}</td>
  </tr>
);

const topSources = {
  header: ["Kênh", "Số lượng video", "Liên kết"],
};

const renderSourceHead = (item, index) => <th key={index}>{item}</th>;

const renderSourceBody = (item, index) => (
  <tr key={index}>
    <td>{item.channel_name}</td>
    <td>{item.count}</td>
    <td>
      <a href={item.channel_link}>{item.channel_link}</a>
    </td>
  </tr>
);

const Dashboard = () => {
  const dispatch = useDispatch();


  const topNegVideoState = useSelector((state) => state.videoList);
  const {
    loading: loadingTopNeg,
    error: errorLoadTopNeg,
    success: successLoadTopNeg,
  } = topNegVideoState;

  const { loading, dataDashboard, error } = useSelector((state) => state.dataDashBoard)

  useEffect(() => {

    dispatch(getListData())

  }, [dispatch, loadingTopNeg, successLoadTopNeg, errorLoadTopNeg]);

  const chartOption = {
    options: {
      plotOptions: {
        bar: {
          borderRadius: 10,
          horizontal: true,
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '14px',
            fontWeight: 'bold'
          },
        },
      },
      xaxis: {
        labels: {
          style: {
            fontSize: '14px',
          },
        },
      }
    }
  };
  // Handle statitic
  const channel_statistics = dataDashboard["channel_follow"] ? dataDashboard["channel_follow"].map((channel) => {
    const foundChannel = dataDashboard["by_channel_list"].find((item) => item._id === channel.channel_name)
    const count = foundChannel ? foundChannel.count : 0;
    return { ...channel, count }
  }) : []

  const tag_statistics = dataDashboard["tag_follow"] ? dataDashboard["tag_follow"].map((tag) => {
    const foundTag = dataDashboard["by_tag_list"].find((item) => item._id === tag.vd_tag)
    const count = foundTag ? foundTag.count : 0;
    return { ...tag, count }
  }) : []
  const by_channel_list = dataDashboard["by_channel_list"] ? dataDashboard["by_channel_list"] : []
  const videosTop7 = dataDashboard["videosTop7"] ? dataDashboard["videosTop7"] : []

  return (
    <>
      {
        loading ? (
          <div style={{ height: "100%" }}>
            <Loading />{" "}
          </div>
        ) : error ? (
          <Message variant={"alert-warning"}>{error}</Message>
        ) :
          (
            <div id="dashboard">
              <div className="row stretch__item justify-div">
                <p className="section__header">Kênh nổi bật</p>
                <p style={{ margin: 10, fontWeight: 600, color: '#70757a' }}>
                  Dữ liệu lấy từ 01/03/2023 đến 30/09/2023
                </p>
              </div>
              <div className="row">
                {channel_statistics.slice(0, 4).map((item, index) => (
                  <div className="col-3 col-md-6 col-sm-12" key={index}>
                    <StatusCard
                      id={item.channel_id}
                      title={item.channel_name}
                      count={item.count}
                      new={Math.round(item.count/3+1)}
                    />
                  </div>
                ))}
              </div>
              <div className="row stretch__item justify-div">
                <p className="section__header">Phân tích</p>
                <p style={{ margin: 10, fontWeight: 600, color: '#70757a' }}>
                  Dữ liệu lấy từ 01/03/2023 đến 30/09/2023
                </p>
              </div>
              <div className="row stretch__item">
                <div className="col-6 col-md-12">
                  <div className="card card__dashboard">
                    <div className="card__header">
                      <p>Chủ đề theo dõi</p>
                    </div>
                    <div className="card__body">
                      <Table
                        headerData={topTags.head}
                        bodyData={tag_statistics.slice(0, 5)}
                        renderHeader={(item, index) => renderTagHead(item, index)}
                        renderBody={(item, index) => renderTagBody(item, index)}
                      />
                    </div>
                    <div className="card__footer">
                      <Link to="/tag">
                        <Button>Xem tất cả</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-12">
                  <div className="card card__dashboard">
                    <div className="card__header">
                      <p>Top 5 kênh đăng nội dung tiêu cực</p>
                    </div>
                    <Chart
                      options={{ labels: by_channel_list.slice(0, 5).map(channel => channel._id), ...chartOption.options }}
                      series={[
                        {
                          name: "Count videos by Source",
                          data: by_channel_list.slice(0, 5).map(channel => channel.count),
                          type: "bar",
                        },
                      ]}
                      type="bar"
                    />

                  </div>
                </div>
              </div>

              <p className="section__header mt-2"></p>
              <div className="row stretch__item">
                <div className="col-6 col-md-12">
                  <div className="card card__dashboard">
                    <div className="card__header">
                      <p>Danh sách kênh theo dõi</p>
                    </div>
                    <div className="card__body">
                      <Table
                        headerData={topSources.header}
                        bodyData={channel_statistics.slice(0, 5)}
                        renderHeader={(item, index) => renderSourceHead(item, index)}
                        renderBody={(item, index) => renderSourceBody(item, index)}
                      />
                    </div>
                    <div className="card__footer">
                      <Link to="/source">
                        <Button>Xem tất cả</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-12">
                  <div className="card card__dashboard">
                    <div className="card__header">
                      <p>Top 5 video tiêu cực trên Youtube</p>
                    </div>
                    <Chart
                      options={{ labels: videosTop7.slice(0, 5).map(video => video.vd_link), ...chartOption.options }}
                      series={[
                        {
                          name: "Count videos by Source",
                          data: videosTop7.slice(0, 5).map(video => video.vd_react),
                          type: "bar",
                        },
                      ]}
                      type="bar"
                    />
                  </div>
                </div>
              </div>
            </div>

          )
      }


    </>
  );
};

export default Dashboard;
