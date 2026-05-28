import { connectToDatabase } from "./db";
import { NoticeModel, GalleryModel, FacultyModel, ContactModel } from "./models";
import { defaultNotices } from "./data/notices";
import { defaultFaculty } from "./data/faculty";
import { defaultGallery } from "./data/gallery";
import { defaultFacilities } from "./data/facilities";
import { Notice, Faculty, GalleryItem, Facility, ContactInquiry } from "@/types";

// Helper to check if DB is connected
async function isDbConnected(): Promise<boolean> {
  try {
    const conn = await connectToDatabase();
    return conn !== null;
  } catch (error) {
    console.warn("Database connection failed. Falling back to local static data.");
    return false;
  }
}

// Populate database with default records if empty
async function ensureDbSeeded() {
  try {
    const noticesCount = await NoticeModel.countDocuments();
    if (noticesCount === 0) {
      await NoticeModel.insertMany(defaultNotices);
      console.log("Seeded database with default school notices.");
    }

    const facultyCount = await FacultyModel.countDocuments();
    if (facultyCount === 0) {
      await FacultyModel.insertMany(defaultFaculty);
      console.log("Seeded database with default school faculty.");
    }

    const galleryCount = await GalleryModel.countDocuments();
    if (galleryCount === 0) {
      await GalleryModel.insertMany(defaultGallery);
      console.log("Seeded database with default school gallery items.");
    }
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

export async function getNotices(): Promise<Notice[]> {
  if (await isDbConnected()) {
    try {
      await ensureDbSeeded();
      const rawNotices = await NoticeModel.find({}).sort({ isImportant: -1, date: -1 }).lean();
      return rawNotices.map((n: any) => ({
        id: n._id.toString(),
        title: n.title,
        description: n.description,
        date: n.date,
        category: n.category,
        isImportant: n.isImportant
      }));
    } catch (err) {
      console.error("Failed to fetch notices from database, using static fallback:", err);
    }
  }
  return [...defaultNotices].sort((a, b) => {
    if (a.isImportant && !b.isImportant) return -1;
    if (!a.isImportant && b.isImportant) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getFaculty(): Promise<Faculty[]> {
  if (await isDbConnected()) {
    try {
      await ensureDbSeeded();
      const rawFaculty = await FacultyModel.find({}).sort({ order: 1, name: 1 }).lean();
      return rawFaculty.map((f: any) => ({
        id: f._id.toString(),
        name: f.name,
        subject: f.subject,
        qualification: f.qualification,
        experience: f.experience,
        imageUrl: f.imageUrl,
        order: f.order
      }));
    } catch (err) {
      console.error("Failed to fetch faculty from database, using static fallback:", err);
    }
  }
  return [...defaultFaculty].sort((a, b) => (a.order || 99) - (b.order || 99));
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (await isDbConnected()) {
    try {
      await ensureDbSeeded();
      const rawGallery = await GalleryModel.find({}).sort({ uploadedAt: -1 }).lean();
      return rawGallery.map((g: any) => ({
        id: g._id.toString(),
        imageUrl: g.imageUrl,
        category: g.category,
        title: g.title,
        uploadedAt: g.uploadedAt
      }));
    } catch (err) {
      console.error("Failed to fetch gallery from database, using static fallback:", err);
    }
  }
  return [...defaultGallery].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
}

export function getFacilities(): Facility[] {
  // Facilities remain static to reduce server payload
  return defaultFacilities;
}

// Data creation methods for Admin Dashboard
export async function createNotice(notice: Omit<Notice, "id" | "_id">): Promise<Notice> {
  if (await isDbConnected()) {
    const doc = await NoticeModel.create(notice);
    return {
      id: doc._id.toString(),
      ...notice
    };
  }
  // Local fallback mock append (simulated)
  const newNotice = {
    id: `notice-local-${Date.now()}`,
    ...notice
  };
  defaultNotices.unshift(newNotice);
  return newNotice;
}

export async function createGalleryItem(item: Omit<GalleryItem, "id" | "_id">): Promise<GalleryItem> {
  if (await isDbConnected()) {
    const doc = await GalleryModel.create(item);
    return {
      id: doc._id.toString(),
      ...item
    };
  }
  const newItem = {
    id: `gallery-local-${Date.now()}`,
    ...item
  };
  defaultGallery.unshift(newItem);
  return newItem;
}

export async function createFacultyMember(member: Omit<Faculty, "id" | "_id">): Promise<Faculty> {
  if (await isDbConnected()) {
    const doc = await FacultyModel.create(member);
    return {
      id: doc._id.toString(),
      ...member
    };
  }
  const newMember = {
    id: `faculty-local-${Date.now()}`,
    ...member
  };
  defaultFaculty.push(newMember);
  return newMember;
}

export async function saveContactInquiry(inquiry: Omit<ContactInquiry, "_id">): Promise<boolean> {
  if (await isDbConnected()) {
    try {
      await ContactModel.create(inquiry);
      return true;
    } catch (err) {
      console.error("Failed to save contact inquiry to DB:", err);
      return false;
    }
  }
  console.log("Mock saved inquiry:", inquiry);
  return true;
}
