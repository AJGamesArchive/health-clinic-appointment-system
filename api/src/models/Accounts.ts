// Imports
import mongoose from 'mongoose';

/**
 * Accounts schema
 * @AJGamesArchive
 */
const accountsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  forenames: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Doctor', 'Patient', 'Admin'],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  accountData: {
    type: Object,
    required: true,
  },
}, {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

/**
 * Accounts model
 * @AJGamesArchive
 */
const DB_Accounts = mongoose.model('accounts', accountsSchema);

export default DB_Accounts;