// Imports
import mongoose from 'mongoose';

/**
 * Dockers schema
 */
const doctorsSchema = new mongoose.Schema({
  name: String,
  email: String,
});

/**
 * Doctors model
 */
const Doctors = mongoose.model('doctors', doctorsSchema);

export default Doctors;