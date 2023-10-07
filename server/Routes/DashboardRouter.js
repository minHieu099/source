import express from "express";
import Channel from "../Models/ChannelModel.js";
import Video from "../Models/VideoModel.js";
import Tag from "../Models/TagModel.js";

const dashboardRouter = express.Router()


dashboardRouter.get("/", async (req, res) => {
    try {
        // Sort by top 7
        const videos = await Video.aggregate([
            { $match: { vd_label: 0 } },
            { $sort: { vd_react: -1, vd_comment: -1 } },
            { $limit: 7 }
        ]);
        // Top channel all
        const by_channels_list = await Video.aggregate([
            { $unwind: "$vd_tag" },
            { $match: { vd_label: 0 } },
            { $group: { _id: "$vd_channel", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        // channel follow
        const channels_list = await Channel.find({});
        //  tag follow 
        const tag_list = await Tag.find({});
        // Top tag all
        const by_tag_list = await Video.aggregate([
            { $unwind: "$vd_tag" },
            { $group: { _id: "$vd_tag", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ]);

        res.json({
            videosTop7: videos,
            by_channel_list:by_channels_list,
            channel_follow:channels_list,
            tag_follow:tag_list,
            by_tag_list:by_tag_list
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Có lỗi trong quá trình xử lý" });
    }
})

export default dashboardRouter;