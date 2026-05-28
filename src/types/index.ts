export interface Notice {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  date: string; // ISO String format
  category: 'General' | 'Exam' | 'Holiday' | 'Admission' | 'Others';
  isImportant?: boolean;
  importanceColor?: 'red' | 'amber' | 'green' | 'blue' | 'purple';
  attachmentUrl?: string;
}

export interface Faculty {
  _id?: string;
  id?: string;
  name: string;
  subject: string;
  qualification?: string;
  experience?: string; // e.g. "8+ Years"
  imageUrl?: string;
  order?: number;
}

export interface GalleryItem {
  _id?: string;
  id?: string;
  imageUrl: string;
  category: 'Annual Function' | 'Sports Day' | 'Classroom Activities' | 'Cultural Events' | 'Independence Day' | 'Prize Distribution' | 'Others';
  title: string;
  uploadedAt: string; // ISO String format
}


export interface Facility {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
}

export interface ContactInquiry {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: string;
}

export interface SchoolStat {
  value: string;
  label: string;
  iconName: string;
}
