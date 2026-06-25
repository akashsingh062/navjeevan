"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Save, Paperclip, Edit, Trash2, Search, Filter, AlertCircle, FileText, CheckCircle2 } from "lucide-react";
import { Notice } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

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
  const [customCategory, setCustomCategory] = useState("");
  const watchedCategory = useWatch({
    control: noticeForm.control,
    name: "category",
    defaultValue: "General"
  });
  
  const [noticeAttachmentUrl, setNoticeAttachmentUrl] = useState("");
  const [isNoticeAttachmentUploading, setIsNoticeAttachmentUploading] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [selectedNoticeIds, setSelectedNoticeIds] = useState<string[]>([]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const handleNoticeAttachmentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsNoticeAttachmentUploading(true);
    const loadingToast = toast.loading("Uploading notice circular attachment...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", "notices");

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

    let finalCategory = data.category;
    if (data.category === "Others") {
      finalCategory = customCategory.trim() || "Others";
    }

    try {
      const url = isEdit ? `/api/notices?id=${editingNoticeId}` : "/api/notices";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, category: finalCategory, attachmentUrl: noticeAttachmentUrl })
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
        setCustomCategory("");
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

    const standardCategories = ["General", "Admission", "Exam", "Holiday"];
    if (standardCategories.includes(notice.category)) {
      noticeForm.reset({
        title: notice.title,
        description: notice.description,
        category: notice.category,
        isImportant: !!notice.isImportant,
        importanceColor: notice.importanceColor || "blue",
        attachmentUrl: notice.attachmentUrl || ""
      });
      setCustomCategory("");
    } else {
      noticeForm.reset({
        title: notice.title,
        description: notice.description,
        category: "Others",
        isImportant: !!notice.isImportant,
        importanceColor: notice.importanceColor || "blue",
        attachmentUrl: notice.attachmentUrl || ""
      });
      setCustomCategory(notice.category);
    }

    setSelectedColor(notice.importanceColor || "blue");
    setNoticeAttachmentUrl(notice.attachmentUrl || "");

    const container = document.getElementById("admin-notice-form-top");
    if (container) {
      container.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

  // Filter and search computation
  const filteredNotices = noticesList.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          notice.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === "All" || notice.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by category
  const groupedNotices = filteredNotices.reduce((acc, notice) => {
    const category = notice.category || "Others";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(notice);
    return acc;
  }, {} as Record<string, Notice[]>);

  const categoryOrder = ["General", "Admission", "Exam", "Holiday"];
  const sortedCategories = Object.keys(groupedNotices).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div id="admin-notice-form-top" className="flex flex-col gap-8">
      {/* Form Content */}
      <form onSubmit={noticeForm.handleSubmit(onAddNotice)} className="flex flex-col gap-6 text-left">
        <div className="flex flex-col gap-1.5 border-b border-slate-100 pb-4">
          <h3 className="text-base font-black text-slate-900">
            {editingNoticeId ? "Edit Bulletin Board Announcement" : "Create New Announcement Bulletin"}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Announcements are published in real-time to the public site feed, complete with categories and optional files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-slate-700 tracking-wide">Notice Category</label>
            <select
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm rounded-xl font-medium text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              {...noticeForm.register("category")}
            >
              <option value="General">General / Administrative</option>
              <option value="Admission">Admissions Updates</option>
              <option value="Exam">Examination Schedule</option>
              <option value="Holiday">Holidays & Vacations</option>
              <option value="Others">Others</option>
            </select>

            {watchedCategory === "Others" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex flex-col gap-2 mt-2"
              >
                <label className="text-xs font-bold text-slate-700">Specify Custom Category</label>
                <input
                  type="text"
                  placeholder="e.g. Science Exhibition, Sports Meet"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm rounded-xl font-medium text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                />
              </motion.div>
            )}
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-slate-700 tracking-wide">Announcement Title</label>
            <input
              type="text"
              placeholder="e.g. Annual Summer Vacation Notification"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm rounded-xl font-medium text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              {...noticeForm.register("title")}
            />
          </div>
        </div>

        {/* Description body */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold text-slate-700 tracking-wide">Notice Body Description</label>
          <textarea
            rows={5}
            placeholder="Write clear detailed points explaining dates, times, and directives for parents..."
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm rounded-xl font-medium text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            {...noticeForm.register("description")}
          />
        </div>

        {/* Priority options */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold text-slate-700 tracking-wide">Importance & Priority Tag</label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-3.5 px-3.5 scrollbar-none flex-nowrap md:flex-wrap md:overflow-x-visible md:pb-0 md:mx-0 md:px-0 scroll-smooth snap-x snap-mandatory">
            {[
              { color: "red", label: "Urgent Alert", isImportant: true, bg: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100/50", dot: "bg-red-500" },
              { color: "amber", label: "Important", isImportant: true, bg: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100/50", dot: "bg-amber-500" },
              { color: "blue", label: "Information", isImportant: false, bg: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100/50", dot: "bg-blue-500" },
              { color: "green", label: "General Info", isImportant: false, bg: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/50", dot: "bg-emerald-500" },
              { color: "purple", label: "Special Notice", isImportant: false, bg: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100/50", dot: "bg-purple-500" }
            ].map((opt) => (
              <button
                key={opt.color}
                type="button"
                onClick={() => {
                  setSelectedColor(opt.color);
                  noticeForm.setValue("importanceColor", opt.color);
                  noticeForm.setValue("isImportant", opt.isImportant);
                }}
                className={`flex items-center gap-2 px-3 py-2.5 border rounded-xl transition-all text-[11px] font-black uppercase tracking-wider cursor-pointer focus:outline-none select-none snap-start shrink-0 md:shrink ${
                  selectedColor === opt.color
                    ? `${opt.bg} border-current ring-1 ring-offset-1 ring-current`
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${opt.dot}`} />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
          <input type="hidden" {...noticeForm.register("importanceColor")} />
          <input type="hidden" {...noticeForm.register("isImportant")} />
        </div>

        {/* Attachment upload */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold text-slate-700 tracking-wide">Attach Circular Document (Optional)</label>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="w-full sm:flex-1 text-left">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleNoticeAttachmentUpload}
                disabled={isNoticeAttachmentUploading}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer disabled:opacity-50"
              />
              <p className="text-[10px] text-slate-400 mt-1.5 font-medium leading-none">
                {isNoticeAttachmentUploading
                  ? "Uploading attachment file to Cloud Storage..."
                  : "PDF documents or images copy (Max 5MB)."
                }
              </p>
            </div>
            {noticeAttachmentUrl && (
              <div className="w-full sm:w-auto shrink-0 flex items-center justify-between sm:justify-start gap-2 bg-emerald-50 text-emerald-800 border border-emerald-205 px-3 py-2 rounded-xl text-[10px] font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Attached</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNoticeAttachmentUrl("");
                    noticeForm.setValue("attachmentUrl", "");
                  }}
                  className="text-red-650 hover:text-red-800 font-extrabold cursor-pointer focus:outline-none"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form buttons */}
        <div className="flex gap-3.5 mt-2">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={status === "saving" || isNoticeAttachmentUploading}
            className="flex-1 py-4 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>
              {editingNoticeId
                ? "Save Announcement Changes"
                : (status === "saving" ? "Publishing Bulletin..." : "Publish Announcement")}
            </span>
          </motion.button>

          {editingNoticeId && (
            <button
              type="button"
              onClick={() => {
                setEditingNoticeId(null);
                noticeForm.reset({ title: "", description: "", category: "General", isImportant: false, importanceColor: "blue", attachmentUrl: "" });
                setSelectedColor("blue");
                setNoticeAttachmentUrl("");
              }}
              className="px-6 py-4 border border-slate-350 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl shadow-3xs transition-all focus:outline-none cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Bulletins list section */}
      <div className="mt-12 border-t border-slate-100 pt-10 text-left flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="text-sm font-black text-slate-900">Active School Announcements ({noticesList.length})</h4>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold">Search, filter, or delete active circular listings.</p>
          </div>

          <div className="flex items-center gap-2.5 self-stretch sm:self-auto flex-wrap">
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
                className="px-3.5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase rounded-xl shadow-xs transition-all focus:outline-none cursor-pointer"
              >
                Delete Selected ({selectedNoticeIds.length})
              </button>
            )}
            
            <button
              type="button"
              onClick={() => {
                if (selectedNoticeIds.length === noticesList.length) {
                  setSelectedNoticeIds([]);
                } else {
                  setSelectedNoticeIds(noticesList.map(n => n.id || n._id || "").filter(Boolean));
                }
              }}
              className="px-3.5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-black uppercase rounded-xl shadow-3xs transition-all focus:outline-none cursor-pointer select-none"
            >
              {selectedNoticeIds.length === noticesList.length ? "Deselect All" : "Select All"}
            </button>
          </div>
        </div>

        {/* Filter controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
          {/* Search bar */}
          <div className="sm:col-span-8 relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search announcements by title or description details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-xs rounded-xl font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="sm:col-span-4 relative flex items-center">
            <Filter className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-xs rounded-xl font-bold text-slate-700 focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="General">General / Admin</option>
              <option value="Admission">Admissions</option>
              <option value="Exam">Examinations</option>
              <option value="Holiday">Holidays</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        {/* Grid Lists */}
        {filteredNotices.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 border border-slate-150 rounded-2xl">
            <p className="text-xs text-slate-500 font-semibold italic">No active bulletins match your filters.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {sortedCategories.map((category) => (
              <div key={category} className="flex flex-col gap-4">
                {/* Category Header Badge */}
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-600 bg-slate-100/80 px-2.5 py-1.5 rounded-xl border border-slate-200">
                    {category}
                  </span>
                  <span className="text-[10px] font-black text-slate-400">
                    ({groupedNotices[category].length} announcements)
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {groupedNotices[category].map((notice, index) => {
                      const isChecked = selectedNoticeIds.includes(notice.id || notice._id || "");
                      return (
                        <motion.div
                          key={notice.id || notice._id || `notice-${index}`}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-stretch sm:items-start gap-3.5 sm:gap-4 shadow-3xs relative bg-white ${
                            isChecked ? "border-primary/40 bg-primary-light/10" : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {/* Desktop Checkbox (Desktop only) */}
                          <div className="hidden sm:block pt-1.5 shrink-0">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                const id = notice.id || notice._id || "";
                                if (e.target.checked) {
                                  setSelectedNoticeIds(prev => [...prev, id]);
                                } else {
                                  setSelectedNoticeIds(prev => prev.filter(x => x !== id));
                                }
                              }}
                              className="w-4 h-4 rounded-md border-slate-300 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                            />
                          </div>

                          {/* Mobile Header Row (Mobile only) */}
                          <div className="flex sm:hidden items-center justify-between gap-2 pb-2 border-b border-slate-100">
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  const id = notice.id || notice._id || "";
                                  if (e.target.checked) {
                                    setSelectedNoticeIds(prev => [...prev, id]);
                                  } else {
                                    setSelectedNoticeIds(prev => prev.filter(x => x !== id));
                                  }
                                }}
                                className="w-4 h-4 rounded-md border-slate-300 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                              />
                              <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-md tracking-wider border leading-none ${
                                notice.importanceColor === "red"
                                  ? "bg-red-50 text-red-700 border-red-150"
                                  : notice.importanceColor === "amber"
                                  ? "bg-amber-50 text-amber-700 border-amber-150"
                                  : notice.importanceColor === "green"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-150"
                                  : notice.importanceColor === "purple"
                                  ? "bg-purple-50 text-purple-700 border-purple-150"
                                  : "bg-blue-50 text-blue-700 border-blue-150"
                              }`}>
                                {notice.category}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                              {new Date(notice.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          </div>

                          {/* Meta info */}
                          <div className="flex-1 flex flex-col gap-2 min-w-0">
                            {/* Desktop Meta Header (Desktop only) */}
                            <div className="hidden sm:flex items-center gap-2.5 flex-wrap">
                              <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-md tracking-wider border leading-none ${
                                notice.importanceColor === "red"
                                  ? "bg-red-50 text-red-700 border-red-150"
                                  : notice.importanceColor === "amber"
                                  ? "bg-amber-50 text-amber-700 border-amber-150"
                                  : notice.importanceColor === "green"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-150"
                                  : notice.importanceColor === "purple"
                                  ? "bg-purple-50 text-purple-700 border-purple-150"
                                  : "bg-blue-50 text-blue-700 border-blue-150"
                              }`}>
                                {notice.category}
                              </span>
                              
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                                {new Date(notice.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              </span>
                            </div>

                            <h5 className="text-xs font-black text-slate-900 tracking-wide leading-snug wrap-break-word">{notice.title}</h5>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium wrap-break-word whitespace-pre-wrap">{notice.description}</p>
                            
                            {notice.attachmentUrl && (
                              <a
                                href={`/api/notices/download?url=${encodeURIComponent(notice.attachmentUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[10px] text-primary hover:underline font-extrabold self-start mt-2"
                              >
                                <Paperclip className="w-3.5 h-3.5" />
                                <span className="truncate max-w-[200px] sm:max-w-xs" title="View Attachment Circular">View Attachment Circular</span>
                              </a>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex sm:flex-col gap-2 shrink-0 justify-end sm:justify-center border-t border-slate-100 pt-2.5 sm:border-0 sm:pt-0">
                            <button
                              type="button"
                              onClick={() => handleStartEditNotice(notice)}
                              className="flex-1 sm:flex-none flex items-center justify-center p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-all cursor-pointer focus:outline-none sm:w-10 sm:h-10 shrink-0"
                              title="Edit Notice"
                            >
                              <Edit className="w-4 h-4 shrink-0" />
                              <span className="sm:hidden text-xs font-extrabold ml-1.5">Edit Notice</span>
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
                              className="flex-1 sm:flex-none flex items-center justify-center p-2.5 border border-red-200 bg-red-50/30 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-xl transition-all cursor-pointer focus:outline-none sm:w-10 sm:h-10 shrink-0"
                              title="Delete Notice"
                            >
                              <Trash2 className="w-4 h-4 shrink-0" />
                              <span className="sm:hidden text-xs font-extrabold ml-1.5 text-red-600">Delete Notice</span>
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
