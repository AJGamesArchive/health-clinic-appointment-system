// Imports
import mongoose from 'mongoose';

/**
 * Accounts schema
 */
const accountsSchema = new mongoose.Schema({
  title: String,
  forenames: String,
  surname: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date,
  updatedAt: Date,
  accountData: Object,
});

/**
 * Accounts model
 */
const Accounts = mongoose.model('accounts', accountsSchema);

export default Accounts;