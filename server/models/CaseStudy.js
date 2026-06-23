const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary URL
  tag: { type: String },
  details: { type: String },
  metrics: {
    duration: String,
    spent: String,
    result: String,
    ctr: String,
    roas: String
  }
}, { timestamps: true });

module.exports = mongoose.model('CaseStudy', caseStudySchema);
