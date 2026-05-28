import React from "react";
import { Notice } from "@/types";
import { Calendar, AlertTriangle, Paperclip, FileDown } from "lucide-react";

interface NoticeCardProps {
  notice: Notice;
}

export default function NoticeCard({ notice }: NoticeCardProps) {
  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      });
    } catch { return isoString; }
  };

  const categoryConfig = {
    Admission: { badge: "bg-blue-100 text-blue-800", border: "border-l-blue-500" },
    Holiday:   { badge: "bg-emerald-100 text-emerald-800", border: "border-l-emerald-500" },
    Exam:      { badge: "bg-red-100 text-red-800", border: "border-l-red-500" },
    General:   { badge: "bg-amber-100 text-amber-800", border: "border-l-amber-500" },
    Others:    { badge: "bg-purple-100 text-purple-800", border: "border-l-purple-500" },
  };

  const importanceBorder = {
    red:    "border-l-red-500",
    amber:  "border-l-amber-500",
    green:  "border-l-emerald-500",
    blue:   "border-l-blue-500",
    purple: "border-l-purple-500",
  };

  const cfg = categoryConfig[notice.category] || categoryConfig.General;
  const borderColor = notice.isImportant
    ? (importanceBorder[notice.importanceColor ?? "red"] ?? "border-l-red-500")
    : cfg.border;

  return (
    <article
      className={`bg-white rounded-2xl border border-border border-l-4 ${borderColor} shadow-sm overflow-hidden wrap-break-word transition-all hover:shadow-md`}
    >
      <div className="px-4 pt-4 pb-3">
        {/* Top row: badge + date */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${cfg.badge}`}>
            {notice.category}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-neutral-body font-medium shrink-0">
            <Calendar className="w-3 h-3" />
            <time dateTime={notice.date}>{formatDate(notice.date)}</time>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-extrabold text-neutral-dark leading-snug flex items-start gap-1.5 wrap-break-word">
          {notice.isImportant && (
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" aria-label="Important" />
          )}
          <span>{notice.title}</span>
        </h3>

        {/* Description */}
        <p className="text-xs text-neutral-body leading-relaxed mt-2 whitespace-pre-line wrap-break-word line-clamp-3">
          {notice.description}
        </p>
      </div>

      {/* Attachment — full width tap area */}
      {notice.attachmentUrl && (
        <a
          href={`/api/notices/download?url=${encodeURIComponent(notice.attachmentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 bg-primary-light border-t border-border text-primary text-xs font-bold transition-colors hover:bg-primary/15 active:bg-primary/20 w-full"
        >
          <div className="flex items-center gap-1.5 flex-1">
            <Paperclip className="w-3.5 h-3.5 shrink-0" />
            <span>View / Download Circular</span>
          </div>
          <FileDown className="w-3.5 h-3.5 shrink-0" />
        </a>
      )}
    </article>
  );
}
