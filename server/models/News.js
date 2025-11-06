const mongoose = require('mongoose');

// News Article Schema Definition
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  source: {
    type: String,
    required: [true, 'Source is required'],
    trim: true
  },
  author: {
    type: String,
    default: 'Unknown'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['technology', 'business', 'sports', 'entertainment', 'health', 'politics', 'science', 'world'],
    lowercase: true
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    enum: ['en', 'hi', 'ta', 'fr', 'es', 'de'],
    default: 'en'
  },
  image_url: {
    type: String,
    default: 'https://source.unsplash.com/800x400/?news'
  },
  article_url: {
    type: String,
    default: '#'
  },
  published_date: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
newsSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
