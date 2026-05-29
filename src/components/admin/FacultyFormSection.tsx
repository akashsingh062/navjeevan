"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Save, PlusCircle, Users, Edit, Trash2 } from "lucide-react";
import { Faculty } from "@/types";

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

  const handleFacultyImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFacultyImageUploading(true);
    const loadingToast = toast.loading("Uploading staff photograph...");

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

    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
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
        
        <div className="flex flex-col sm:flex-row gap-4 items-center p-5 bg-neutral-light border border-gray-200 rounded-2xl">
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
                    onClick={() => {
                      triggerConfirm(
                        "Delete Teacher Profile",
                        `Are you sure you want to permanently delete the profile card of "${member.name}"? This action cannot be undone.`,
                        () => handleDeleteFaculty(member.id || member._id || "")
                      );
                    }}
                    className="flex items-center justify-center p-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl transition-all cursor-pointer focus:outline-none shrink-0"
                    title="Delete Faculty Profile"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
