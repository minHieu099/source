import { useEffect, useState } from "react";

import "./table.css";

const Table = (props) => {
  const initDataShow =
    props.limit && props.bodyData
      ? props.bodyData.slice(0, Number(props.limit))
      : props.bodyData;

  const [dataShow, setDataShow] = useState(initDataShow);
  
  let pages = 1;

  let range = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currentPage, setCurrentPage] = useState(0);

  const showCurrentPage = (page) => {
    const start = page * Number(props.limit);
    const end = start + Number(props.limit);

    setDataShow(props.bodyData.slice(start, end));
    setCurrentPage(page);
  };

  return (
    <div className="table-wrapper">
      <table>
        {props.headerData && props.renderHeader ? (
          <thead>
            <tr>
              {props.headerData.map((item, index) =>
                props.renderHeader(item, index)
              )}
            </tr>
          </thead>
        ) : null}

        {props.bodyData && props.renderBody ? (
          <tbody>
            {dataShow.map((item, index) =>
              props.renderBody(item, index, currentPage)
            )}
          </tbody>
        ) : null}
      </table>
      <div className="table__pagination">
        {range.map((item, index) => (
          <div
            key={index}
            className={`table__pagination-item`}
            onClick={() => showCurrentPage(index)}
          >
            <span
              className={
                index === currentPage ? "table__pagination-item-selected" : ""
              }
            >
              {item + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
