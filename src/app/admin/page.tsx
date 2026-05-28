"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { PlusCircle, FileText, Camera, Users, AlertCircle, Save, Lock, LogIn, LogOut, Trash2, Paperclip, Edit } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Notice, Faculty, GalleryItem } from "@/types";

type TabName = "notices" | "gallery" | "faculty";

interface NoticeFormInput {
  title: string;
  description: string;
  category: string;
  isImportant: boolean;
  importanceColor?: string;
  attachmentUrl?: string;
}

interface GalleryFormInput {
  title: string;
  category: string;
  imageUrl: string;
}

interface FacultyFormInput {
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  imageUrl: string;
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<TabName>("notices");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  
  useEffect(() => {
    const token = localStorage.getItem("navjeevan_admin_auth");
    if (token === "navjeevan-auth-token-2026") {
      
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 0);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    const loadingToast = toast.loading("Verifying administrator credentials...");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        localStorage.setItem("navjeevan_admin_auth", result.token);
        setIsLoggedIn(true);
        toast.success("Welcome back, administrator!", { id: loadingToast });
      } else {
        setLoginError(result.message || "Invalid credentials.");
        toast.error(result.message || "Invalid credentials.", { id: loadingToast });
      }
    } catch {
      setLoginError("Failed to connect to authentication API.");
      toast.error("Failed to connect to authentication API.", { id: loadingToast });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("navjeevan_admin_auth");
    setIsLoggedIn(false);
    setLoginUsername("");
    setLoginPassword("");
  };

  
  const noticeForm = useForm<NoticeFormInput>({
    defaultValues: { title: "", description: "", category: "General", isImportant: false, importanceColor: "blue" }
  });

  const [selectedColor, setSelectedColor] = useState("blue");

  const galleryForm = useForm<GalleryFormInput>({
    defaultValues: { title: "", category: "Annual Function", imageUrl: "" }
  });

