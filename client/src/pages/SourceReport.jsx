import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelReport } from '../redux/actions/ChannelAction';

const SourceReport = ({ channelId }) => {

    const dispatch = useDispatch();
    const report = useSelector((state) => state.channelReport)
    const { loading, channelReportData, error } = report
    useEffect(() => {
        dispatch(getChannelReport(channelId))

    }, [channelId, dispatch]);

    const handleClickReport = async () => {
        await getChannelReport(channelId);
        exportHTML();
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
        fileDownload.download = 'TSK_' + channelReportData.channel_name + '_' + strdate + '.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    };

    if (channelReportData === null || (Array.isArray(channelReportData) && channelReportData.length === 0) || (typeof channelReportData === "object" && Object.keys(channelReportData).length === 0)) {
        return (<>
            <button
                onClick={handleClickReport}
                className="btn btn-view"
            >
                <i className="bx bx-file-blank mr-0-5"></i>Tạo báo cáo
            </button>
            <p id='baoCao' style={{ display: 'none' }}>Chưa có dữ liệu</p>
        </>);
    }

    return (<>
        <button
            onClick={handleClickReport}
            className="btn btn-view"
        >
            <i className="bx bx-file-blank mr-0-5"></i>Tạo báo cáo
        </button>
        <div className="WordSection1" style={{ display: 'none' }}>
            <div style={{ width: 'fit-content', marginLeft: 'calc(50% - 340px)' }} id="baoCao">
                <p style={{}}><b>HỌC VIỆN KỸ THUẬT QUÂN SỰ</b></p>
                <p style={{ textAlign: 'right' }} align="right" ><i>Hà Nội, ngày {date.getDate()} tháng {date.getMonth()} năm {date.getFullYear()}</i></p>
                <p style={{ textAlign: 'center' }} align="center" ><i>&nbsp;</i></p>
                <p style={{ textAlign: 'center' }} align="center" ><b>BÁO CÁO TRINH SÁT KÊNH</b></p>
                <p style={{ textAlign: 'center' }} align="center" ><i>&nbsp;</i></p>
                <p style={{ textIndent: '10.0mm' }} ><b>Kênh trinh sát: {channelReportData.channel_name}</b></p>
                <p style={{ textIndent: '10.0mm' }} ><b>Ngày trinh sát: {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</b></p>
                <p style={{ textIndent: '10.0mm' }} ><b>Đường dẫn kênh:</b> {channelReportData.channel_link}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Số lượng video tích cực:</b> {channelReportData.positive_count}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Số lượng video tiêu cực:</b> {channelReportData.negative_count}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Số lượng video trung tính:</b> {channelReportData.neural_count}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Tổng số lượt tương tác:</b> {channelReportData.interaction_count}</p>
                <p style={{ textIndent: '10.0mm' }} ><b>Các video nổi bật:</b></p>
                {channelReportData.topVideos === 0 ? (
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
                        {channelReportData.topVideos.map((video, index) => (
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
                <p style={{ textIndent: '10.0mm' }} ><b>Các điều hướng liên quan:</b></p>
                {channelReportData.topNavigation.length === 0 ? (
                    <p style={{ textIndent: '20.0mm' }} >Chưa có thông tin</p>
                ) : (<>
                    {channelReportData.topNavigation.map((navigation, index) => (
                        <p style={{ textIndent: '20.0mm' }}>
                            <a href={navigation.navigation_link} target="_blank">
                                {navigation.navigation_link}
                            </a>
                        </p>
                    ))}</>
                )}
                <p style={{ textIndent: '10.0mm' }} ><b>Các chủ đề đăng tải:</b></p>
                {channelReportData.tags.length === 0 ? (
                    <p style={{ textIndent: '20.0mm' }} >Chưa có thông tin</p>
                ) : (
                    <table className="MsoTableGrid" border={1} cellspacing={0} cellpadding={0} width={674} style={{ width: '505.2pt', borderCollapse: 'collapse', border: 'none' }}>
                        <tr>
                            <td width={73} valign="top" style={{ width: '55.05pt', border: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ textAlign: 'center' }} align="center" ><b>STT</b></p>
                            </td>
                            <td width={387} valign="top" style={{ width: '290.55pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ textAlign: 'center' }} align="center" ><b>Tên chủ đề</b></p>
                            </td>
                            <td width={213} valign="top" style={{ width: '159.6pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ textAlign: 'center' }} align="center" ><b>Số lượng video</b></p>
                            </td>
                        </tr>
                        {channelReportData.tags.map((tag, index) => (
                            <tr key={index}>
                                <td width={73} valign="top" style={{ width: '55.05pt', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{}}>{index + 1}</p>
                                </td>
                                <td width={387} valign="top" style={{ width: '290.55pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{}}>{tag.vd_tag}</p>
                                </td>
                                <td width={213} valign="top" style={{ width: '159.6pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{}}>{tag.video_count}</p>
                                </td>
                            </tr>
                        ))}
                    </table>
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
    </>);
}

export default SourceReport;