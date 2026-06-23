const express = require('express');
const router = express.Router();
const CaseStudy = require('../models/CaseStudy');
const auth = require('../middleware/auth');
const upload = require('../config/cloudinary');

// @route   GET api/case-studies
// @desc    Get all case studies
// @access  Public
router.get('/', async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find().sort({ createdAt: -1 });
    res.json(caseStudies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/case-studies
// @desc    Add new case study
// @access  Private
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const { title, category, tag, details, metrics } = req.body;
    let parsedMetrics = {};
    if (metrics) {
      try {
        parsedMetrics = typeof metrics === 'string' ? JSON.parse(metrics) : metrics;
      } catch(e) {
        console.log("Error parsing metrics");
      }
    }
    
    const newCaseStudy = new CaseStudy({
      title,
      category,
      tag,
      details,
      metrics: parsedMetrics,
      image: req.file ? req.file.path : ''
    });

    const caseStudy = await newCaseStudy.save();
    res.json(caseStudy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/case-studies/:id
// @desc    Delete case study
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    if (!caseStudy) return res.status(404).json({ msg: 'Case study not found' });

    await CaseStudy.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Case study removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
