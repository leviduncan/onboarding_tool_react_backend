const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OnboardingTaskSchema = new Schema({
  employee_id: { type: String, required: true },
  task_id: { type: String, required: true },
  task_name: { type: String, required: true },
  task_description: { type: String },
  deadline: { type: Date },
  completion_date: { type: Date },
  status: {
    type: String,
    required: true,
    enum: ["assigned", "completed", "expired"]
  },
  assigned_by: {
    type: {
      name: { type: String },
      contact_details: {
        email: { type: String },
        phone: { type: String }
      }
    }
  },
  assigned_to: {
    type: {
      name: { type: String },
      contact_details: {
        email: { type: String },
        phone: { type: String }
      }
    }
  },
  comments: [
    {
      text: { type: String },
      date: { type: Date },
      author: {
        name: { type: String },
        contact_details: {
          email: { type: String },
          phone: { type: String }
        }
      }
    }
  ],
  documents: [
    {
      title: { type: String },
      link: { type: String }
    }
   ],
  onboarding_period: {
    start_date: { type: Date },
    end_date: { type: Date }
  },
  onboarding_status: {
    type: String,
    required: true,
    enum: ["pending", "in-progress", "completed", "delayed"]
  }
});

module.exports = mongoose.model("OnboardingTask", OnboardingTaskSchema);