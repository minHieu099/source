import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";

import Table from "../components/table/Table";


// redux
import { useDispatch, useSelector } from "react-redux";
import { getListChannel, createChannel, deleteChannel } from "../redux/actions/ChannelAction";

// Handle Error
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// 
import "./Pages.css";

const customerTableHead = [
  "#",
  "name",
  "scanned contents",
  "URL",
  "view details",
  "unfollow",
];
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const Sources = () => {
  const history = useHistory();

  //  flow data
  const dispatch = useDispatch();
  // State tag list
  const channelListState = useSelector((state) => state.channelList);
  const { loading, channels_list, by_channels_list, error } = channelListState;
  const channel_statistics =
    channels_list && by_channels_list
      ? channels_list.map((channel) => {
        const foundChannel = by_channels_list.find((item) => item._id === channel.channel_name);
        const count = foundChannel ? foundChannel.count : 0;
        return { ...channel, count };
      })
      : [];

  //  State add source
  const channelCreateState = useSelector((state) => state.channelCreate);
  const {
    loading: loadingCreateChannel,
    error: errorCreateChannel,
    success: successCreateChannel,
  } = channelCreateState;

  //  State add tag
  useEffect(() => {
    if (successCreateChannel) {
      toast.success("Channel Added", ToastObjects);
      setChannelValue("");
      setOpenAdd(false);
      dispatch({ type: "CHANNEL_CREATE_RESET" });
    }
    if (errorCreateChannel) {
      toast.error(errorCreateChannel, ToastObjects);
      setChannelValue("");
      setOpenAdd(false);
      dispatch({ type: "CHANNEL_CREATE_FAIL" });
    }
    dispatch(getListChannel());
  }, [dispatch, successCreateChannel, errorCreateChannel]);

  //  State del source
  const channelDeleteState = useSelector((state) => state.channelDelete);
  const {
    loading: loadingDeleteChannel,
    error: errorDeleteChannel,
    success: successDeleteChannel,
  } = channelDeleteState;

  //  State del tag
  useEffect(() => {
    if (successDeleteChannel) {
      toast.success("Channel deleted successfully", ToastObjects);
      setChannelId("");
      setOpenDelete(false);
      dispatch({ type: "CHANNEL_DELETE_RESET" });
    }
    if (errorDeleteChannel) {
      toast.error(errorDeleteChannel, ToastObjects);
      setChannelId("");
      setOpenDelete(false);
      dispatch({ type: "CHANNEL_DELETE_FAIL" });
    }
    dispatch(getListChannel());
  }, [dispatch, successDeleteChannel, errorDeleteChannel]);

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  //  coding layout
  const viewDetails = (channelid) => history.push("/source/" + channelid);
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.channel_name}</td>
      <td>{item.count}</td>
      <td>
        <a href={item.channel_link}>{item.channel_link}</a>
      </td>
      <td>
        <div className="flex-center">
          <button
            onClick={() => {
              item.count === 0
                ? alert("Không có video liên quan đến kênh này")
                : viewDetails(item.channel_id);
            }}
            className="btn btn-view">

            <i className="bx bx-search-alt mr-0-5"></i>Details
          </button>
        </div>
      </td>
      <td>
        <div className="flex-center">
          <button
            onClick={() => showModalDelete(item.channel_id)}
            className="btn btn-delete"
          >
            <i className="bx bx-user-x mr-0-5"></i>Unfollow
          </button>
        </div>
      </td>
    </tr>
  );

  const [openAdd, setOpenAdd] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [channelValue, setChannelValue] = useState("");

  const [channelId, setChannelId] = useState("");

  const showModalAdd = () => {
    setOpenAdd(true);
  };
  const addChannelHandle = (e) => {
    e.preventDefault();
    dispatch(createChannel(channelValue));
  };
  const delChannelHandle = (e) => {
    e.preventDefault();
    dispatch(deleteChannel(channelId));
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

  const showModalDelete = (channel_id) => {
    setChannelId(channel_id);
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
      {
        loading ? (
          <div style={{ height: "100%" }}>
            <Loading />{" "}
          </div>
        ) : error ? (
          <Message variant={"alert-warning"}>{error}</Message>
        ) :
          (
            <div>
              <div className="justify-div">
                <p className="section__header">Source Manager</p>
                <button className="btn btn-add" onClick={showModalAdd}>
                  <i className="bx bx-plus mr-0-5"></i>Add Source
                </button>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card__body">
                      <Table
                        limit="10"
                        headerData={customerTableHead}
                        bodyData={channel_statistics}
                        renderHeader={(item, index) => renderHead(item, index)}
                        renderBody={(item, index) => renderBody(item, index)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Modal
                title="Add a new source"
                centered
                open={openAdd}
                onOk={handleOkAdd}
                confirmLoading={confirmLoading}
                onCancel={handleCancelAdd}
                okText="Add"
                okButtonProps={{
                  className: "ok-btn",
                  style: {
                    backgroundColor: currentSecondColorVar,
                  },
                  onMouseEnter: (e) =>
                    (e.target.style.backgroundColor = currentMainColorVar),
                  onMouseLeave: (e) =>
                    (e.target.style.backgroundColor = currentSecondColorVar),

                  onClick: (e) => {
                    addChannelHandle(e);
                  }
                }}
                cancelButtonProps={{
                  className: "cancel-btn"
                }}
              >
                <div className="modalBody">
                  <label className="modalLabel">Source URL:</label>
                  <input className="modalInput" type="text"
                    value={channelValue}
                    onChange={(e) => setChannelValue(e.target.value)}

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
                    backgroundColor: "#959595"
                  },
                  onMouseEnter: (e) => (e.target.style.backgroundColor = "#6b6a6a"),
                  onMouseLeave: (e) => (e.target.style.backgroundColor = "#959595"),
                  onClick: (e) => {
                    delChannelHandle(e);
                  }      
                }}
                cancelButtonProps={{
                  className: "cancel-btn"
                }}
              >
                <div className="modalBody">
                  <p>
                    Are you sure you want to unfollow this source?
                  </p>
                </div>
              </Modal>
            </div>
          )
      }
      <ToastContainer />
    </>
  );
};

export default Sources;
