import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { DatePicker, Space } from 'antd';

import VideoGrid from "../components/videogrid/VideoGrid";
import Search from "../components/search/Search";
import { Select } from "antd";

import "./Pages.css";
import "antd/dist/antd.css";

// Get list video
import { useDispatch, useSelector } from "react-redux";
import { getListVideo } from "../redux/actions/VideoAction";

// Xu ly state Loading/error
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";

const { Option } = Select;

const handleChange = (value) => {

};

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const customFormat = (value) => `${value.format(dateFormat)}`;

const Contents = () => {
  const [searchKey, setSearchKey] = useState("");

  const [option, setOption] = useState("default");

  const [params, setParams] = useState({});

  const dispatch = useDispatch();

  const videoList = useSelector((state) => state.videoList);

  const { loading, videos, error } = videoList;

  const [startdate, setStartDate] = useState('2023-03-01');
  const [enddate, setEndDate] = useState('2023-09-30');

  useEffect(() => {
    let params = {};
    if (searchKey !== "") {
      params = { ...params, keyword: searchKey };
    }
    if (option === "negative") {
      params = { label: 0, ...params };
      console.log(params)
    } else if (option === "high_interaction") {
      params = { react: true, ...params };
    }
    if (startdate && enddate) {
      params = {
        ...params,
        startdate: dayjs(startdate).format(dateFormat),
        enddate: dayjs(enddate).format(dateFormat),
      };
    }
    dispatch(getListVideo(params));
  }, [dispatch, option, startdate, enddate]);

  const handleSearchVideo = useCallback(() => {
    let params = {};
    if (searchKey !== "") {
      params = { ...params, keyword: searchKey };
    }
    if (option === "negative") {
      params = { label: 0, ...params };
    } else if (option === "high_interaction") {
      params = { react: true, ...params };
    }
    if (startdate && enddate) {
      params = {
        ...params,
        startdate: dayjs(startdate).format(dateFormat),
        enddate: dayjs(enddate).format(dateFormat),
      };
    }
    dispatch(getListVideo(params));
  }, [dispatch, searchKey, option]);

  const handleChangeOption = (value) => {
    setOption(value);
  };
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
          <div className="mb-24 justify-div align-center">

            <Search
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder={"Trích xuất thông tin ..."}
              handleEvent={handleSearchVideo}
            />
            <RangePicker
              className="search"
              value={[dayjs(startdate, dateFormat), dayjs(enddate, dateFormat)]}
              onChange={(dates) => {
                console.log('chang date: ', dates)
                if (dates && dates.length === 2) {
                  setStartDate(dates[0]);
                  setEndDate(dates[1]);

                } else {
                  setStartDate('2023-01-01');
                  setEndDate(dayjs().format(dateFormat));
                }
              }}
              format={customFormat}
            />
            <Select
              className="selectFilter search"
              value={option}
              onChange={handleChangeOption}
              dropdownStyle={{ fontSize: 16, padding: 0 }}
            >
              <Option value="default" className="option-padding">
                Toàn bộ video
              </Option>
              <Option value="negative" className="option-padding">
                Tin tiêu cực
              </Option>
              <Option value="high_interaction" className="option-padding">
                Tương tác nhiều
              </Option>
            </Select>
          </div>
          {videos.length > 0 && (
            <p style={{ margin: 10, fontWeight: 600, color: '#70757a', fontSize: "16px" }}>
              Kết quả: Tìm thấy {videos.length} video.
            </p>
          )}
          <div>
            <VideoGrid limit={8} videos={videos} />
          </div>
        </div>
      )}
    </>
  );
};

export default Contents;
