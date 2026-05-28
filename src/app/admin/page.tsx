"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import ConfirmModal from "@/components/ConfirmModal";
import { FileText, Camera, Users, LogOut } from "lucide-react";
import { toast } from "react-hot-toast";
import { Notice, Faculty, GalleryItem } from "@/types";
import AdminLogin from "@/components/admin/AdminLogin";
import NoticeFormSection from "@/components/admin/NoticeFormSection";
import GalleryFormSection from "@/components/admin/GalleryFormSection";
import FacultyFormSection from "@/components/admin/FacultyFormSection";

type TabName = "notices" | "gallery" | "faculty";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<TabName>("notices");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const [noticesList, setNoticesList] = useState<Notice[]>([]);
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);

  const [confirmModalConfig, setConfirmModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {}
  });

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

  const triggerConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModalConfig({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmModalConfig(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const tabs = [
    { name: "notices" as TabName, label: "Add Notice", icon: FileText, desc: "Publish exam timelines, holiday lists, and circulars." },
    { name: "gallery" as TabName, label: "Add Photo", icon: Camera, desc: "Register photo logs from school functions." },
    { name: "faculty" as TabName, label: "Add Teacher", icon: Users, desc: "Add newly joined educators and mentors." }
  ];

  if (!isLoggedIn) {
    return (
      <AdminLogin
        loginUsername={loginUsername}
        setLoginUsername={setLoginUsername}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        loginLoading={loginLoading}
        loginError={loginError}
        handleLogin={handleLogin}
      />
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
          {activeTab === "notices" && (
            <NoticeFormSection
              noticesList={noticesList}
              refreshData={refreshData}
              triggerConfirm={triggerConfirm}
              status={status}
              setStatus={setStatus}
            />
          )}

          {activeTab === "gallery" && (
            <GalleryFormSection
              galleryList={galleryList}
              refreshData={refreshData}
              triggerConfirm={triggerConfirm}
            />
          )}

          {activeTab === "faculty" && (
            <FacultyFormSection
              facultyList={facultyList}
              refreshData={refreshData}
              triggerConfirm={triggerConfirm}
              status={status}
              setStatus={setStatus}
            />
          )}
        </div>

      </div>

      <ConfirmModal
        isOpen={confirmModalConfig.isOpen}
        onClose={() => setConfirmModalConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModalConfig.onConfirm}
        title={confirmModalConfig.title}
        message={confirmModalConfig.message}
      />
    </div>
  );
}
