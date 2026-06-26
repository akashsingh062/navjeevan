"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Save, PlusCircle, Users, Edit, Trash2, Camera, UploadCloud, GraduationCap, Briefcase } from "lucide-react";
import { Faculty } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import ImageCropper from "./ImageCropper";
import { getOptimizedImageUrl } from "@/lib/imageOptimizer";


interface FacultyFormInput {
  name: string;
  subject?: string;
  qualification: string;
  experience: string;
  imageUrl: string;
}

interface FacultyFormSectionProps {
  facultyList: Faculty[];
  refreshData: () => Promise<void>;
  triggerConfirm: (title: string, message: string, onConfirm: () => void) => void;
  status: "idle" | "saving" | "success" | "error";
  setStatus: (s: "idle" | "saving" | "success" | "error") => void;
}

export default function FacultyFormSection({
  facultyList,
  refreshData,
  triggerConfirm,
  status,
  setStatus,
}: FacultyFormSectionProps) {
  const facultyForm = useForm<FacultyFormInput>({
    defaultValues: { name: "", subject: "", qualification: "", experience: "", imageUrl: "" }
  });

  const watchedFacultyImage = useWatch({
    control: facultyForm.control,
    name: "imageUrl",
    defaultValue: ""
  });

  const [editingFacultyId, setEditingFacultyId] = useState<string | null>(null);
  const [facultyImageUploading, setFacultyImageUploading] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFacultyImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setCropperSrc(reader.result as string);
      setCropperOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCroppedUpload = async (croppedBlob: Blob) => {
    setCropperOpen(false);
    setCropperSrc(null);
    setFacultyImageUploading(true);
    const loadingToast = toast.loading("Uploading staff photograph...");

    const file = new File([croppedBlob], selectedFileName || "staff-photo.jpg", {
      type: "image/jpeg"
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", "faculty");

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

  const onAddFaculty = async (data: FacultyFormInput) => {
    setStatus("saving");
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
        setStatus("success");
        refreshData();
      } else {
        setStatus("error");
        toast.error(result.message || "Failed to save faculty profile.", { id: loadingToast });
      }
    } catch {
      setStatus("error");
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

    const formElement = document.getElementById("admin-faculty-form-top");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDeleteFaculty = async (id: string) => {
    const loadingToast = toast.loading("Deleting profile...");
    try {
      const res = await fetch(`/api/faculty?id=${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success("Faculty profile deleted successfully.", { id: loadingToast });
        refreshData();
      } else {
        toast.error(result.message || "Failed to delete faculty profile.", { id: loadingToast });
      }
    } catch {
      toast.error("Failed to connect to faculty delete API.", { id: loadingToast });
    }
  };

  // Group faculty list by teaching subject/department
  const groupedFaculty = facultyList.reduce((acc, member) => {
    const subject = member.subject?.trim() || "General / Other Departments";
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(member);
    return acc;
  }, {} as Record<string, Faculty[]>);

  const sortedSubjects = Object.keys(groupedFaculty).sort((a, b) => a.localeCompare(b));

  return (
    <div id="admin-faculty-form-top" className="flex flex-col gap-8">
      {/* Form Content */}
      <form onSubmit={facultyForm.handleSubmit(onAddFaculty)} className="flex flex-col gap-6 text-left">
        <div className="flex flex-col gap-1.5 pb-5 border-b border-slate-100 relative">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Users className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {editingFacultyId ? "Modify Staff Credentials" : "Register Educator Profile"}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Introduce newly joined mentors or modify active bios on the public faculty page.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-slate-700 tracking-wide">Teacher Name</label>
            <input
              type="text"
              placeholder="e.g. Shri Vinod Kumar Yadav"
              required
              className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 text-sm rounded-xl font-medium text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-white transition-all"
              {...facultyForm.register("name")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-slate-700 tracking-wide">Teaching Subject / Department</label>
            <input
              type="text"
              placeholder="e.g. Mathematics & IT Literacy"
              className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 text-sm rounded-xl font-medium text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-white transition-all"
              {...facultyForm.register("subject")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-slate-700 tracking-wide">Degrees & Qualifications</label>
            <input
              type="text"
              placeholder="e.g. M.Sc. (Physics), B.Ed."
              className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 text-sm rounded-xl font-medium text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-white transition-all"
              {...facultyForm.register("qualification")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-slate-700 tracking-wide">Teaching Tenure Experience</label>
            <input
              type="text"
              placeholder="e.g. 8 Years"
              className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 text-sm rounded-xl font-medium text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-white transition-all"
              {...facultyForm.register("experience")}
            />
          </div>
        </div>

        {/* Upload card */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-extrabold text-slate-700 tracking-wide">Teacher Photograph</label>

          <div className="flex flex-col sm:flex-row gap-5 items-center p-5 bg-slate-50 border border-slate-200 rounded-2xl">
            {/* Live image preview block */}
            <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-200 relative flex items-center justify-center shadow-inner">
              {watchedFacultyImage ? (
                <Image
                  src={getOptimizedImageUrl(watchedFacultyImage, 120)}
                  alt="Staff Preview"
                  width={80}
                  height={80}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              ) : (
                <Users className="w-8 h-8 text-slate-300" />
              )}
            </div>

            <div className="flex-1 flex flex-col gap-2 items-start w-full">
              <label className="relative grow cursor-pointer select-none group flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-xs font-extrabold text-slate-700 shadow-3xs">
                <UploadCloud className="w-4 h-4 text-primary shrink-0" />
                <span>Upload Photograph</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFacultyImageUpload}
                  disabled={facultyImageUploading}
                  className="hidden"
                />
              </label>

              <p className="text-[10px] text-slate-400 font-medium leading-none mt-1">
                {facultyImageUploading
                  ? "Uploading photo to asset storage..."
                  : "Upload PNG or JPG format (Max 5MB)."
                }
              </p>

              {watchedFacultyImage && (
                <button
                  type="button"
                  onClick={() => facultyForm.setValue("imageUrl", "")}
                  className="text-[10px] font-bold text-red-650 hover:underline cursor-pointer focus:outline-none"
                >
                  Clear Selected Image
                </button>
              )}
            </div>
          </div>
          <input type="hidden" {...facultyForm.register("imageUrl")} />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={status === "saving"}
            className="flex-1 py-4 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
          >
            {editingFacultyId ? (
              <Save className="w-4 h-4" />
            ) : (
              <PlusCircle className="w-4 h-4" />
            )}
            <span>
              {editingFacultyId
                ? "Save Teacher Credentials"
                : (status === "saving" ? "Registering Profile..." : "Register Educator Profile")}
            </span>
          </motion.button>

          {editingFacultyId && (
            <button
              type="button"
              onClick={() => {
                setEditingFacultyId(null);
                facultyForm.reset({ name: "", subject: "", qualification: "", experience: "", imageUrl: "" });
              }}
              className="px-6 py-4 border border-slate-350 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl shadow-3xs transition-all focus:outline-none cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Grid details */}
      <div className="mt-12 border-t border-slate-100 pt-10 text-left">
        <h4 className="text-sm font-black text-slate-900 mb-6">Active Staff Members ({facultyList.length})</h4>
        
        {facultyList.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 border border-slate-150 rounded-2xl">
            <p className="text-xs text-slate-500 font-semibold italic">No active staff bios loaded.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {facultyList.map((member, index) => (
                <motion.div
                  key={member.id || member._id || `faculty-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-slate-200 p-4.5 rounded-2xl flex flex-col justify-between gap-4 shadow-3xs hover:shadow-xs hover:border-slate-300 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Visual avatar with hover zoom */}
                    <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden relative shrink-0 shadow-inner flex items-center justify-center">
                      {member.imageUrl ? (
                        <Image
                          src={getOptimizedImageUrl(member.imageUrl, 120)}
                          alt={member.name}
                          fill
                          unoptimized
                          className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-black text-primary bg-primary-light text-xs">
                          {member.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <h5 className="text-xs font-black text-slate-900 break-words whitespace-normal leading-snug group-hover:text-primary transition-colors" title={member.name}>
                        {member.name}
                      </h5>
                      <span className="text-[10px] text-accent font-extrabold uppercase tracking-wide break-words whitespace-normal">
                        {member.subject || "General Educator"}
                      </span>
                      
                      {member.qualification && (
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide break-words flex items-start gap-1.5 mt-0.5 whitespace-normal">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-305 shrink-0 mt-0.5" />
                          <span className="break-words">{member.qualification}</span>
                        </span>
                      )}

                      {member.experience && (
                        <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wide break-words flex items-start gap-1.5 whitespace-normal">
                          <Briefcase className="w-3.5 h-3.5 text-slate-305 shrink-0 mt-0.5" />
                          <span className="break-words">{member.experience}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-2 border-t border-slate-50 pt-3">
                    <button
                      type="button"
                      onClick={() => handleStartEditFaculty(member)}
                      className="flex-1 py-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 text-slate-600 hover:text-blue-700 text-[10px] font-extrabold rounded-xl transition-all flex items-center justify-center gap-1 focus:outline-none cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Bio</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        triggerConfirm(
                          "Delete Teacher Profile",
                          `Are you sure you want to permanently delete the profile card of "${member.name}"? This action cannot be undone.`,
                          () => handleDeleteFaculty(member.id || member._id || "")
                        );
                      }}
                      className="py-2.5 px-3.5 bg-red-50/50 hover:bg-red-50 border border-red-100 hover:border-red-200 text-red-600 hover:text-red-700 rounded-xl transition-all focus:outline-none cursor-pointer"
                      title="Delete profile"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <ImageCropper
        isOpen={cropperOpen}
        onClose={() => {
          setCropperOpen(false);
          setCropperSrc(null);
        }}
        imageSrc={cropperSrc || ""}
        onCrop={handleCroppedUpload}
      />
    </div>
  );
}
