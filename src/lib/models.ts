import mongoose, { Schema } from "mongoose";

// Notice Schema
const NoticeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true }, // ISO String
  category: { 
    type: String, 
    enum: ["General", "Exam", "Holiday", "Admission"], 
    required: true 
  },
  isImportant: { type: Boolean, default: false },
  attachmentUrl: { type: String, default: "" }
}, { timestamps: true });

// Gallery Schema
const GallerySchema = new Schema({
  imageUrl: { type: String, required: true },
  category: { 
    type: String, 
    enum: [
      "Annual Function", 
      "Sports Day", 
      "Classroom Activities", 
      "Cultural Events", 
      "Independence Day", 
      "Prize Distribution"
    ], 
    required: true 
  },
  title: { type: String, required: true },
  uploadedAt: { type: String, required: true } // ISO String
}, { timestamps: true });

// Faculty Schema
const FacultySchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Contact Inquiry Schema
const ContactInquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

export const NoticeModel = mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
export const GalleryModel = mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
export const FacultyModel = mongoose.models.Faculty || mongoose.model("Faculty", FacultySchema);
export const ContactModel = mongoose.models.ContactInquiry || mongoose.model("ContactInquiry", ContactInquirySchema);
