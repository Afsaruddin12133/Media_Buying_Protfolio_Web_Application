const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true }, // URL link
  thumbnail: { type: String } // Optional Cloudinary URL or Unsplash
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
