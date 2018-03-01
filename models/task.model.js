'use strict';
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { _id: false });

taskSchema.plugin(AutoIncrement);
module.exports = mongoose.model('task', taskSchema);