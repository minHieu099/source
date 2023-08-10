import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";

import Table from "../components/table/Table";
import tagList from "../assets/JsonData/tag-data.json";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getListTag, createTag } from "../redux/actions/TagAction";

// Handle Error
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS
import "./Pages.css";
import "antd/dist/antd.css";

const customerTableHead = [
  "#",
  "Chủ đề",
  "Video trinh sát",
  "Xem chi tiết",
  "Bỏ theo dõi",
];

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const Tags = () => {
  const history = useHistory();

  //  flow data
  const dispatch = useDispatch();

  // State tag list
  const tagListState = useSelector((state) => state.tagList);
  const { loading, tags_list, by_tags_list, error } = tagListState;
  const tag_statistics =
    tags_list && by_tags_list
      ? tags_list.map((tag) => {
          const foundTag = by_tags_list.find((item) => item._id === tag.vd_tag);
          const count = foundTag ? foundTag.count : 0;
          return { ...tag, count };
        })
      : [];

  //  State add tag
  const tagCreateState = useSelector((state) => state.tagCreate);
  const {
    loading: loadingCreateTag,
    error: errorCreateTag,
    success: successCreateTag,
  } = tagCreateState;

  useEffect(() => {
    if (successCreateTag) {
      toast.success("Thêm chủ đề thành công", ToastObjects);
      setTagValue("");
      setOpenAdd(false);
      dispatch({ type: "TAG_CREATE_RESET" });
    }
    if (errorCreateTag) {
      toast.error("Chủ đề đã tồn tại", ToastObjects);
      setTagValue("");
      setOpenAdd(false);
      dispatch({ type: "TAG_CREATE_FAIL" });
    }
    dispatch(getListTag());
  }, [dispatch, successCreateTag, errorCreateTag]);

  //  coding layout
  const viewDetails = (tagid) => history.push("/tag/" + tagid);

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.vd_tag}</td>
      <td>{item.count}</td>
      <td>
        <div className="flex-center">
          <button
            onClick={() => {
              item.count === 0
                ? alert("Chưa có video mới")
                : viewDetails(item._id);
            }}
            className="btn btn-view"
          >
            <i className="bx bx-search-alt mr-0-5"></i>Chi tiết
          </button>
        </div>
      </td>
      <td>
        <div className="flex-center">
          <button
            onClick={() => showModalDelete(item.id)}
            className="btn btn-delete"
          >
            <i className="bx bx-trash mr-0-5"></i>Bỏ theo dõi
          </button>
        </div>
      </td>
    </tr>
  );

  const [openAdd, setOpenAdd] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [tagValue, setTagValue] = useState("");

  const showModalAdd = () => {
    setOpenAdd(true);
  };

  const addTagHandle = (e) => {
    e.preventDefault();

    dispatch(createTag(tagValue));
  };

  const handleOkAdd = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenAdd(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancelAdd = () => {
    setOpenAdd(false);
  };

  const showModalDelete = (tagId) => {
    setOpenDelete(true);
  };

  const handleOkDelete = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenDelete(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
  };

  const currentMainColorVar =
    "var(--main-color-" + localStorage.getItem("colorMode").slice(12) + ")";

  const currentSecondColorVar =
    "var(--second-color-" + localStorage.getItem("colorMode").slice(12) + ")";

  return (
    <>
      {loading ? (
        <div style={{ height: "100%" }}>
          <Loading />{" "}
        </div>
      ) : error ? (
        <Message variant={"alert-warning"}>{error}</Message>
      ) : (
        <div>
          <div className="justify-div">
            <p className="section__header">Quản lý chủ đề</p>
            <button className="btn btn-add" onClick={showModalAdd}>
              <i className="bx bx-plus mr-0-5"></i>Thêm chủ đề mới
            </button>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <Table
                    limit="10"
                    headerData={customerTableHead}
                    bodyData={tag_statistics}
                    renderHeader={(item, index) => renderHead(item, index)}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
          <Modal
            title="Thêm chủ đề mới"
            centered
            open={openAdd}
            onOk={handleOkAdd}
            confirmLoading={confirmLoading}
            onCancel={handleCancelAdd}
            okText="Thêm"
            okButtonProps={{
              className: "ok-btn",
              style: {
                backgroundColor: currentSecondColorVar,
              },
              onMouseEnter: (e) => {
                e.target.style.backgroundColor = currentMainColorVar;
              },
              onMouseLeave: (e) =>
                (e.target.style.backgroundColor = currentSecondColorVar),
              onClick: (e) => {
                addTagHandle(e);
              },
            }}
            cancelButtonProps={{
              className: "cancel-btn",
            }}
          >
            <div className="modalBody">
              <label className="modalLabel">Tên chủ đề:</label>
              <input
                className="modalInput"
                type="text"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
              ></input>
            </div>
          </Modal>
          <Modal
            centered
            open={openDelete}
            onOk={handleOkDelete}
            confirmLoading={confirmLoading}
            onCancel={handleCancelDelete}
            okText="Unfollow"
            okButtonProps={{
              className: "ok-btn",
              style: {
                backgroundColor: "#959595",
              },
              onMouseEnter: (e) => (e.target.style.backgroundColor = "#6b6a6a"),
              onMouseLeave: (e) => (e.target.style.backgroundColor = "#959595"),
            }}
            cancelButtonProps={{
              className: "cancel-btn",
            }}
          >
            <div className="modalBody">
              <p>Are you sure you want to unfollow this tag?</p>
            </div>
          </Modal>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Tags;
