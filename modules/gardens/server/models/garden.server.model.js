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
  area: {
    type: Number,
    default: 0.00,
    min: 0.00,
    max:1000000,
    required: 'Hãy nhập diên tích vườn',
  },
  approved:{
    type: Boolean,
    default: false
  },
  imgUrl: {
    type: String,
    default: 'modules/gardens/client/img/gardens/no-images.png'
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  vegetableList: 
  [{
    type: Schema.ObjectId,
    ref: 'Vegetablecat'}],
    isDeleted : {
      type: Boolean,
      default: false
    },
    deleteDate : {
      type : Date
    },
    isEdited: {
      type: Boolean,
      default : false
    },
    editDate: {
      type : Date
    }
  });
 mongoose.model('Garden', GardenSchema);
