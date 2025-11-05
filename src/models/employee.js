const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    name: 
    { 
      type: String,
      required: true 
    },
    email: 
    { type: String,
      required: true,
      unique: true 
    },
    mobileNo:
    { type: String,
      required: true
    },
    designation:{ 
      type: String,
      required: true
    },
    gender:{ 
      type: String,
      enum: ['M', 'F']
    },
    course:
    { 
      type: [String]
    },
    createDate: 
    { 
      type: Date,
      default:Date.now 
    }
  },
  { 
    timestamps: true 
  });

module.exports = mongoose.model('Employee', EmployeeSchema);
