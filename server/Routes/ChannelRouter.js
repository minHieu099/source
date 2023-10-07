import express from "express";
import { google } from 'googleapis';
import Channel from "../Models/ChannelModel.js";
import Video from "../Models/VideoModel.js";
//  defined Router
const channelRouter = express.Router();
// Set up the API client
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyAHgE5wM-mYD0qT4rvI9Z3vQJ9BRsUYJak'
});

// Get channel data by ID
async function getChannelData(channelId) {
  try {
    const response = await youtube.channels.list({
      part: 'snippet',
      id: channelId
    });
    const channelData = response.data.items[0].snippet;
    const channelLink = `https://www.youtube.com/channel/${channelId}`;
    return { channelName: channelData.title, channelLink: channelLink };
  } catch (error) {
    console.error(error);
    return null;
  }
}
// Get list channel
channelRouter.get("/all", async (req, res) => {
  try {
    const channels = await Channel.find({});
    res.json(channels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get video by tag
// channelRouter.get("/:channelId", async (req, res) => {
//   try {
//     //   const encodedTag = req.params.tag;
//     //   const tag = decodeURIComponent(encodedTag);
//     const channel = req.params.channelId;
//     const videos = await Video.find({ vd_channel: channel });
//     res.json(videos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

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

channelRouter.get("/:idchannel", async (req, res) => {
  try {
    const channelId = req.params.idchannel;
    const channel = await Channel.findOne({ channel_id: channelId });

    if (!channel) {
      return res.status(404).json({ message: "Không tìm thấy channel tương ứng" });
    }

    const videos = await Video.find({ vd_channel: channel.channel_name });
    const videoCount = videos.length;

    const monthlyData = {};
    const currentYear = new Date().getFullYear();
    for (let month = 3; month <= 9; month++) {
      const yearMonth = `T${month}/${currentYear}`;
      monthlyData[yearMonth] = {
        total: 0,
        negative: 0,
      };
    }
    videos.forEach((video) => {
      const date = new Date(video.vd_publishAt);
      const yearMonth = `T${date.getMonth() + 1}/${date.getFullYear()}`;
      if (monthlyData[yearMonth]) {
        monthlyData[yearMonth].total++;
        if (video.vd_label === 0) {
          monthlyData[yearMonth].negative++;
        }
      }
    });
    const categories = Object.keys(monthlyData); // Không cần sắp xếp
    const totalVideos = categories.map((month) => monthlyData[month].total);
    const negativeVideos = categories.map((month) => monthlyData[month].negative);

    const trend = calculateTrend(videos);

    res.json({
      channel_name: channel.channel_name,
      video_count: videoCount,
      videos: videos.length > 8 ? videos.slice(0,8) : videos,
      channel_link: channel.channel_link,
      chartData: {
        categories,
        totalVideos,
        negativeVideos,
      },
      trend: trend,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi trong quá trình xử lý" });
  }
});
//  Add new channel
channelRouter.post("/", async (req, res) => {
  const { channelValue } = req.body;
  console.log(channelValue)
  const channelData = await getChannelData(channelValue);
  try {
    // Kiểm tra xem channel
    if (channelData) {
      try {
        // Kiểm tra xem tag đã tồn tại trong cơ sở dữ liệu chưa
        const existingChannel = await Channel.findOne({ channel_id: channelValue });
        if (existingChannel) {
          return res.status(400).json({ message: "Channel đã tồn tại" });
        }
        // Tạo tag mới và lưu vào cơ sở dữ liệu
        const newChannel = new Channel({
          channel_id: channelValue,
          channel_name: channelData.channelName,
          channel_link: channelData.channelLink
        });
        await newChannel.save();
        // Trả về thông tin của tag mới đã tạo
        res.json(newChannel);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Có lỗi trong quá trình xử lý" });
      }
    } else {
      res.status(404).json({ message: 'Không tìm thấy channel' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});
// check channel data by ID
channelRouter.get("/:channelId", async (req, res) => {
  try {
    const channelId = req.params.channelId;
    if (channelData) {
      res.json(channelData);
    } else {
      res.status(404).json({ message: 'Không tìm thấy channel' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete channel
channelRouter.delete("/:channelId", async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const deletedChannel = await Channel.findOneAndDelete({ channel_id: channelId });
    if (!deletedChannel) {
      return res.status(404).json({ message: "Không tìm thấy channel có: " + channelId });
    }
    res.json({ message: "Bỏ theo dõi channel thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi trong quá trình xử lý" });
  }
});

channelRouter.get("/report/:channelId", async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const channel = await Channel.findOne({ channel_id: channelId });

    if (!channel) {
      return res.status(404).json({ message: "Không tìm thấy kênh tương ứng" });
    }

    const videos = await Video.find({ vd_channel: channel.channel_name });
    const positiveVideos = videos.filter((video) => video.vd_label === 1);
    const negativeVideos = videos.filter((video) => video.vd_label === 0);
    const neuralVideos = videos.filter((video) => video.vd_label === 2);

    const positiveCount = positiveVideos.length;
    const negativeCount = negativeVideos.length;
    const neuralCount = neuralVideos.length;

    const interactionCount = videos.reduce((total, video) => total + video.vd_react, 0);

    // Lấy max 4 video có vd_react lớn nhất và 4 video có vd_comment lớn nhất
    const topReactVideos = videos
      .sort((a, b) => b.vd_react - a.vd_react)
      .slice(0, 4);
    const topCommentVideos = videos
      .sort((a, b) => b.vd_comment - a.vd_comment)
      .slice(0, 4);

    // Gộp lại và loại bỏ video trùng
    const topVideosSet = new Set([...topReactVideos, ...topCommentVideos].map((video) => video._id.toString()));
    const topVideos = [...topVideosSet].map((videoId) => videos.find((video) => video._id.toString() === videoId));

    // Lấy danh sách các chủ đề đăng tải và đếm số lượng video cho mỗi chủ đề
    const tag_counts = {};
    videos.forEach((video) => {
      const tag = video.vd_tag;
      if (!tag_counts[tag]) {
        tag_counts[tag] = 1;
      } else {
        tag_counts[tag]++;
      }
    });
    const tags = Object.keys(tag_counts)
      .sort((a, b) => tag_counts[b] - tag_counts[a])
      .slice(0, 5);

    const tag_info = tags.map((tag) => ({
      vd_tag: tag,
      video_count: videos.filter((video) => video.vd_tag === tag).length,
    }));

    // Tạo một đối tượng để theo dõi các điều hướng và số lượng video liên quan
    const navigationCounts = {};

    videos.forEach((video) => {
      if (video.vd_links) {
        video.vd_links.forEach((link) => {
          if (!navigationCounts[link]) {
            navigationCounts[link] = { video_count: 1 };
          } else {
            navigationCounts[link].video_count++;
          }
        });
      }
    });

    // Chuyển danh sách điều hướng thành mảng và sắp xếp từ lớn đến bé
    const navigationArray = Object.entries(navigationCounts)
      .map(([link, { video_count }]) => ({ navigation_link: link, video_count }))
      .sort((a, b) => b.video_count - a.video_count);

    // Lấy tối đa 5 điều hướng
    const topNavigation = navigationArray.slice(0, 5);


    // Tạo đối tượng báo cáo
    const report = {
      channel_name: channel.channel_name,
      channel_link: channel.channel_link,
      positive_count: positiveCount,
      negative_count: negativeCount,
      neural_count: neuralCount,
      interaction_count: interactionCount,
      topVideos: topVideos,
      tags: tag_info,
      topNavigation: topNavigation,
    };

    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi trong quá trình xử lý" + error });
  }
});

export default channelRouter;