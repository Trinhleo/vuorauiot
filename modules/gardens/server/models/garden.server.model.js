'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

/**
 * Garden Schema
 */
 var GardenSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Hãy nhập tên vườn',
    trim: true,
    unique: 'Tên vườn Đã tồn tại'
  },
  address: {
    type: String,
    default:'',
    required: 'Hãy nhập địa chỉ vườn',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  vegetableList: {
    type: Array,
    items: {
      type: Object,
      properties: {
        "name": {
          type: String
        },
        "quantity": {
          type: Number,
          default: 0,
          min: 0
        }
      }
    }
  }
});
 mongoose.model('Garden', GardenSchema);
