import mongoose from 'mongoose'
const tagsSchema = new mongoose.Schema({
    vd_tag:String,
    crawled:Boolean
})
const Tag = mongoose.model('Tag',tagsSchema)

export default Tag;