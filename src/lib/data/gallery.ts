import { GalleryItem } from "@/types";

export const defaultGallery: GalleryItem[] = [
  {
    imageUrl: "/anual.jpg",
    category: "Annual Function",
    title: "Students Performing Cultural Dance on Annual Day",
    uploadedAt: new Date(2026, 1, 15).toISOString()
  },
  {
    imageUrl: "/national.jpg",
    category: "Cultural Events",
    title: "Independence Day Flag Hoisting & Celebrations",
    uploadedAt: new Date(2025, 7, 15).toISOString()
  },
  {
    imageUrl: "/quiz.jpg",
    category: "Classroom Activities",
    title: "Inter-House Science & General Knowledge Quiz Contest",
    uploadedAt: new Date(2025, 10, 5).toISOString()
  },
  {
    imageUrl: "/img-2.jpg",
    category: "Classroom Activities",
    title: "Active Smart Classroom Learning Session",
    uploadedAt: new Date(2025, 8, 10).toISOString()
  },
  {
    imageUrl: "/img-3.jpg",
    category: "Classroom Activities",
    title: "Students Practicing Coding in Computer Science Lab",
    uploadedAt: new Date(2025, 8, 12).toISOString()
  }
];

