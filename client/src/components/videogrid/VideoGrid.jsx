import { useState, useEffect } from "react";

import ContentCard from "../content-card/ContentCard";
import Button from "../button/Button";

import contentList from "../../assets/JsonData/fake_data.json";
import Message from "../loadingError/Error";

const VideoGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getList = async () => {
      setItems(props.videos.slice(0, props.limit));
      setTotalPage(Math.ceil(props.videos.length / props.limit));
    };
    getList();
  }, [props.limit]);

  const loadMore = async () => {
    let itemmore = null;
    let newpage = page + 1;
    itemmore = props.videos.slice(
      (newpage - 1) * props.limit,
      newpage * props.limit
    );
    setItems([...items, ...itemmore]);
    setPage(newpage);
  };

  const totalVideo = props.videos.length;
  return (
    <div className="card__body">
      {totalVideo === 0 ?
        <Message variant={'alert-warning'}>Không tìm thấy video phù hợp</Message>
        : <div className="row">
          {items.map((item, index) => (
            <div className="col-3 col-md-6 col-sm-12" key={index}>
              <ContentCard
                id={item._id}
                channel={item.vd_channel}
                title={item.vd_title}
                url={item.vd_link}
                content={item.vd_highlight}
                type={item.vd_label}
              />
            </div>
          ))}
        </div>}
      {page < totalPage ? (
        <div className="movie-grid__loadmore card__footer">
          <Button className=" btn" onClick={loadMore}>
            Load more
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default VideoGrid;
