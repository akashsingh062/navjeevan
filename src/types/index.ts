export interface Notice {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  date: string; 
  category: string;
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
  experience?: string; 
  imageUrl?: string;
  order?: number;
}

export interface GalleryItem {
  _id?: string;
  id?: string;
  imageUrl: string;
  category: string;
  title: string;
  uploadedAt: string; 
}


export interface Facility {
  id: string;
  title: string | { en: string; hi: string };
  description: string | { en: string; hi: string };
  iconName: string; 
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
