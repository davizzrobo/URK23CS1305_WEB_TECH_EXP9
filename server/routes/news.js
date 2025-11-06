const express = require('express');
const News = require('../models/News');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/news
// @desc    Get all news articles with filters
// @access  Public
router.get('/news', async (req, res) => {
  try {
    const { language, category, limit = 20 } = req.query;
    
    // Build filter object
    const filter = {};
    if (language) filter.language = language;
    if (category && category !== 'all') filter.category = category;
    
    // Get news articles
    const news = await News.find(filter)
      .sort({ published_date: -1 })
      .limit(parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: news.length,
      data: news
    });
    
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching news articles'
    });
  }
});

// @route   GET /api/news/:id
// @desc    Get single news article
// @access  Public
router.get('/news/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: news
    });
    
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching news article'
    });
  }
});

// @route   POST /api/news
// @desc    Create new news article
// @access  Private (requires authentication)
router.post('/news', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      source,
      author,
      category,
      language,
      image_url,
      article_url,
      published_date
    } = req.body;
    
    // Validation
    if (!title || !description || !content || !source || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }
    
    // Create news article
    const news = new News({
      title,
      description,
      content,
      source,
      author,
      category,
      language: language || 'en',
      image_url: image_url || 'https://source.unsplash.com/800x400/?news',
      article_url: article_url || '#',
      published_date: published_date || Date.now(),
      created_by: req.user.userId
    });
    
    await news.save();
    
    res.status(201).json({
      success: true,
      message: 'News article created successfully',
      data: news
    });
    
  } catch (error) {
    console.error('Create news error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages[0]
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating news article'
    });
  }
});

// @route   PUT /api/news/:id
// @desc    Update news article
// @access  Private
router.put('/news/:id', auth, async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'News article updated successfully',
      data: news
    });
    
  } catch (error) {
    console.error('Update news error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating news article'
    });
  }
});

// @route   DELETE /api/news/:id
// @desc    Delete news article
// @access  Private
router.delete('/news/:id', auth, async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'News article deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting news article'
    });
  }
});

module.exports = router;
