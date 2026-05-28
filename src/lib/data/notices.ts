import { Notice } from "@/types";

export const defaultNotices: Notice[] = [
  {
    id: "notice-1",
    title: "Admissions Open for Academic Session 2026-27",
    description: "Admissions are now open for Nursery to Class X. Application forms are available at the school office from 8:00 AM to 1:00 PM. Special scholarship programs are available for bright students from rural areas. Contact the admission cell for details.",
    date: "2026-05-20T10:00:00.000Z",
    category: "Admission",
    isImportant: true
  },
  {
    id: "notice-2",
    title: "Announcement of Summer Vacation 2026",
    description: "The school will remain closed for summer vacation from June 1st, 2026 to July 5th, 2026 due to the intense summer heat wave in Uttar Pradesh. Online homework modules have been shared. School will re-open on July 6th, 2026 with normal timings (7:30 AM to 12:30 PM).",
    date: "2026-05-25T08:00:00.000Z",
    category: "Holiday",
    isImportant: true
  },
  {
    id: "notice-3",
    title: "CBSE Class X Board Examination Date Sheet Outline",
    description: "Preliminary datesheets for the upcoming internal mock examinations have been posted on the main notice board. Regular classes will continue alongside remedial sessions for subjects like Mathematics and Science. All parents are requested to ensure regular attendance.",
    date: "2026-05-18T09:00:00.000Z",
    category: "Exam",
    isImportant: false
  },
  {
    id: "notice-4",
    title: "Free Textbook Distribution Under Welfare Scheme",
    description: "Bilingual (Hindi/English medium) textbooks will be distributed to eligible elementary students under the state welfare scheme. Please collect from respective class teachers with valid student IDs on Friday, May 29th.",
    date: "2026-05-24T11:30:00.000Z",
    category: "General",
    isImportant: false
  },
  {
    id: "notice-5",
    title: "Parent-Teacher Meeting (PTM) for Term-1 Progress",
    description: "The third PTM of this semester is scheduled for Saturday, June 10th from 8:30 AM to 11:30 AM to review results and student health. Parents are requested to attend and meet their ward's class teachers.",
    date: "2026-05-27T07:15:00.000Z",
    category: "General",
    isImportant: false
  }
];
