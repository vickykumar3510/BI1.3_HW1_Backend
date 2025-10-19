const { kStringMaxLength } = require("buffer")
const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publishedYear: Number,
    genre:[{
        type: String,
        enum: ["Fiction", "Historical", "Romance", "Fantasy", "Mystery", "Thriller", "Non-Fiction", "Self-help", "Business", "Non-fiction", "Autobiography"],
    }],
    language: String,
    country: String,
    rating: Number,
    summary: String,
    coverImageUrl: String,
},
{
    timestamps: true,
})

const Books = mongoose.model("Books", bookSchema)

module.exports = Books