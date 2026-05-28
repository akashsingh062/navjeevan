import { connectToDatabase } from "./db";
import { NoticeModel, GalleryModel, FacultyModel, ContactModel } from "./models";
import { defaultNotices } from "./data/notices";
import { defaultFaculty } from "./data/faculty";
import { defaultGallery } from "./data/gallery";
import { defaultFacilities } from "./data/facilities";
import { Notice, Faculty, GalleryItem, Facility, ContactInquiry } from "@/types";
import { deleteCloudinaryAsset } from "./cloudinary";

interface DBNotice {
  _id: { toString(): string };
  title: string;
  description: string;
  date: string;
  category: "General" | "Exam" | "Holiday" | "Admission" | "Others";
  isImportant?: boolean;
  importanceColor?: "blue" | "red" | "amber" | "green" | "purple";
  attachmentUrl?: string;
}

interface DBFaculty {
  _id: { toString(): string };
  name: string;
  subject: string;
  qualification?: string;
  experience?: string;
  imageUrl?: string;
  order?: number;
}

interface DBGalleryItem {
  _id: { toString(): string };
  imageUrl: string;
  category: "Annual Function" | "Sports Day" | "Classroom Activities" | "Cultural Events" | "Independence Day" | "Prize Distribution" | "Others";
  title: string;
  uploadedAt: string;
}


async function isDbConnected(): Promise<boolean> {
  try {
    const conn = await connectToDatabase();
    return conn !== null;
  } catch {
    console.warn("Database connection failed. Falling back to local static data.");
    return false;
  }
}


async function ensureDbSeeded() {
  try {
    const noticesCount = await NoticeModel.countDocuments();
    if (noticesCount === 0 && defaultNotices.length > 0) {
      await NoticeModel.insertMany(defaultNotices);
      console.log("Seeded database with default school notices.");
    }

    const facultyCount = await FacultyModel.countDocuments();
    if (facultyCount === 0 && defaultFaculty.length > 0) {
      await FacultyModel.insertMany(defaultFaculty);
      console.log("Seeded database with default school faculty.");
    }

    const galleryCount = await GalleryModel.countDocuments();
    if (galleryCount === 0 && defaultGallery.length > 0) {
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
      const rawNotices = await NoticeModel.find({}).sort({ isImportant: -1, date: -1 }).lean() as unknown as DBNotice[];
      return rawNotices.map((n: DBNotice) => ({
        id: n._id.toString(),
        title: n.title,
        description: n.description,
        date: n.date,
        category: n.category,
        isImportant: !!n.isImportant,
        importanceColor: n.importanceColor || "blue",
        attachmentUrl: n.attachmentUrl || ""
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
      const rawFaculty = await FacultyModel.find({}).sort({ order: 1, name: 1 }).lean() as unknown as DBFaculty[];
      return rawFaculty.map((f: DBFaculty) => ({
        id: f._id.toString(),
        name: f.name,
        subject: f.subject,
        qualification: f.qualification || "",
        experience: f.experience || "",
        imageUrl: f.imageUrl || "",
        order: f.order || 99
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
      const rawGallery = await GalleryModel.find({}).sort({ uploadedAt: -1 }).lean() as unknown as DBGalleryItem[];
      return rawGallery.map((g: DBGalleryItem) => ({
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
  
  return defaultFacilities;
}


export async function createNotice(notice: Omit<Notice, "id" | "_id">): Promise<Notice> {
  if (await isDbConnected()) {
    const doc = await NoticeModel.create(notice);
    return {
      id: doc._id.toString(),
      ...notice
    };
  }
  
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

export async function updateNotice(id: string, notice: Omit<Notice, "id" | "_id">): Promise<Notice | null> {
  if (await isDbConnected()) {
    try {
      const doc = await NoticeModel.findByIdAndUpdate(id, notice, { new: true });
      if (doc) {
        return {
          id: doc._id.toString(),
          title: doc.title,
          description: doc.description,
          date: doc.date,
          category: doc.category,
          isImportant: doc.isImportant,
          importanceColor: doc.importanceColor || "blue",
          attachmentUrl: doc.attachmentUrl || ""
        };
      }
      return null;
    } catch (err) {
      console.error("Failed to update notice in database:", err);
      return null;
    }
  }
  const index = defaultNotices.findIndex(n => n.id === id);
  if (index !== -1) {
    const updated = {
      id,
      ...notice
    };
    defaultNotices[index] = updated;
    return updated;
  }
  return null;
}

export async function deleteNotice(id: string): Promise<boolean> {
  if (await isDbConnected()) {
    try {
      const doc = await NoticeModel.findById(id);
      if (doc) {
        if (doc.attachmentUrl) {
          await deleteCloudinaryAsset(doc.attachmentUrl);
        }
        await NoticeModel.findByIdAndDelete(id);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to delete notice from database:", err);
      return false;
    }
  }
  const index = defaultNotices.findIndex(n => n.id === id);
  if (index !== -1) {
    defaultNotices.splice(index, 1);
    return true;
  }
  return false;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  if (await isDbConnected()) {
    try {
      const doc = await GalleryModel.findById(id);
      if (doc) {
        if (doc.imageUrl) {
          await deleteCloudinaryAsset(doc.imageUrl);
        }
        await GalleryModel.findByIdAndDelete(id);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to delete gallery item from database:", err);
      return false;
    }
  }
  const index = defaultGallery.findIndex(g => g.id === id);
  if (index !== -1) {
    defaultGallery.splice(index, 1);
    return true;
  }
  return false;
}

export async function deleteFacultyMember(id: string): Promise<boolean> {
  if (await isDbConnected()) {
    try {
      const doc = await FacultyModel.findById(id);
      if (doc) {
        if (doc.imageUrl) {
          await deleteCloudinaryAsset(doc.imageUrl);
        }
        await FacultyModel.findByIdAndDelete(id);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to delete faculty member from database:", err);
      return false;
    }
  }
  const index = defaultFaculty.findIndex(f => f.id === id);
  if (index !== -1) {
    defaultFaculty.splice(index, 1);
    return true;
  }
  return false;
}
