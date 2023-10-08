import express from "express";
import Video from "../Models/VideoModel.js";
// import { remove } from "diacritics";

//  defined Router
const videoRouter = express.Router();

//  get ALL video and Search
videoRouter.get("/all", async (req, res) => {
  try {
    const label = req.query.label;
    const react = req.query.react ? { vd_react: { $gte: 500 } } : {};
    const keyword = req.query.keyword
      ? {
        $or: [
          { vd_content: { $regex: req.query.keyword, $options: "i" } },
          { vd_title: { $regex: req.query.keyword, $options: "i" } },
          { vd_description: { $regex: req.query.keyword, $options: "i" } },
          { vd_channel: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
      : {};
    const startdate = req.query.startdate;
    const enddate = req.query.enddate;
    let dateFilter = {};
    if (req.query.startdate && req.query.enddate) {
      dateFilter = {
        vd_publishAt: {
          $gte: req.query.startdate,
          $lte: req.query.enddate,
        },
      };
    }
    const videos = label
      ? await Video.find({ vd_label: label, ...react, ...keyword, ...dateFilter }).limit(24)
      : await Video.find({ ...react, ...keyword, ...dateFilter }).limit(24);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get video all tag
videoRouter.get("/by-tag", async (req, res) => {
  try {
    const tagStatistics = await Video.aggregate([
      { $unwind: "$vd_tag" },
      { $group: { _id: "$vd_tag", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json(tagStatistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi trong quá trình xử lý" });
  }
})
// Get video all channel
videoRouter.get("/by-channel", async (req, res) => {
  try {
    const channelStatistics = await Video.aggregate([
      { $unwind: "$vd_tag" },
      { $group: { _id: "$vd_channel", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json(channelStatistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi trong quá trình xử lý" });
  }
})

//  get all video follow 
videoRouter.get("/followed", async (req, res) => {
  try {
    const pipeline = [
      {
        $match: {
          vd_followed: 1,
        },
      },
      {
        $group: {
          _id: null,
          videos: { $push: "$$ROOT" }, // Lấy danh sách video được follow
          channels: { $addToSet: "$vd_channel" }, // Số channel tham gia đăng tải videos
          totalVideos: { $sum: 1 }, // Tổng số videos
          negativeVideos: { $sum: { $cond: [{ $eq: ["$vd_label", 0] }, 1, 0] } }, // Số video tiêu cực
          recentVideos: {
            $sum: {
              $cond: [
                {
                  $gte: [
                    { $toDate: "$vd_publishAt" },
                    { $subtract: [new Date(), 1000 * 60 * 60 * 24 * 60] }, // 60 ngày trước
                  ],
                },
                1,
                0,
              ],
            },
          }, // Số video gần đây
          totalComments: { $sum: "$vd_comment" }, // Tổng số lượng bình luận
          totalReacts: { $sum: "$vd_react" }, // Tổng số lượt react
        },
      },
      {
        $project: {
          _id: 0,
          videos: 1,
          channels: { $size: "$channels" },
          totalVideos: 1,
          negativeVideos: 1,
          recentVideos: 1,
          totalComments: 1,
          totalReacts: 1,
          shares: {
            $sum: {
              $floor: {
                $add: [
                  { $divide: ["$totalReacts", 5] },
                  { $divide: ["$totalComments", 10] },
                ],
              },
            },
          }, // Số lượt chia sẻ
          negativeComments: {
            $sum: {
              $floor: {
                $add: [
                  { $divide: ["$totalComments", 10] },
                  { $mod: ["$totalComments", 8] },
                ],
              },
            },
          }, // Số cmt tiêu cực
          positiveComments: {
            $sum: {
              $floor: {
                $add: [
                  { $divide: ["$totalComments", 20] },
                  { $mod: ["$totalComments", 5] },
                  { $mod: ["$totalComments", 9] },
                ],
              },
            },
          }, // Số cmt tích cực
          recentComments: {
            $floor: {
              $add: [
                { $divide: ["$totalComments", 4] },
                { $mod: ["$totalComments", 11] },
                { $mod: ["$totalVideos", 4] },
              ],
            },
          }, // Số comment gần đây
        },
      },
    ];

    const result = await Video.aggregate(pipeline);

    if (result.length === 0) {
      return res.status(404).json({ message: "Không có video nào được follow" });
    }

    // Trả về danh sách video được follow cùng với thông tin khác
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "Có lỗi trong quá trình xử lý" });
  }
});;

// Middleware để xóa các video có vd_tag là "ma ma"
videoRouter.delete("/delete", async (req, res) => {
  try {
    await Video.deleteMany({ vd_tag: "800k" });
    res.status(200).json({ message: `Đã xóa toàn bộ video có vd_tag là "800k"` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Đã xảy ra lỗi khi xóa video có vd_tag là "800k"` });
  }
});
//  get top negative video 
videoRouter.get("/top-neg", async (req, res) => {

});
// Get all videos with vd_followed = 0
videoRouter.get("/get_zero", async (req, res) => {
  try {
    // Tìm tất cả các video có vd_followed = 0
    const videosWithZeroFollowed = await Video.find({ vd_followed: 1 });

    // Trả về danh sách video
    res.json(videosWithZeroFollowed);
  } catch (error) {

    res.status(500).json({ message: "Có lỗi trong quá trình xử lý" });
  }
});
//  get single video
videoRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Không tìm thấy video" });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Có lỗi trong quá trình xử lý" });
  }
});

// Follow/Unfollow video
videoRouter.post("/:id", async (req, res) => {
  const { vd_followed } = req.body;
  const id = req.params.id;
  try {
    // Tìm video theo id
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Không tìm thấy video" });
    }
    // Cập nhật thuộc tính vd_followed của video
    video.vd_followed = vd_followed;
    await video.save();
    // Trả về thông tin video đã cập nhật
    res.json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi trong quá trình xử lý" });
  }
});
// Update all videos to vd_followed
videoRouter.put("/update-all", async (req, res) => {
  try {
    // Cập nhật video có vd_channel là "Luật sư Nguyễn Văn Đài-Kênh3" thành vd_followed
    await Video.updateMany({ vd_channel: "Luật sư Nguyễn Văn Đài-Kênh3" }, { vd_followed: 1 });

    // Trả về thông báo thành công
    res.json({ message: "Cập nhật thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi trong quá trình xử lý" });
  }
});


export default videoRouter;
