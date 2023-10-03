import React, { useEffect } from 'react';

const TagReport = ({ reportData, reloadData, completeExport }) => {

    useEffect(() => {
        if (reloadData) {
            exportHTML();
            completeExport();
        }
    }, [reloadData]);
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
        fileDownload.download = 'TSCD_' + reportData.vd_tag + '_' + strdate + '.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    };

    if (!reportData) {
        return <p id='baoCao'>Chưa có dữ liệu</p>;
    }

    return (
        <div className="WordSection1" style={{display: 'none'}}>
            {console.log('reportdata' , reportData)}
            <div style={{ width: 'fit-content', marginLeft: 'calc(50% - 340px)' }} id="baoCao">
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }} ><span lang="VI">&nbsp;</span></p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}><b>HỌC VIỆN KỸ THUẬT QUÂN SỰ</b></p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'right'}} align="right" ><i>Hà Nội, ngày {date.getDate()} tháng {date.getMonth()} năm {date.getFullYear()}</i></p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><i>&nbsp;</i></p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>BÁO CÁO TRINH SÁT CHỦ ĐỀ</b></p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><i>&nbsp;</i></p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} ><b>Chủ đề trinh sát: {reportData.vd_tag}</b></p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} ><b>Ngày trinh sát: {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</b></p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} ><b>Tổng số video thuộc chủ đề:</b> {reportData.video_count}</p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} ><b>Số lượng video tích cực:</b> {reportData.positive_count}</p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} ><b>Số lượng video tiêu cực:</b> {reportData.negative_count}</p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} ><b>Số lượng video trung tính:</b> {reportData.neural_count}</p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} ><b>Các hashtag liên quan đến chủ đề:</b> {reportData.hashtags ? reportData.hashtags.join(', ') : ""}</p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} ><b>Các video nổi bật:</b></p>
                {reportData.topVideos.length === 0 ? (
                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} >Chưa có thông tin</p>
                ) : (
                    <table className="MsoTableGrid" border={1} cellspacing={0} cellpadding={0} width={674} style={{ width: '505.15pt', borderCollapse: 'collapse', border: 'none' }}>
                        <tr>
                            <td width={177} style={{ width: '133.0pt', border: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>Tiêu đề video</b></p>
                            </td>
                            <td width={161} style={{ width: '120.5pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>Đường dẫn</b></p>
                            </td>
                            <td width={108} style={{ width: '81.15pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>Kênh đăng tải</b></p>
                            </td>
                            <td width={98} style={{ width: '73.85pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>Nhãn cảm xúc</b></p>
                            </td>
                            <td width={63} style={{ width: '47.05pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>Lượt cảm xúc</b></p>
                            </td>
                            <td width={66} style={{ width: '49.6pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>Lượt bình luận</b></p>
                            </td>
                        </tr>
                        {reportData.topVideos.map((video, index) => (
                            <tr key={index}>
                                <td width={177} valign="top" style={{ width: '133.0pt', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>{video.vd_title}</p>
                                </td>
                                <td width={161} valign="top" style={{ width: '120.5pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>
                                        <a href={video.vd_link} target="_blank">
                                            {video.vd_link}
                                        </a>
                                    </p>
                                </td>
                                <td width={108} valign="top" style={{ width: '81.15pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>{video.vd_channel}</p>
                                </td>
                                <td width={98} valign="top" style={{ width: '73.85pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>
                                        {video.vd_label === 1
                                            ? "Tích cực"
                                            : video.vd_label === 0
                                                ? "Tiêu cực"
                                                : "Trung tính"}
                                    </p>
                                </td>
                                <td width={63} valign="top" style={{ width: '47.05pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>{video.vd_react}</p>
                                </td>
                                <td width={66} valign="top" style={{ width: '49.6pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>{video.vd_comment}</p>
                                </td>
                            </tr>
                        ))}
                    </table>
                )}

                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} ><b>Các kênh đăng tải nhiều video:</b></p>
                {reportData.channels.length === 0 ? (
                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} >Chưa có thông tin</p>
                ) : (
                    <table className="MsoTableGrid" border={1} cellspacing={0} cellpadding={0} width={674} style={{ width: '505.2pt', borderCollapse: 'collapse', border: 'none' }}>
                        <tr>
                            <td width={73} valign="top" style={{ width: '55.05pt', border: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>STT</b></p>
                            </td>
                            <td width={387} valign="top" style={{ width: '290.55pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>Tên kênh</b></p>
                            </td>
                            <td width={213} valign="top" style={{ width: '159.6pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>Số lượng video</b></p>
                            </td>
                        </tr>
                        {reportData.channels.map((channel, index) => (
                            <tr key={index}>
                                <td width={73} valign="top" style={{ width: '55.05pt', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>{index}</p>
                                </td>
                                <td width={387} valign="top" style={{ width: '290.55pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>{channel.channel_name}</p>
                                </td>
                                <td width={213} valign="top" style={{ width: '159.6pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>{channel.video_count}</p>
                                </td>
                            </tr>
                        ))}
                    </table>
                )}

                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} ><b>Kênh có nhiều video tiêu cực:</b></p>
                {reportData.topNegativeChannels.length === 0 ? (
                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textIndent: '10.0mm'}} >Chưa có thông tin</p>
                ) : (
                    <table className="MsoTableGrid" border={1} cellspacing={0} cellpadding={0} width={674} style={{ width: '505.2pt', borderCollapse: 'collapse', border: 'none' }}>
                        <tr>
                            <td width={73} valign="top" style={{ width: '55.05pt', border: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>STT</b></p>
                            </td>
                            <td width={387} valign="top" style={{ width: '290.55pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>Tên kênh</b></p>
                            </td>
                            <td width={213} valign="top" style={{ width: '159.6pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>Số lượng video</b></p>
                            </td>
                        </tr>
                        {reportData.topNegativeChannels.map((channel, index) => (
                            <tr key={index}>
                                <td width={73} valign="top" style={{ width: '55.05pt', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>{index}</p>
                                </td>
                                <td width={387} valign="top" style={{ width: '290.55pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>{channel.channel_name}</p>
                                </td>
                                <td width={213} valign="top" style={{ width: '159.6pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                                    <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>{channel.negative_video_count}</p>
                                </td>
                            </tr>
                        ))}
                    </table>
                )}

                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>&nbsp;</p>

                <table className="MsoTableGrid" border={0} cellspacing={0} cellpadding={0} style={{ borderCollapse: 'collapse', border: 'none' }}>
                    <tr>
                        <td width={319} valign="top" style={{ width: '239.4pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>&nbsp;</p>
                        </td>
                        <td width={319} valign="top" style={{ width: '239.4pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>Trinh sát viên</b></p>
                            <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>&nbsp;</b></p>
                            <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>&nbsp;</b></p>
                            <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 , textAlign: 'center'}} align="center" ><b>Nguyễn Văn A</b></p>
                        </td>
                    </tr>
                </table>

                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '6.0pt', marginLeft: '0mm', lineHeight: '150%', fontSize: 14 }}>&nbsp;</p>
            </div>
        </div>
    );
}

export default TagReport;