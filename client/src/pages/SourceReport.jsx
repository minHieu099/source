import React, { useEffect } from 'react';

const SourceReport = ({ reportData , reloadData}) => {

    useEffect(() => {
        if (reloadData) {
          exportHTML();
        }
      }, [reloadData]);

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
        var date = new Date();
        var strdate = " " + date.getDate() + (Number(date.getMonth()) + 1) + date.getFullYear();
        fileDownload.download = 'BaoCaoQuy' + strdate + '.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
      };

    if (!reportData) {
        return <p id='baoCao'>Chưa có dữ liệu</p>;
    }

    return (
        <div className="WordSection1">
            {console.log(reportData)}
            <div style={{ width: 'fit-content', marginLeft: 'calc(50% - 340px)' }} id="baoCao">
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', lineHeight: '150%' }}>
                    <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>HỌC VIỆN KỸ THUẬT QUÂN SỰ</span></b>
                </p>
                <p align="right" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'right', lineHeight: '150%' }}>
                    <span style={{ position: 'absolute', zIndex: 251659264, left: '0px', marginLeft: '68px', marginTop: '0px', width: '170px', height: '2px' }}></span>
                    <i><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Hà Nội, ngày 29 tháng 9 năm 2023</span></i>
                </p>
                <p align="center" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'center', lineHeight: '150%' }}>
                    <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>&nbsp;</span></b>
                </p>
                <p align="center" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'center', lineHeight: '150%' }}>
                    <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>BÁO CÁO TRINH SÁT KÊNH</span></b>
                </p>
                <p align="center" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'center', lineHeight: '150%' }}>
                    <i><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>(Ngày trinh sát: 29/9/2023)</span></i>
                </p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', lineHeight: '150%' }}>
                    <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>&nbsp;</span></b>
                </p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textIndent: '10.0mm', lineHeight: '150%' }}>
                    <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Tên kênh: {reportData["channel_name"]}</span></b>
                </p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textIndent: '10.0mm', lineHeight: '150%' }}>
                    <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Liên kết khả dụng: {reportData["channel_link"]}</span></b>
                </p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textIndent: '10.0mm', lineHeight: '150%' }}>
                    <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Video đăng tải: {reportData["video_count"]}</span></b>
                </p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textIndent: '10.0mm', lineHeight: '150%' }}>
                    <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Video đăng tải ngày gần nhất: 11</span></b>
                </p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textIndent: '10.0mm', lineHeight: '150%' }}>
                    <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Số lượt tương tác trong ngày: 50</span></b>
                </p>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textIndent: '10.0mm', lineHeight: '150%' }}>
                    <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Danh sách video của kênh:</span></b>
                </p>

                <table className="MsoTableGrid" border="1" cellSpacing="0" cellPadding="0" width="655" style={{ width: '491.1pt', borderCollapse: 'collapse', border: 'none' }}>
                    <tr>
                        <td width="50" style={{ width: '37.3pt', border: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p align="center" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'center', lineHeight: '150%' }}>
                                <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>STT</span></b>
                            </p>
                        </td>
                        <td width="174" style={{ width: '130.2pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p align="center" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'center', lineHeight: '150%' }}>
                                <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Video</span></b>
                            </p>
                        </td>
                        <td width="228" style={{ width: '171.0pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p align="center" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'center', lineHeight: '150%' }}>
                                <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Nội dung</span></b>
                            </p>
                        </td>
                        <td width="113" style={{ width: '84.8pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p align="center" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'center', lineHeight: '150%' }}>
                                <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Loại</span></b>
                            </p>
                        </td>
                        <td width="90" style={{ width: '67.8pt', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p align="center" style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'center', lineHeight: '150%' }}>
                                <b><span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Số lượt tương tác</span></b>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td width="50" valign="top" style={{ width: '37.3pt', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'justify', lineHeight: '150%' }}>
                                <span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>1</span>
                            </p>
                        </td>
                        <td width="174" valign="top" style={{ width: '130.2pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'justify', lineHeight: '150%' }}>
                                <span lang="VI" style={{ fontSize: '14.0pt', lineHeight: '150%' }}>http://www.youtube..</span>
                            </p>
                        </td>
                        <td width="228" valign="top" style={{ width: '171.0pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'justify', lineHeight: '150%' }}>
                                <span style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Nội dung video 1</span>
                            </p>
                        </td>
                        <td width="113" valign="top" style={{ width: '84.8pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'justify', lineHeight: '150%' }}>
                                <span style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Tích cực</span>
                            </p>
                        </td>
                        <td width="90" valign="top" style={{ width: '67.8pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0mm 5.4pt 0mm 5.4pt' }}>
                            <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textAlign: 'justify', lineHeight: '150%' }}>
                                <span style={{ fontSize: '14.0pt', lineHeight: '150%' }}>20</span>
                            </p>
                        </td>
                    </tr>
                </table>
                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textIndent: '10.0mm', lineHeight: '150%' }}>
                    <b><span style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Số lượng video tiêu cực: 23</span></b>
                </p>

                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textIndent: '10.0mm', lineHeight: '150%' }}>
                    <b><span style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Số lượng video tích cực: 40</span></b>
                </p>

                <p style={{ marginTop: '6.0pt', marginRight: '0mm', marginBottom: '0mm', marginLeft: '0mm', textIndent: '10.0mm', lineHeight: '150%' }}>
                    <b><span style={{ fontSize: '14.0pt', lineHeight: '150%' }}>Số lượng video trung tính: 50</span></b>
                </p>

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
        </div>
    );
}

export default SourceReport;