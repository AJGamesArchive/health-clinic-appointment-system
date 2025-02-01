// Imports
import mongoose from 'mongoose';

/**
 * Users schema
 */
const usersSchema = new mongoose.Schema({
  username: String,
  email: String,
});

/**
 * Users model
 */
const Users = mongoose.model('users', usersSchema);

export default Users;