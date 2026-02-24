import mongoose from 'mongoose';

const vocabularySchema = new mongoose.Schema({
  english: {
    type: String,
    required: [true, 'English text is required'],
    trim: true,
  },
  japanese: {
    type: String,
    required: [true, 'Japanese text is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vocabulary =
  mongoose.models.Vocabulary || mongoose.model('Vocabulary', vocabularySchema);

export default Vocabulary;
