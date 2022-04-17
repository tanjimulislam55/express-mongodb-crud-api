module.exports = mongoose => {
    const paragraphSchema = mongoose.Schema(
        {
            description: String,
            serial: Number
        }
    )
    const blogSchema = mongoose.Schema(
        {
            title: String,
            author: String,
            paragraphs: [paragraphSchema]
        },
        {
            timestamps: true
        }
    )
    const Blog = mongoose.model("Blog", blogSchema)
    return Blog;
}