  const [galleryQueue, setGalleryQueue] = useState<{
    id: string;
    file: File;
    status: "idle" | "uploading" | "success" | "error";
    errorMsg?: string;
  }[]>([]);
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);

  const [deletingNoticeId, setDeletingNoticeId] = useState<string | null>(null);
  const [deletingGalleryId, setDeletingGalleryId] = useState<string | null>(null);
  const [deletingFacultyId, setDeletingFacultyId] = useState<string | null>(null);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [editingFacultyId, setEditingFacultyId] = useState<string | null>(null);
  const [selectedNoticeIds, setSelectedNoticeIds] = useState<string[]>([]);
  const [selectedGalleryIds, setSelectedGalleryIds] = useState<string[]>([]);

  const [noticesList, setNoticesList] = useState<Notice[]>([]);
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [noticeAttachmentUrl, setNoticeAttachmentUrl] = useState("");
  const [isNoticeAttachmentUploading, setIsNoticeAttachmentUploading] = useState(false);

  const refreshData = async () => {
    try {
      const noticesRes = await fetch("/api/notices");
      const noticesData = await noticesRes.json();
      if (noticesData.success) setNoticesList(noticesData.notices);

      const facultyRes = await fetch("/api/faculty");
      const facultyData = await facultyRes.json();
      if (facultyData.success) setFacultyList(facultyData.faculty);

      const galleryRes = await fetch("/api/gallery");
      const galleryData = await galleryRes.json();
      if (galleryData.success) setGalleryList(galleryData.gallery);
    } catch (error) {
      console.error("Failed to load list details in admin panel:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      
      setTimeout(() => {
        refreshData();
      }, 0);
    }
  }, [isLoggedIn]);

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

  const handleDeleteNotice = async (id: string) => {
    const loadingToast = toast.loading("Deleting notice...");
    try {
      const res = await fetch(`/api/notices?id=${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success("Notice deleted successfully.", { id: loadingToast });
        setDeletingNoticeId(null);
        refreshData();
      } else {
        toast.error(result.message || "Failed to delete notice.", { id: loadingToast });
      }
    } catch {
      toast.error("Failed to connect to notices delete API.", { id: loadingToast });
    }
  };

  const handleDeleteGallery = async (id: string) => {
    const loadingToast = toast.loading("Deleting photo...");
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success("Gallery photo deleted successfully.", { id: loadingToast });
        setDeletingGalleryId(null);
        refreshData();
      } else {
        toast.error(result.message || "Failed to delete gallery item.", { id: loadingToast });
      }
    } catch {
      toast.error("Failed to connect to gallery delete API.", { id: loadingToast });
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

  const handleBulkDeleteGallery = async () => {
    if (selectedGalleryIds.length === 0) return;
    const loadingToast = toast.loading(`Deleting ${selectedGalleryIds.length} photos...`);
    try {
      let successCount = 0;
      let failCount = 0;
      for (const id of selectedGalleryIds) {
        const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
        const result = await res.json();
        if (res.ok && result.success) {
          successCount++;
        } else {
          failCount++;
        }
      }
      toast.success(`Successfully deleted ${successCount} photos.${failCount > 0 ? ` Failed to delete ${failCount} photos.` : ""}`, { id: loadingToast });
      setSelectedGalleryIds([]);
      refreshData();
    } catch {
      toast.error("Failed to execute bulk deletion.", { id: loadingToast });
    }
  };

  const handleDeleteFaculty = async (id: string) => {
    const loadingToast = toast.loading("Deleting profile...");
    try {
      const res = await fetch(`/api/faculty?id=${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success("Faculty profile deleted successfully.", { id: loadingToast });
        setDeletingFacultyId(null);
        refreshData();
      } else {
        toast.error(result.message || "Failed to delete faculty profile.", { id: loadingToast });
      }
    } catch {
      toast.error("Failed to connect to faculty delete API.", { id: loadingToast });
    }
  };

  const facultyForm = useForm({
    defaultValues: { name: "", subject: "", qualification: "", experience: "", imageUrl: "" }
  });
  const watchedFacultyImage = useWatch({
    control: facultyForm.control,
    name: "imageUrl",
    defaultValue: ""
  });
  const [facultyImageUploading, setFacultyImageUploading] = useState(false);

  const handleFacultyImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFacultyImageUploading(true);
    const loadingToast = toast.loading("Uploading staff photograph...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const result = await res.json();
      if (res.ok && result.success) {
        facultyForm.setValue("imageUrl", result.url);
        if (result.isDemo) {
          toast.success("Demo Mode: Photo URL fallback loaded successfully.", { id: loadingToast });
        } else {
          toast.success("Photograph uploaded successfully!", { id: loadingToast });
        }
      } else {
        toast.error(result.message || "Failed to upload image.", { id: loadingToast });
      }
    } catch {
      toast.error("Failed to connect to upload API.", { id: loadingToast });
    } finally {
      setFacultyImageUploading(false);
    }
  };

  const onAddNotice = async (data: NoticeFormInput) => {
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
        refreshData();
      } else {
        toast.error(result.message || "Failed to save notice.", { id: loadingToast });
      }
    } catch {
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

    // Smooth scroll to the top of the tab panels (Notice Form)
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleGalleryMultiUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (galleryQueue.length === 0) {
      toast.error("Please choose one or more photo files/folders to upload first.");
      return;
    }

    setIsGalleryUploading(true);
    const mainLoadingToast = toast.loading(`Uploading batch of ${galleryQueue.length} photos...`);
    let successCount = 0;
    let failCount = 0;

    const baseTitle = galleryForm.getValues("title") || "";
    const category = galleryForm.getValues("category") || "Annual Function";

    // Create a copy of the queue to update statuses
    const updatedQueue = [...galleryQueue];

    for (let i = 0; i < updatedQueue.length; i++) {
      const item = updatedQueue[i];
      if (item.status === "success") continue; // Skip already successfully uploaded files

      // Set status to uploading
      item.status = "uploading";
      setGalleryQueue([...updatedQueue]);

      try {
        // 1. Upload to Cloudinary / Fallback Local Mock
        const formData = new FormData();
        formData.append("file", item.file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData
        });
        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok || !uploadResult.success) {
          throw new Error(uploadResult.message || "Failed to upload photograph.");
        }

        const imageUrl = uploadResult.url;

        // 2. Format a clean title from the file name
        const cleanFileName = item.file.name
          .substring(0, item.file.name.lastIndexOf("."))
          .replace(/[-_]+/g, " ")
          .trim();
        
        // Capitalize first letters of words for maximum aesthetics
        const capitalizedFileName = cleanFileName
          .split(" ")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

        const finalTitle = baseTitle 
          ? `${baseTitle} - ${capitalizedFileName}` 
          : capitalizedFileName || "Gallery Image";

        // 3. Register to Gallery Database
        const galleryRes = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: finalTitle,
            category,
            imageUrl
          })
        });
        const galleryResult = await galleryRes.json();

        if (!galleryRes.ok || !galleryResult.success) {
          throw new Error(galleryResult.message || "Failed to register gallery item.");
        }

        item.status = "success";
        successCount++;
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Failed to process photo.";
        item.status = "error";
        item.errorMsg = errMsg;
        failCount++;
      }

      setGalleryQueue([...updatedQueue]);
    }

    setIsGalleryUploading(false);

    if (failCount === 0) {
      toast.success(`Successfully uploaded and saved all ${successCount} photos to the gallery!`, { id: mainLoadingToast });
      setGalleryQueue([]);
      galleryForm.reset({ title: "", category });
      refreshData();
    } else {
      toast.error(`Completed processing: ${successCount} succeeded, ${failCount} failed. Please review error items.`, { id: mainLoadingToast });
      refreshData();
    }
  };

  const onAddFaculty = async (data: FacultyFormInput) => {
    const isEdit = !!editingFacultyId;
    const loadingToast = toast.loading(isEdit ? "Saving teacher profile changes..." : "Adding teacher profile...");
    try {
      const url = isEdit ? `/api/faculty?id=${editingFacultyId}` : "/api/faculty";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success(
          isEdit
            ? `Teacher profile for "${data.name}" updated successfully!`
            : `Teacher profile for "${data.name}" added successfully!`,
          { id: loadingToast }
        );
        facultyForm.reset({ name: "", subject: "", qualification: "", experience: "", imageUrl: "" });
        setEditingFacultyId(null);
        refreshData();
      } else {
        toast.error(result.message || "Failed to save faculty profile.", { id: loadingToast });
      }
    } catch {
      toast.error("Failed to connect to faculty API.", { id: loadingToast });
    }
  };

  const handleStartEditFaculty = (member: Faculty) => {
    const memberId = member.id || member._id || null;
    if (!memberId) return;

    setEditingFacultyId(memberId);
    facultyForm.reset({
      name: member.name,
      subject: member.subject,
      qualification: member.qualification || "",
      experience: member.experience || "",
      imageUrl: member.imageUrl || ""
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tabs = [
    { name: "notices" as TabName, label: "Add Notice", icon: FileText, desc: "Publish exam timelines, holiday lists, and circulars." },
    { name: "gallery" as TabName, label: "Add Photo", icon: Camera, desc: "Register photo logs from school functions." },
    { name: "faculty" as TabName, label: "Add Teacher", icon: Users, desc: "Add newly joined educators and mentors." }
  ];

  if (!isLoggedIn) {
    return (
      <div className="py-20 bg-neutral-light flex-1 flex items-center justify-center text-left">
        <div className="max-w-md w-full mx-4 bg-white border border-gray-200 p-8 rounded-3xl shadow-md">
          
          <div className="flex flex-col items-center gap-3 text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-neutral-dark">Admin Staff Login</h2>
            <p className="text-xs text-neutral-body max-w-xs font-normal">
              Enter your credentials to access the Nav Jeevan School dashboard.
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-6 flex gap-2.5 items-start text-xs font-semibold leading-relaxed" role="alert">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-xs font-extrabold text-neutral-dark">Username</label>
              <input
                id="username"
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-extrabold text-neutral-dark">Password</label>
              <input
                id="password"
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-4 py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
            >
              <LogIn className="w-4 h-4" />
              <span>{loginLoading ? "Verifying..." : "Sign In"}</span>
            </button>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white flex-1 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] uppercase font-black text-white bg-primary px-3 py-1 rounded-full tracking-wider shadow-sm">
              Staff Portal
            </span>
            <SectionHeading
              title="School Administration Dashboard"
              subtitle="Secure portal to upload bulletins, manage teacher grids, and expand student activity photo logs."
            />
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 px-4.5 py-2.5 border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 rounded-xl font-extrabold text-xs transition-colors shrink-0 focus:outline-none cursor-pointer self-start md:self-center"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>



        {/* Tab Selection Row */}
        <div className="grid grid-cols-3 gap-3.5 mb-8 border-b border-gray-100 pb-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                  setStatus("idle");
                }}
                className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer focus:outline-none ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-neutral-light text-neutral-dark border-gray-200 hover:border-gray-300"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-primary"}`} />
                <span className="text-xs font-black tracking-wide leading-none">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Forms Container */}
        <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-3xl shadow-sm">
          
          {/* NOTICE FORM */}
          {activeTab === "notices" && (
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
                <label className="text-xs font-extrabold text-neutral-dark">Choose Importance & Color Tag</label>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {[
                    { color: "red", label: "Critical (Red)", isImportant: true, bg: "bg-red-50 text-red-800 border-red-200 hover:bg-red-100", dot: "bg-red-500" },
                    { color: "amber", label: "High (Amber)", isImportant: true, bg: "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100", dot: "bg-amber-500" },
                    { color: "blue", label: "Info (Blue)", isImportant: false, bg: "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100", dot: "bg-blue-500" },
                    { color: "green", label: "Normal (Green)", isImportant: false, bg: "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100", dot: "bg-emerald-500" },
                    { color: "purple", label: "Special (Purple)", isImportant: false, bg: "bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100", dot: "bg-purple-500" }
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
                  Notice items with **Critical (Red)** and **High (Amber)** tags are treated as high priority and remain sticky at the top of the bulletins.
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
                          onClick={handleBulkDeleteNotices}
                          className="px-2.5 py-1.5 bg-red-650 hover:bg-red-700 text-white text-[10px] font-black uppercase rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
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
                        {deletingNoticeId === (notice.id || notice._id || null) ? (
                          <div className="flex gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleDeleteNotice(notice.id || notice._id || "")}
                              className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingNoticeId(null)}
                              className="px-2.5 py-1.5 border border-gray-300 bg-white hover:bg-neutral-light text-neutral-dark text-[10px] font-black uppercase rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
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
                                onClick={() => setDeletingNoticeId(notice.id || notice._id || null)}
                                className="flex items-center justify-center p-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl transition-all cursor-pointer focus:outline-none shrink-0"
                                title="Delete Notice"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          )}

          {/* GALLERY FORM */}
          {activeTab === "gallery" && (
            <form onSubmit={handleGalleryMultiUpload} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 text-left mb-2">
                <h3 className="text-base font-extrabold text-neutral-dark">Add Photo Log (Multi-Upload)</h3>
                <p className="text-xs text-neutral-body">Choose multiple files or select an entire folder of photos instantly to register them into the school gallery.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-neutral-dark">Event Category</label>
                <select
                  className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
                  {...galleryForm.register("category")}
                >
                  <option value="Annual Function">Annual Function</option>
                  <option value="Sports Day">Sports Day</option>
                  <option value="Classroom Activities">Classroom Activities</option>
                  <option value="Cultural Events">Cultural Events</option>
                  <option value="Independence Day">Independence Day</option>
                  <option value="Prize Distribution">Prize Distribution</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-neutral-dark">Optional Base Caption Title Prefix</label>
                <input
                  type="text"
                  placeholder="e.g. Traditional Folk Dance (Optional: file names will be appended/used)"
                  className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
                  {...galleryForm.register("title")}
                />
                <span className="text-[10px] text-neutral-body font-medium leading-relaxed mt-0.5">
                  If left blank, clean capitalized file names will be used as captions automatically.
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs font-extrabold text-neutral-dark">Select Photos or Folder</label>
                
                {/* Visual Image Upload Target Container */}
                <div className="flex flex-col gap-4 p-6 bg-neutral-light border border-dashed border-gray-300 rounded-2xl text-center items-center justify-center">
                  <Camera className="w-10 h-10 text-primary/40 mb-1" />
                  
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full">
                    {/* Select Files Trigger */}
                    <label className="px-5 py-2.5 bg-primary text-white text-xs font-extrabold rounded-xl hover:bg-primary-hover transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm">
                      <PlusCircle className="w-4 h-4" />
                      <span>Select Multiple Files</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files;
                          if (!files) return;
                          const newItems = Array.from(files).map(file => ({
                            id: Math.random().toString(36).substring(2, 9),
                            file,
                            status: "idle" as const
                          }));
                          setGalleryQueue(prev => [...prev, ...newItems]);
                          e.target.value = "";
                        }}
                        className="hidden"
                      />
                    </label>

                    {/* Select Folder Trigger */}
                    <label className="px-5 py-2.5 bg-neutral-dark text-white text-xs font-extrabold rounded-xl hover:bg-neutral-dark/95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm">
                      <PlusCircle className="w-4 h-4" />
                      <span>Select Entire Folder</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        {...({ webkitdirectory: "", directory: "" } as React.InputHTMLAttributes<HTMLInputElement>)}
                        onChange={(e) => {
                          const files = e.target.files;
                          if (!files) return;
                          // Filter to keep only image files
                          const imageFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
                          if (imageFiles.length === 0) {
                            toast.error("No image files found in the selected folder.");
                            return;
                          }
                          const newItems = imageFiles.map(file => ({
                            id: Math.random().toString(36).substring(2, 9),
                            file,
                            status: "idle" as const
                          }));
                          setGalleryQueue(prev => [...prev, ...newItems]);
                          e.target.value = "";
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  <p className="text-[10px] text-neutral-body leading-tight">
                    Upload multiple JPEGs, PNGs. All folders are automatically filtered to process images only.
                  </p>
                </div>
              </div>

              {/* Upload queue list */}
              {galleryQueue.length > 0 && (
                <div className="flex flex-col gap-3 border border-gray-200 rounded-2xl p-4 bg-white">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-xs font-extrabold text-neutral-dark">
                      Upload Queue ({galleryQueue.length} files selected)
                    </span>
                    <button
                      type="button"
                      disabled={isGalleryUploading}
                      onClick={() => setGalleryQueue([])}
                      className="text-[10px] font-black text-red-600 hover:underline cursor-pointer focus:outline-none disabled:opacity-50"
                    >
                      Clear Queue
                    </button>
                  </div>

                  <div className="max-h-48 overflow-y-auto flex flex-col gap-2 divide-y divide-gray-50 pr-1">
                    {galleryQueue.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 text-xs font-medium gap-3">
                        <span className="text-neutral-dark truncate max-w-xs" title={item.file.name}>
                          {item.file.name}
                        </span>
                        
                        <div className="flex items-center gap-2.5 shrink-0">
                          {item.status === "idle" && (
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-gray-100 text-neutral-body rounded">
                              Pending
                            </span>
                          )}
                          {item.status === "uploading" && (
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded animate-pulse">
                              Uploading...
                            </span>
                          )}
                          {item.status === "success" && (
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                              Success
                            </span>
                          )}
                          {item.status === "error" && (
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-red-100 text-red-800 rounded" title={item.errorMsg}>
                              Error
                            </span>
                          )}

                          {item.status === "idle" && (
                            <button
                              type="button"
                              onClick={() => setGalleryQueue(prev => prev.filter(q => q.id !== item.id))}
                              className="text-red-500 hover:text-red-700 font-extrabold text-[10px] focus:outline-none"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isGalleryUploading || galleryQueue.length === 0}
                className="w-full mt-4 py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>
                  {isGalleryUploading 
                    ? `Uploading Photos (${galleryQueue.filter(q => q.status === "success").length}/${galleryQueue.length})...`
                    : `Start Upload & Save (${galleryQueue.length} Photos)`
                  }
                </span>
              </button>

              {/* Live Event Photos inside Admin Panel for deletion */}
              <div className="mt-10 border-t border-gray-100 pt-8 text-left">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h4 className="text-sm font-extrabold text-neutral-dark">Uploaded Gallery Photos ({galleryList.length})</h4>
                  {galleryList.length > 0 && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedGalleryIds.length === galleryList.length) {
                            setSelectedGalleryIds([]);
                          } else {
                            setSelectedGalleryIds(galleryList.map(p => p.id || p._id || "").filter(Boolean));
                          }
                        }}
                        className="px-2.5 py-1.5 border border-gray-300 bg-white hover:bg-neutral-light text-neutral-dark text-[10px] font-black uppercase rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
                      >
                        {selectedGalleryIds.length === galleryList.length ? "Deselect All" : "Select All"}
                      </button>
                      {selectedGalleryIds.length > 0 && (
                        <button
                          type="button"
                          onClick={handleBulkDeleteGallery}
                          className="px-2.5 py-1.5 bg-red-650 hover:bg-red-700 text-white text-[10px] font-black uppercase rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
                        >
                          Delete Selected ({selectedGalleryIds.length})
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {galleryList.length === 0 ? (
                  <p className="text-xs text-neutral-body italic">No uploaded event photos found.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {galleryList.map((photo) => (
                      <div key={photo.id || photo._id} className="bg-neutral-light border border-gray-200 rounded-2xl overflow-hidden shadow-sm relative group flex flex-col h-full">
                        <div className="absolute top-2.5 left-2.5 z-10 bg-white/80 p-1 rounded-lg backdrop-blur-xs shadow-xs border border-gray-100 flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={selectedGalleryIds.includes(photo.id || photo._id || "")}
                            onChange={(e) => {
                              const id = photo.id || photo._id || "";
                              if (e.target.checked) {
                                setSelectedGalleryIds(prev => [...prev, id]);
                              } else {
                                setSelectedGalleryIds(prev => prev.filter(x => x !== id));
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                          />
                        </div>
                        <div className="relative aspect-video w-full bg-gray-200 shrink-0">
                          <Image
                            src={photo.imageUrl}
                            alt={photo.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
                          <div>
                            <span className="text-[8px] font-black uppercase text-neutral-body tracking-wider block">
                              {photo.category}
                            </span>
                            <h5 className="text-[10px] font-extrabold text-neutral-dark line-clamp-2 mt-0.5 leading-snug">
                              {photo.title}
                            </h5>
                          </div>
                          {deletingGalleryId === (photo.id || photo._id || null) ? (
                            <div className="flex gap-1.5 w-full">
                              <button
                                type="button"
                                onClick={() => handleDeleteGallery(photo.id || photo._id || "")}
                                className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] rounded-lg transition-all text-center focus:outline-none cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeletingGalleryId(null)}
                                className="flex-1 py-1.5 border border-gray-300 bg-white hover:bg-neutral-light text-neutral-dark font-extrabold text-[10px] rounded-lg transition-all text-center focus:outline-none cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setDeletingGalleryId(photo.id || photo._id || null)}
                              className="w-full py-1.5 border border-red-200 hover:bg-red-50 text-red-600 font-extrabold text-[10px] rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer focus:outline-none"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete Photo</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          )}

          {/* FACULTY FORM */}
          {activeTab === "faculty" && (
            <form onSubmit={facultyForm.handleSubmit(onAddFaculty)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 text-left mb-2">
                <h3 className="text-base font-extrabold text-neutral-dark">
                  {editingFacultyId ? "Edit Teacher Profile" : "Register New Teacher"}
                </h3>
                <p className="text-xs text-neutral-body">
                  {editingFacultyId 
                    ? "Modify an existing teacher's profile details." 
                    : "Adds a teacher profile card to the Faculty portal."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-extrabold text-neutral-dark">Teacher Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Shri Vinod Kumar Yadav"
                    required
                    className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
                    {...facultyForm.register("name")}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-extrabold text-neutral-dark">Prescribed Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Science & Biology"
                    required
                    className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
                    {...facultyForm.register("subject")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-extrabold text-neutral-dark">Qualifications</label>
                  <input
                    type="text"
                    placeholder="e.g. M.Sc. (Zoology), B.Ed."
                    className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
                    {...facultyForm.register("qualification")}
                  />
                </div>
 
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-extrabold text-neutral-dark">Teaching Tenure Experience</label>
                  <input
                    type="text"
                    placeholder="e.g. 9 Years"
                    className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
                    {...facultyForm.register("experience")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs font-extrabold text-neutral-dark">Teacher Photograph</label>
                
                {/* Visual Image Upload Target Container */}
                <div className="flex flex-col sm:flex-row gap-4 items-center p-5 bg-neutral-light border border-gray-200 rounded-2xl">
                  
                  {/* Avatar Preview Thumbnail */}
                  <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden shrink-0 border border-gray-300 relative flex items-center justify-center">
                    {watchedFacultyImage ? (
                      <Image 
                        src={watchedFacultyImage} 
                        alt="Staff Preview" 
                        width={80}
                        height={80}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users className="w-8 h-8 text-neutral-body/40" />
                    )}
                  </div>

                  {/* Actions column */}
                  <div className="flex-1 flex flex-col gap-2 items-start w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFacultyImageUpload}
                      disabled={facultyImageUploading}
                      className="text-xs text-neutral-body file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer disabled:opacity-50"
                    />
                    
                    <p className="text-[10px] text-neutral-body leading-tight">
                      {facultyImageUploading 
                        ? "Uploading photograph, please wait..." 
                        : "Select PNG or JPG photo. Maximum file size 5MB."
                      }
                    </p>

                    {watchedFacultyImage && (
                      <button
                        type="button"
                        onClick={() => facultyForm.setValue("imageUrl", "")}
                        className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer focus:outline-none"
                      >
                        Remove photo
                      </button>
                    )}
                  </div>

                </div>

                <input
                  type="hidden"
                  {...facultyForm.register("imageUrl")}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={status === "saving"}
                  className="flex-1 mt-4 py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
                >
                  {editingFacultyId ? (
                    <Save className="w-4 h-4" />
                  ) : (
                    <PlusCircle className="w-4 h-4" />
                  )}
                  <span>
                    {editingFacultyId 
                      ? "Save Teacher Changes" 
                      : (status === "saving" ? "Adding Teacher..." : "Register Teacher Profile")}
                  </span>
                </button>

                {editingFacultyId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingFacultyId(null);
                      facultyForm.reset({ name: "", subject: "", qualification: "", experience: "", imageUrl: "" });
                    }}
                    className="mt-4 px-6 py-3.5 border border-gray-300 bg-white hover:bg-neutral-light text-neutral-dark font-bold text-sm rounded-xl shadow-sm transition-all focus:outline-none cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {/* Live Faculty Profiles inside Admin Panel for deletion */}
              <div className="mt-10 border-t border-gray-100 pt-8 text-left">
                <h4 className="text-sm font-extrabold text-neutral-dark mb-4">Active Staff Profiles ({facultyList.length})</h4>
                {facultyList.length === 0 ? (
                  <p className="text-xs text-neutral-body italic">No active staff profiles found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {facultyList.map((member) => (
                      <div key={member.id || member._id} className="bg-neutral-light border border-gray-200 p-4 rounded-2xl flex items-center gap-3.5 shadow-sm relative">
                        <div className="w-12 h-12 rounded-xl bg-gray-200 border border-gray-300 overflow-hidden relative shrink-0">
                          {member.imageUrl ? (
                            <Image
                              src={member.imageUrl}
                              alt={member.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-neutral-dark bg-gray-300 text-xs">
                              NJ
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-black text-neutral-dark truncate leading-tight">{member.name}</h5>
                          <p className="text-[10px] text-accent font-extrabold mt-0.5 truncate">{member.subject}</p>
                          <p className="text-[9px] text-neutral-body mt-0.5 truncate">{member.qualification}</p>
                        </div>
                        {deletingFacultyId === (member.id || member._id || null) ? (
                          <div className="flex gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleDeleteFaculty(member.id || member._id || "")}
                              className="px-2 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[9px] font-extrabold uppercase rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingFacultyId(null)}
                              className="px-2 py-1.5 border border-gray-300 bg-white hover:bg-neutral-light text-neutral-dark text-[9px] font-extrabold uppercase rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleStartEditFaculty(member)}
                              className="flex items-center justify-center p-2 border border-blue-200 hover:bg-blue-50 text-blue-600 rounded-xl transition-all cursor-pointer focus:outline-none shrink-0"
                              title="Edit Faculty Profile"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingFacultyId(member.id || member._id || null)}
                              className="flex items-center justify-center p-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl transition-all cursor-pointer focus:outline-none shrink-0"
                              title="Delete Faculty Profile"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
