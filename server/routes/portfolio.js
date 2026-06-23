const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const upload = require('../config/cloudinary');

// @route   GET api/portfolio
// @desc    Get all portfolio items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Portfolio.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/portfolio
// @desc    Add new portfolio item
// @access  Private
// We'll allow a thumbnail upload, but videoUrl is just a string.
router.post('/', [auth, upload.single('thumbnail')], async (req, res) => {
  try {
    const { title, category, description, videoUrl } = req.body;

    const newItem = new Portfolio({
      title,
      category,
      description,
      videoUrl,
      thumbnail: req.file ? req.file.path : ''
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/portfolio/:id
// @desc    Delete portfolio item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
