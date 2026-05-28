"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Save, Paperclip, Edit, Trash2 } from "lucide-react";
import { Notice } from "@/types";

interface NoticeFormInput {
  title: string;
  description: string;
  category: string;
  isImportant: boolean;
  importanceColor?: string;
  attachmentUrl?: string;
}

interface NoticeFormSectionProps {
  noticesList: Notice[];
  refreshData: () => Promise<void>;
  triggerConfirm: (title: string, message: string, onConfirm: () => void) => void;
  status: "idle" | "saving" | "success" | "error";
  setStatus: (s: "idle" | "saving" | "success" | "error") => void;
}

export default function NoticeFormSection({
  noticesList,
  refreshData,
  triggerConfirm,
  status,
  setStatus,
}: NoticeFormSectionProps) {
  const noticeForm = useForm<NoticeFormInput>({
    defaultValues: { title: "", description: "", category: "General", isImportant: false, importanceColor: "blue" }
  });

  const [selectedColor, setSelectedColor] = useState("blue");
  const [noticeAttachmentUrl, setNoticeAttachmentUrl] = useState("");
  const [isNoticeAttachmentUploading, setIsNoticeAttachmentUploading] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [selectedNoticeIds, setSelectedNoticeIds] = useState<string[]>([]);

  const handleNoticeAttachmentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsNoticeAttachmentUploading(true);
    const loadingToast = toast.loading("Uploading notice circular attachment...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setNoticeAttachmentUrl(result.url);
        noticeForm.setValue("attachmentUrl", result.url);
        if (result.isDemo) {
          toast.success("Demo Mode: Attachment uploaded (fallback path generated).", { id: loadingToast });
        } else {
          toast.success("Notice circular uploaded successfully!", { id: loadingToast });
        }
      } else {
        toast.error(result.message || "Failed to upload attachment file.", { id: loadingToast });
      }
    } catch {
      toast.error("Failed to connect to upload API.", { id: loadingToast });
    } finally {
      setIsNoticeAttachmentUploading(false);
    }
  };

  const onAddNotice = async (data: NoticeFormInput) => {
    setStatus("saving");
    const isEdit = !!editingNoticeId;
    const loadingToast = toast.loading(isEdit ? "Saving notice changes..." : "Publishing notice bulletin...");
    try {
      const url = isEdit ? `/api/notices?id=${editingNoticeId}` : "/api/notices";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, attachmentUrl: noticeAttachmentUrl })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success(
          isEdit 
            ? "Notice changes saved successfully!"
            : `Notice "${data.title}" published successfully!`, 
          { id: loadingToast }
        );
        noticeForm.reset({ title: "", description: "", category: "General", isImportant: false, importanceColor: "blue", attachmentUrl: "" });
        setSelectedColor("blue");
        setNoticeAttachmentUrl("");
        setEditingNoticeId(null);
        setStatus("success");
        refreshData();
      } else {
        setStatus("error");
        toast.error(result.message || "Failed to save notice.", { id: loadingToast });
      }
    } catch {
      setStatus("error");
      toast.error("Failed to connect to notices API.", { id: loadingToast });
    }
  };

  const handleStartEditNotice = (notice: Notice) => {
    const noticeId = notice.id || notice._id || null;
    if (!noticeId) return;

    setEditingNoticeId(noticeId);
    noticeForm.reset({
      title: notice.title,
      description: notice.description,
      category: notice.category,
      isImportant: !!notice.isImportant,
      importanceColor: notice.importanceColor || "blue",
      attachmentUrl: notice.attachmentUrl || ""
    });
    setSelectedColor(notice.importanceColor || "blue");
    setNoticeAttachmentUrl(notice.attachmentUrl || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteNotice = async (id: string) => {
    const loadingToast = toast.loading("Deleting notice...");
    try {
      const res = await fetch(`/api/notices?id=${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success("Notice deleted successfully.", { id: loadingToast });
        refreshData();
      } else {
        toast.error(result.message || "Failed to delete notice.", { id: loadingToast });
      }
    } catch {
      toast.error("Failed to connect to notices delete API.", { id: loadingToast });
    }
  };

  const handleBulkDeleteNotices = async () => {
    if (selectedNoticeIds.length === 0) return;
    const loadingToast = toast.loading(`Deleting ${selectedNoticeIds.length} notices...`);
    try {
      let successCount = 0;
      let failCount = 0;
      for (const id of selectedNoticeIds) {
        const res = await fetch(`/api/notices?id=${id}`, { method: "DELETE" });
        const result = await res.json();
        if (res.ok && result.success) {
          successCount++;
        } else {
          failCount++;
        }
      }
      toast.success(`Successfully deleted ${successCount} notices.${failCount > 0 ? ` Failed to delete ${failCount} notices.` : ""}`, { id: loadingToast });
      setSelectedNoticeIds([]);
      refreshData();
    } catch {
      toast.error("Failed to execute bulk deletion.", { id: loadingToast });
    }
  };

  return (
    <form onSubmit={noticeForm.handleSubmit(onAddNotice)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 text-left mb-2">
        <h3 className="text-base font-extrabold text-neutral-dark">
          {editingNoticeId ? "Edit Notice Details" : "Post New Notice"}
        </h3>
        <p className="text-xs text-neutral-body">
          {editingNoticeId 
            ? "Modify notice parameters. Save changes to update the bulletin board instantly." 
            : "Fills the bulletin board instantly with high-priority warnings or exam records."}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-extrabold text-neutral-dark">Notice Category</label>
        <select
          className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
          {...noticeForm.register("category")}
        >
          <option value="General">General / Administrative</option>
          <option value="Admission">Admissions Updates</option>
          <option value="Exam">Examination Schedule</option>
          <option value="Holiday">Holidays & Vacations</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-extrabold text-neutral-dark">Notice Title</label>
        <input
          type="text"
          placeholder="e.g. Summer Vacation Commences June 1st"
          required
          className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
          {...noticeForm.register("title")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-extrabold text-neutral-dark">Notice Body Description</label>
        <textarea
          rows={5}
          placeholder="Write clear detailed points explaining dates, times, and directives for parents..."
          required
          className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
          {...noticeForm.register("description")}
        />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <label className="text-xs font-extrabold text-neutral-dark">Choose Importance Tag</label>
        <div className="flex items-center gap-2.5 flex-wrap">
          {[
            { color: "red", label: "Urgent Alert", isImportant: true, bg: "bg-red-50 text-red-800 border-red-200 hover:bg-red-100", dot: "bg-red-500" },
            { color: "amber", label: "Important", isImportant: true, bg: "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100", dot: "bg-amber-500" },
            { color: "blue", label: "Information", isImportant: false, bg: "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100", dot: "bg-blue-500" },
            { color: "green", label: "General Info", isImportant: false, bg: "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100", dot: "bg-emerald-500" },
            { color: "purple", label: "Special Notice", isImportant: false, bg: "bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100", dot: "bg-purple-500" }
          ].map((opt) => (
            <button
              key={opt.color}
              type="button"
              onClick={() => {
                setSelectedColor(opt.color);
                noticeForm.setValue("importanceColor", opt.color);
                noticeForm.setValue("isImportant", opt.isImportant);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl transition-all text-[11px] font-black uppercase tracking-wider cursor-pointer focus:outline-none ${
                selectedColor === opt.color 
                  ? `${opt.bg} border-current ring-1 ring-offset-1 ring-current`
                  : "border-gray-200 bg-white text-neutral-body hover:border-gray-300"
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${opt.dot}`} />
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
        <input type="hidden" {...noticeForm.register("importanceColor")} />
        <input type="hidden" {...noticeForm.register("isImportant")} />
        <p className="text-[10px] text-neutral-body leading-tight mt-0.5">
          Notice bulletins marked as **Urgent Alert** or **Important** are treated as high priority and remain sticky at the top of the feed.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-extrabold text-neutral-dark">Attach Notice Document / Image (Optional)</label>
        <div className="flex items-center gap-4 p-4 bg-neutral-light border border-gray-200 rounded-xl">
          <div className="flex-1 text-left">
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleNoticeAttachmentUpload}
              disabled={isNoticeAttachmentUploading}
              className="text-xs text-neutral-body file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer disabled:opacity-50"
            />
            <p className="text-[10px] text-neutral-body mt-1.5 leading-tight">
              {isNoticeAttachmentUploading 
                ? "Uploading attachment..." 
                : "Upload a PDF document or image copy of the notice (Max 5MB)."
              }
            </p>
          </div>
          {noticeAttachmentUrl && (
            <div className="shrink-0 flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-[10px] font-bold">
              <Paperclip className="w-3.5 h-3.5 animate-pulse" />
              <span>Attached</span>
              <button
                type="button"
                onClick={() => {
                  setNoticeAttachmentUrl("");
                  noticeForm.setValue("attachmentUrl", "");
                }}
                className="text-red-600 hover:text-red-800 font-extrabold focus:outline-none"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3.5 mt-4">
        <button
          type="submit"
          disabled={status === "saving" || isNoticeAttachmentUploading}
          className="flex-1 py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>
            {editingNoticeId 
              ? "Save Notice Changes" 
              : (status === "saving" ? "Posting Notice..." : "Publish Notice")}
          </span>
        </button>

        {editingNoticeId && (
          <button
            type="button"
            onClick={() => {
              setEditingNoticeId(null);
              noticeForm.reset({ title: "", description: "", category: "General", isImportant: false, importanceColor: "blue", attachmentUrl: "" });
              setSelectedColor("blue");
              setNoticeAttachmentUrl("");
            }}
            className="px-6 py-3.5 border border-gray-300 bg-white hover:bg-neutral-light text-neutral-dark font-bold text-sm rounded-xl shadow-sm transition-all focus:outline-none cursor-pointer"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Live Notices List inside Admin Panel for deletion */}
      <div className="mt-10 border-t border-gray-100 pt-8 text-left">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h4 className="text-sm font-extrabold text-neutral-dark">Active Notices ({noticesList.length})</h4>
          {noticesList.length > 0 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  if (selectedNoticeIds.length === noticesList.length) {
                    setSelectedNoticeIds([]);
                  } else {
                    setSelectedNoticeIds(noticesList.map(n => n.id || n._id || "").filter(Boolean));
                  }
                }}
                className="px-2.5 py-1.5 border border-gray-300 bg-white hover:bg-neutral-light text-neutral-dark text-[10px] font-black uppercase rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
              >
                {selectedNoticeIds.length === noticesList.length ? "Deselect All" : "Select All"}
              </button>
              {selectedNoticeIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    triggerConfirm(
                      "Delete Selected Notices",
                      `Are you sure you want to permanently delete all ${selectedNoticeIds.length} selected notices? This action cannot be undone.`,
                      handleBulkDeleteNotices
                    );
                  }}
                  className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
                >
                  Delete Selected ({selectedNoticeIds.length})
                </button>
              )}
            </div>
          )}
        </div>
        {noticesList.length === 0 ? (
          <p className="text-xs text-neutral-body italic">No active notices found.</p>
        ) : (
          <div className="flex flex-col gap-3.5">
            {noticesList.map((notice) => (
              <div key={notice.id || notice._id} className="p-4 bg-neutral-light border border-gray-200 rounded-2xl flex items-start justify-between gap-4 wrap-break-word overflow-hidden">
                <div className="pt-0.5">
                  <input
                    type="checkbox"
                    checked={selectedNoticeIds.includes(notice.id || notice._id || "")}
                    onChange={(e) => {
                      const id = notice.id || notice._id || "";
                      if (e.target.checked) {
                        setSelectedNoticeIds(prev => [...prev, id]);
                      } else {
                        setSelectedNoticeIds(prev => prev.filter(x => x !== id));
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded tracking-wide border ${
                      notice.importanceColor === "red"
                        ? "bg-red-100 text-red-850 border-red-200"
                        : notice.importanceColor === "amber"
                        ? "bg-amber-100 text-amber-850 border-amber-200"
                        : notice.importanceColor === "green"
                        ? "bg-emerald-100 text-emerald-850 border-emerald-200"
                        : notice.importanceColor === "purple"
                        ? "bg-purple-100 text-purple-850 border-purple-200"
                        : "bg-blue-100 text-blue-850 border-blue-200"
                    }`}>
                      {notice.category}
                    </span>
                    <span className="text-[10px] text-neutral-body font-semibold">
                      {new Date(notice.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h5 className="text-xs font-black text-neutral-dark tracking-wide leading-snug wrap-break-word">{notice.title}</h5>
                  <p className="text-[11px] text-neutral-body leading-relaxed font-medium line-clamp-2 wrap-break-word">{notice.description}</p>
                  {notice.attachmentUrl && (
                    <a
                      href={`/api/notices/download?url=${encodeURIComponent(notice.attachmentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline font-bold self-start mt-1"
                    >
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>View Attachment Circular</span>
                    </a>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStartEditNotice(notice)}
                    className="flex items-center justify-center p-2 border border-gray-200 hover:bg-neutral-light text-neutral-dark rounded-xl transition-all cursor-pointer focus:outline-none"
                    title="Edit Notice"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      triggerConfirm(
                        "Delete Notice",
                        "Are you sure you want to permanently delete this notice bulletin? This action cannot be undone.",
                        () => handleDeleteNotice(notice.id || notice._id || "")
                      );
                    }}
                    className="flex items-center justify-center p-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl transition-all cursor-pointer focus:outline-none shrink-0"
                    title="Delete Notice"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
