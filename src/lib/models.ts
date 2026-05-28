import mongoose, { Schema } from "mongoose";


const NoticeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true }, 
  category: { 
    type: String, 
    enum: ["General", "Exam", "Holiday", "Admission", "Others"], 
    required: true 
  },
  isImportant: { type: Boolean, default: false },
  importanceColor: { type: String, default: "blue" }, 
  attachmentUrl: { type: String, default: "" }
}, { timestamps: true });


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
      "Prize Distribution",
      "Others"
    ], 
    required: true 
  },
  title: { type: String, required: true },
  uploadedAt: { type: String, required: true } 
}, { timestamps: true });


const FacultySchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  qualification: { type: String, default: "" },
  experience: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  order: { type: Number, default: 0 }
}, { timestamps: true });


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
