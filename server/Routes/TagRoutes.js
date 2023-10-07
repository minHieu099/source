import express from "express";
import Tag from "../Models/TagModel.js";
import Video from "../Models/VideoModel.js";
import { tagHashtags } from "../data/TagHashtags.js";
const tagRouter = express.Router();

// get all tag
tagRouter.get("/all", async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function calculateTrend(videos) {
  // Sắp xếp các video theo thời gian đăng tải
  videos.sort((a, b) => {
    const dateA = new Date(a.vd_publishAt);
    const dateB = new Date(b.vd_publishAt);
    return dateA - dateB;
  });

  // Lấy ngày đầu tiên và ngày cuối cùng trong danh sách video
  const startDate = new Date(videos[0].vd_publishAt);
  const endDate = new Date(videos[videos.length - 1].vd_publishAt);

  // Tính số ngày giữa hai ngày này
  const daysBetween = (endDate - startDate) / (1000 * 3600 * 24);

  // Chia dữ liệu thành ba khoảng thời gian: 3 tháng gần đây và phần còn lại
  const recentVideos = [];
  const olderVideos = [];
  for (const video of videos) {
    const videoDate = new Date(video.vd_publishAt);
    if (videoDate > endDate - 90 * 24 * 60 * 60 * 1000) {
      recentVideos.push(video);
    } else {
      olderVideos.push(video);
    }
  }

  // Tính số lượng video trung bình của 3 tháng gần đây và số lượng video trung bình của phần còn lại
  const recentAverage = recentVideos.length / (90 / daysBetween);
  const olderAverage = olderVideos.length / ((daysBetween - 90) / daysBetween);

  // Tính lượng chênh lệch giữa số lượng video trung bình của 3 tháng gần đây và số lượng video trung bình của phần còn lại
  const diffPercentage = ((recentAverage - olderAverage) / olderAverage) * 100;

  // Dựa vào lượng chênh lệch, xác định xu hướng
  if (diffPercentage > 100) {
    return 'tăng nhanh';
  } else if (diffPercentage > 30) {
    return 'gia tăng';
  } else if (diffPercentage > -30) {
    return 'giữ nguyên';
  } else if (diffPercentage > -50) {
    return 'giảm xuống';
  } else {
    return 'giảm mạnh';
  }
}


// Get video by tag
tagRouter.get("/:tagid", async (req, res) => {
  try {
    //   const encodedTag = req.params.tag;
    //   const tag = decodeURIComponent(encodedTag);
    const tagId = req.params.tagid;
    const tag = await Tag.findOne({ _id: tagId });
    if (!tag) {
      return res.status(404).json({ message: "Không có dữ liệu về chủ đề" });
    }
    const videos = await Video.find({ vd_tag: tag.vd_tag })
    const negative_list = videos.filter((video) => video.vd_label === 0)
    const positive_list = videos.filter((video) => video.vd_label === 1)
    const neural_list = videos.filter((video) => video.vd_label === 2)
    const countVideos = videos.length
    const arr_statitics = [
      positive_list ? positive_list.length : 0,
      negative_list ? negative_list.length : 0,
      neural_list ? neural_list.length : 0]

    const monthlyData = {};
    const currentYear = new Date().getFullYear();
    for (let month = 3; month <= 9; month++) {
      const yearMonth = `T${month}/${currentYear}`;
      monthlyData[yearMonth] = {
        negative: 0,
        positiveNeutral: 0,
      };
    }
    videos.forEach((video) => {
      const date = new Date(video.vd_publishAt);
      const yearMonth = `T${date.getMonth() + 1}/${date.getFullYear()}`;
      if (monthlyData[yearMonth]) {
        if (video.vd_label === 0) {
          monthlyData[yearMonth].negative++;
        }
        if (video.vd_label === 1 || video.vd_label === 2) {
          monthlyData[yearMonth].positiveNeutral++;
        }
      }
    });
    const categories = Object.keys(monthlyData); // Không cần sắp xếp
    const negativeVideos = categories.map((month) => monthlyData[month].negative);
    const positiveNeutralVideos = categories.map((month) => monthlyData[month].positiveNeutral);

    const trend = calculateTrend(videos);

    // Tính số video gần đây (trong vòng 1 tháng)
    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    let recentCount = 0;
    for (const video of videos) {
      const videoDate = new Date(video.vd_publishAt);
      if (videoDate >= oneMonthAgo) {
        recentCount++;
      }
    }

    res.json(
      {
        vd_tag: tag.vd_tag,
        countVideos: countVideos,
        arr_statitics: arr_statitics,
        videos: videos.length > 8 ? videos.slice(0, 8) : videos,
        chartData: {
          categories,
          negativeVideos,
          positiveNeutralVideos,
        },
        trend: trend,
        recentCount: recentCount,
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi trong quá trình xử lý" });
  }
});

//  Add new tag
tagRouter.post("/", async (req, res) => {
  const { tagValue } = req.body;
  try {
    // Kiểm tra xem tag đã tồn tại trong cơ sở dữ liệu chưa
    const existingTag = await Tag.findOne({ vd_tag: tagValue });
    if (existingTag) {
      return res.status(400).json({ message: "Chủ đề đã tồn tại" });
    }
    // Tạo tag mới và lưu vào cơ sở dữ liệu
    const newTag = new Tag({ vd_tag: tagValue, crawled: false });
    await newTag.save();
    // Trả về thông tin của tag mới đã tạo
    res.json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi trong quá trình xử lý" });
  }
});

tagRouter.get("/report/:tagid", async (req, res) => {
  try {
    const tagId = req.params.tagid;
    const tag = await Tag.findOne({ _id: tagId });
    if (!tag) {
      return res.status(404).json({ message: "Tag not found data" });
    }

    const videos = await Video.find({ vd_tag: tag.vd_tag });
    const video_count = videos.length;

    // Tính toán số lượng video theo các loại và danh sách các video nổi bật
    const positive_videos = videos.filter((video) => video.vd_label === 1);
    const negative_videos = videos.filter((video) => video.vd_label === 0);
    const neural_videos = videos.filter((video) => video.vd_label === 2);
    const positive_count = positive_videos.length;
    const negative_count = negative_videos.length;
    const neural_count = neural_videos.length;

    // Kiểm tra danh sách tag_hashtags từ file tagHashtags.js
    let hashtags = [];
    for (const tagHashtag of tagHashtags) {
      if (tagHashtag.vd_tag === tag.vd_tag) {
        hashtags = tagHashtag.tag_hashtags;
        break;
      }
    }

    // Lấy danh sách các kênh tham gia đăng tải liên quan
    const channel_counts = {};
    videos.forEach((video) => {
      const channel = video.vd_channel;
      if (!channel_counts[channel]) {
        channel_counts[channel] = 1;
      } else {
        channel_counts[channel]++;
      }
    });
    const channels = Object.keys(channel_counts)
      .sort((a, b) => channel_counts[b] - channel_counts[a])
      .slice(0, 20);

    // Lấy các kênh có nhiều video tiêu cực nhất
    const channel_negative_counts = {};
    videos
      .filter((video) => video.vd_label === 0)
      .forEach((video) => {
        if (!channel_negative_counts[video.vd_channel]) {
          channel_negative_counts[video.vd_channel] = 1;
        } else {
          channel_negative_counts[video.vd_channel]++;
        }
      });

    const topNegativeChannels = Object.keys(channel_negative_counts)
      .sort((a, b) => channel_negative_counts[b] - channel_negative_counts[a])
      .slice(0, 5)
      .map((channel) => ({
        channel_name: channel,
        negative_video_count: channel_negative_counts[channel],
      }));

    const topReactVideos = videos
      .sort((a, b) => b.vd_react - a.vd_react)
      .slice(0, 5);

    // Sắp xếp video theo vd_comment giảm dần
    const topCommentVideos = videos
      .sort((a, b) => b.vd_comment - a.vd_comment)
      .slice(0, 5);

    // Gộp topReactVideos và topCommentVideos thành topVideos và loại bỏ video trùng nhau
    const videoSet = new Set();
    const topVideos = [...topReactVideos, ...topCommentVideos].filter((video) => {
      if (videoSet.has(video._id.toString())) {
        return false;
      }
      videoSet.add(video._id.toString());
      return true;
    });

    // Thêm thông tin các channels tham gia đăng tải video
    const channel_info = channels.map((channel) => ({
      channel_name: channel,
      video_count: videos.filter((video) => video.vd_channel === channel).length,
    }));

    // Tạo đối tượng báo cáo
    const report = {
      vd_tag: tag.vd_tag,
      video_count,
      positive_count,
      negative_count,
      neural_count,
      hashtags,
      channels: channel_info,
      topVideos,
      topNegativeChannels,
    };

    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default tagRouter;
