import React from "react";
import { Notice } from "@/types";
import { Calendar, AlertCircle, Paperclip } from "lucide-react";

interface NoticeCardProps {
  notice: Notice;
}

export default function NoticeCard({ notice }: NoticeCardProps) {
  // Format date helper (simple format to ensure fast execution and zero third-party dependencies)
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  // Get color configurations based on category
  const categoryStyles = {
    Admission: { bg: "bg-blue-50 text-blue-800 border-blue-200", badge: "bg-blue-600 text-white" },
    Holiday: { bg: "bg-emerald-50 text-emerald-800 border-emerald-200", badge: "bg-emerald-600 text-white" },
    Exam: { bg: "bg-red-50 text-red-800 border-red-200", badge: "bg-red-600 text-white" },
    General: { bg: "bg-amber-50 text-amber-800 border-amber-200", badge: "bg-amber-600 text-white" }
  };

  const style = categoryStyles[notice.category] || categoryStyles.General;

  return (
    <article 
      className={`p-5 rounded-2xl border transition-all ${
        notice.isImportant 
          ? "border-primary bg-primary/5 shadow-sm" 
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        {/* Category Tag */}
        <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${style.badge}`}>
          {notice.category}
        </span>

        {/* Date Display */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-body font-medium">
          <Calendar className="w-3.5 h-3.5 text-neutral-body" />
          <time dateTime={notice.date}>{formatDate(notice.date)}</time>
        </div>
      </div>

      {/* Notice Title */}
      <h3 className="text-base font-extrabold text-neutral-dark mb-2 flex items-start gap-2 leading-snug">
        {notice.isImportant && (
          <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-label="Important Announcement" />
        )}
        <span>{notice.title}</span>
      </h3>

      {/* Notice Body Text */}
      <p className="text-sm text-neutral-body leading-relaxed font-normal whitespace-pre-line">
        {notice.description}
      </p>

      {notice.attachmentUrl && (
        <div className="mt-4 pt-3.5 border-t border-gray-100 flex">
          <a
            href={notice.attachmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-extrabold transition-all cursor-pointer"
          >
            <Paperclip className="w-3.5 h-3.5" />
            <span>Download / View Official Circular</span>
          </a>
        </div>
      )}
    </article>
  );
}
