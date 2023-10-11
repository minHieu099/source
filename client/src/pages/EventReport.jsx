import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const EventReport = ({ reportData }) => {

    const [eventName, setEventName] = useState('');
    const [openAdd, setOpenAdd] = useState(false);

    const showModalAdd = () => {
        setOpenAdd(true);
    };

    const handleExport = () => {
        exportHTML();
        setOpenAdd(false);
        setEventName('');
    };

    const handleCancelAdd = () => {
        setOpenAdd(false);
        setEventName('');
    };

    var date = new Date();
    var strdate = " " + date.getDate() + (Number(date.getMonth()) + 1) + date.getFullYear();

    const exportHTML = () => {
        var header =
            "<header xmlsn:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
        var footer = '</body></html>';
        var sourceHTML = header + document.getElementById('baoCao').innerHTML + footer;
        var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        var fileDownload = document.createElement('a');
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'TSK_' + eventName + '_' + strdate + '.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    };

    const currentMainColorVar =
        "var(--main-color-" + localStorage.getItem("colorMode").slice(12) + ")";

    const currentSecondColorVar =
        "var(--second-color-" + localStorage.getItem("colorMode").slice(12) + ")";


    if (reportData === null || (Array.isArray(reportData) && reportData.length === 0) || (typeof reportData === "object" && Object.keys(reportData).length === 0)) {
        return (<>
            <button
                onClick={showModalAdd}
                className="btn btn-view"
            >
                <i className="bx bx-file-blank mr-0-5"></i>Tạo báo cáo
            </button>
            <p id='baoCao' style={{ display: 'none' }}>Chưa có dữ liệu</p>
        </>);
    }

    return (<>
        <button
            onClick={showModalAdd}
            className="btn btn-view"
        >
            <i className="bx bx-file-blank mr-0-5"></i>Tạo báo cáo
        </button>
        <div className="WordSection1" style={{ display: 'none' }}>
            <div style={{ width: 'fit-content', marginLeft: 'calc(50% - 340px)' }} id="baoCao">
                <p style={{}}><b>HỌC VIỆN KỸ THUẬT QUÂN SỰ</b></p>
                <p style={{ textAlign: 'right' }} align="right" ><i>Hà Nội, ngày {date.getDate()} tháng {10} năm {date.getFullYear()}</i></p>
                <p style={{ textAlign: 'center' }} align="center" ><i>&nbsp;</i></p>
                <p style={{ textAlign: 'center' }} align="center" ><b>BÁO CÁO THEO DÕI LUỒNG SỰ KIỆN</b></p>
                <p style={{ textAlign: 'center' }} align="center" ><i>&nbsp;</i></p>
                <p style={{ textIndent: '10.0mm' }} ><b>Tên luồng sự kiện: {eventName}</b></p>
                <p style={{ textIndent: '10.0mm' }} ><b>Ngày trinh sát: {date.getDate()}/{10}/{date.getFullYear()}</b></p>
                <p style={{ textIndent: '10.0mm' }} ><b>Lượng video được theo dõi:</b> {reportData.totalVideos}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Lượng video tiêu cực trong sự kiện:</b> {reportData.negativeVideos}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Lượng video thu thập gần đây:</b> {reportData.recentVideos}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Tổng số lượt tương tác:</b> {reportData.totalReacts}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Tổng số lượt chia sẻ:</b> {reportData.shares}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Lượng bình luận thuộc sự kiện:</b> {reportData.totalComments}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Lượng bình luận thu thập gần đây:</b> {reportData.recentComments}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Lượng bình luận tiêu cực trong sự kiện:</b> {reportData.negativeComments}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Lượng bình luận tích cực trong sự kiện:</b> {reportData.positiveComments}</p>

                <p style={{ textIndent: '10.0mm' }} ><b>Các kênh đăng tải liên quan:</b></p>
                {reportData.channelInfo.length === 0 ? (
                    <p style={{ textIndent: '20.0mm' }} >Chưa có thông tin</p>
                ) : (
                    <table className="MsoTableGrid" border={1} cellspacing={0} cellpadding={0} width={674} style={{ width: '505.2pt', borderCollapse: 'collapse', border: 'none' }}>
                        <tr>
                            <td width={73} valign="top" style={{ width: '55.05pt', border: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ textAlign: 'center' }} align="center" ><b>STT</b></p>
                            </td>
                            <td width={387} valign="top" style={{ width: '290.55pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ textAlign: 'center' }} align="center" ><b>Tên kênh</b></p>
                            </td>
                            <td width={113} valign="top" style={{ width: '159.6pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ textAlign: 'center' }} align="center" ><b>Số lượng video</b></p>
                            </td>
                            <td width={100} valign="top" style={{ width: '159.6pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ textAlign: 'center' }} align="center" ><b>Số video tiêu cực</b></p>
                            </td>
                        </tr>
                        {reportData.channelInfo.map((channel, index) => (
                            <tr key={index}>
                                <td width={73} valign="top" style={{ width: '55.05pt', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{}}>{index + 1}</p>
                                </td>
                                <td width={387} valign="top" style={{ width: '290.55pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{}}>{channel._id}</p>
                                </td>
                                <td width={113} valign="top" style={{ width: '159.6pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{}}>{channel.totalVideos}</p>
                                </td>
                                <td width={100} valign="top" style={{ width: '159.6pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{}}>{channel.negativeVideos}</p>
                                </td>
                            </tr>
                        ))}
                    </table>
                )}



                <p style={{ textIndent: '10.0mm' }} ><b>Các video nổi bật trong sự kiện:</b></p>
                {reportData.topVideos === 0 ? (
                    <p style={{ textIndent: '10.0mm' }} >Chưa có thông tin</p>
                ) : (
                    <table className="MsoTableGrid" border={1} cellspacing={0} cellpadding={0} width={674} style={{ width: '505.15pt', borderCollapse: 'collapse', border: 'none' }}>
                        <tr>
                            <td width={177} style={{ width: '133.0pt', border: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ textAlign: 'center' }} align="center" ><b>Tiêu đề video</b></p>
                            </td>
                            <td width={108} style={{ width: '81.15pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ textAlign: 'center' }} align="center" ><b>Chủ đề</b></p>
                            </td>
                            <td width={98} style={{ width: '73.85pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ textAlign: 'center' }} align="center" ><b>Nhãn cảm xúc</b></p>
                            </td>
                            <td width={63} style={{ width: '47.05pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ textAlign: 'center' }} align="center" ><b>Lượt cảm xúc</b></p>
                            </td>
                            <td width={66} style={{ width: '49.6pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ textAlign: 'center' }} align="center" ><b>Lượt bình luận</b></p>
                            </td>
                        </tr>
                        {reportData.topVideos.map((video, index) => (
                            <tr key={index}>
                                <td width={177} valign="top" style={{ width: '133.0pt', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{}}>{video.vd_title}</p>
                                </td>
                                <td width={108} valign="top" style={{ width: '81.15pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{}}>{video.vd_tag}</p>
                                </td>
                                <td width={98} valign="top" style={{ width: '73.85pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{}}>
                                        {video.vd_label === 1
                                            ? "Tích cực"
                                            : video.vd_label === 0
                                                ? "Tiêu cực"
                                                : "Trung tính"}
                                    </p>
                                </td>
                                <td width={63} valign="top" style={{ width: '47.05pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{}}>{video.vd_react}</p>
                                </td>
                                <td width={66} valign="top" style={{ width: '49.6pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{}}>{video.vd_comment}</p>
                                </td>
                            </tr>
                        ))}
                    </table>
                )}

                <p style={{ textIndent: '10.0mm' }} ><b>Các hashtag liên quan đến sự kiện:</b> {reportData.topHashtags ? reportData.topHashtags[0].topHashtags.join(', ') : ""}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Các điều hướng liên quan:</b></p>
                {reportData.topLinks.length === 0 ? (
                    <p style={{ textIndent: '20.0mm' }} >Chưa có thông tin</p>
                ) : (<>
                    {reportData.topLinks[0].topLinks.map((navigation, index) => (
                        <p style={{ textIndent: '20.0mm' }}>
                            <a href={navigation} target="_blank">
                                {navigation}
                            </a>
                        </p>
                    ))}</>
                )}
                <table className="MsoTableGrid" border="0" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse', border: 'hidden' }}>
                    <tr>
                        <td width="312" valign="top" style={{ width: '233.75pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', lineHeight: '150%' }}>
                                <b><span style={{ fontSize: '14.0pt', lineHeight: '150%' }}>&nbsp;</span></b>
                            </p>
                        </td>
                        <td width="312" valign="top" style={{ width: '233.75pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p align="center" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'center', lineHeight: '150%' }}>
                                <b><span style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Trinh sát viên</span></b>
                            </p>
                            <p align="center" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'center', lineHeight: '150%' }}>
                                <b><span style={{ fontSize: '14.0pt', lineHeight: '150%' }}>&nbsp;</span></b>
                            </p>
                            <p align="center" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'center', lineHeight: '150%' }}>
                                <b><span style={{ fontSize: '14.0pt', lineHeight: '150%' }}>&nbsp;</span></b>
                            </p>
                            <p align="center" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'center', lineHeight: '150%' }}>
                                <b><span style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Nguyễn Văn A</span></b>
                            </p>
                        </td>
                    </tr>
                </table>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textIndent: '10.0mm', lineHeight: '150%' }}>
                    <b><span style={{ fontSize: '14.0pt', lineHeight: '150%' }}>&nbsp;</span></b>
                </p>
            </div>
        </div >
        <Modal
            title="Nhập tên luồng sự kiện"
            centered
            open={openAdd}
            onCancel={handleCancelAdd}
            okText="Xuất báo cáo"
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
                    handleExport();
                },
            }}
            cancelButtonProps={{
                className: "cancel-btn",
            }}
        >
            <div className="modalBody">
                <label className="modalLabel">Tên sự kiện:</label>
                <input
                    className="modalInput"
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                ></input>
            </div>
        </Modal>
    </>);
}

export default EventReport;