// Imports
import mongoose from 'mongoose';

/**
 * Accounts schema
 */
const accountsSchema = new mongoose.Schema({
  name: String,
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