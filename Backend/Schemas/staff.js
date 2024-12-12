const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  assignedAnimals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
});

module.exports = mongoose.model('Staff', staffSchema);
