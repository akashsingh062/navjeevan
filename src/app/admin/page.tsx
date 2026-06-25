"use client";

import { useState, useEffect } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { FileText, Camera, Users, LogOut, Globe, Shield } from "lucide-react";
import { toast } from "react-hot-toast";
import { Notice, Faculty, GalleryItem } from "@/types";
import AdminLogin from "@/components/admin/AdminLogin";
import NoticeFormSection from "@/components/admin/NoticeFormSection";
import GalleryFormSection from "@/components/admin/GalleryFormSection";
import FacultyFormSection from "@/components/admin/FacultyFormSection";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
      setIsLoggedIn(true);
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
      refreshData();
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
    { name: "notices" as TabName, label: "Bulletins & Notices", icon: FileText, desc: "Publish exam timelines, holiday lists, and circulars." },
    { name: "gallery" as TabName, label: "Photo Gallery Logs", icon: Camera, desc: "Register photo logs from school functions." },
    { name: "faculty" as TabName, label: "Teacher Roster", icon: Users, desc: "Add newly joined educators and mentors." }
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
    <div className="min-h-screen bg-[#F8FAFC] text-left flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-80 bg-[#0F172A] text-slate-355 flex flex-col shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800 z-10 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto hide-scrollbar">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary-hover flex items-center justify-center text-white shrink-0 shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white leading-tight tracking-wide">Nav Jeevan</h2>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mt-0.5">Control Center</span>
            </div>
          </div>
        </div>

        {/* Admin info card */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3 bg-slate-900/30">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">Administrator</p>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected Session
            </span>
          </div>
        </div>

        {/* Tab Items */}
        <nav className="p-4 flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible hide-scrollbar lg:flex-1">
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
                className={`relative flex items-center gap-3 px-4 py-3.5 lg:py-4 rounded-xl text-left text-xs font-bold transition-all duration-300 cursor-pointer focus:outline-none select-none group whitespace-nowrap lg:whitespace-normal shrink-0 lg:shrink ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 lg:w-5 lg:h-5 shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                <span className="leading-none">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="hidden lg:block absolute right-2.5 w-1 h-5 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer options */}
        <div className="p-4 border-t border-slate-800 flex flex-row lg:flex-col gap-2 justify-between lg:justify-start shrink-0">
          <a
            href="/"
            className="flex items-center justify-center lg:justify-start gap-2.5 px-4.5 py-3 rounded-xl text-xs font-bold transition-colors text-slate-400 hover:text-white hover:bg-slate-800 flex-1 lg:flex-initial"
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span>Go to Website</span>
          </a>
          <button
            onClick={() => triggerConfirm(
              "Sign Out",
              "Are you sure you want to terminate your administrative session?",
              handleLogout
            )}
            className="flex items-center justify-center lg:justify-start gap-2.5 px-4.5 py-3 rounded-xl text-xs font-bold transition-colors text-red-400 hover:text-white hover:bg-red-500/10 cursor-pointer text-left focus:outline-none flex-1 lg:flex-initial"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 shadow-3xs">
          <div>
            <span className="text-[10px] uppercase font-black tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full">
              Staff Workspace
            </span>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-tight mt-2.5">
              School Administration
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium max-w-xl">
              Publish announcements, update school galleries, and configure teacher bios for visitors.
            </p>
          </div>
          <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-end">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 bg-white text-slate-700 rounded-xl font-bold text-xs transition-all focus:outline-none cursor-pointer"
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span>Go to Website</span>
            </a>
            <button
              onClick={() => triggerConfirm(
                "Sign Out",
                "Are you sure you want to terminate your administrative session?",
                handleLogout
              )}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 text-red-750 bg-red-50 hover:bg-red-100 rounded-xl font-bold text-xs transition-all focus:outline-none cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Dashboard Panels */}
        <div className="p-6 md:p-8 flex flex-col gap-8 flex-1 max-w-6xl w-full mx-auto">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: "Active Bulletins", count: noticesList.length, icon: FileText, color: "from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-100 bg-white" },
              { label: "Photos Logged", count: galleryList.length, icon: Camera, color: "from-amber-500/10 to-amber-500/5 text-amber-600 border-amber-100 bg-white" },
              { label: "Teachers Registered", count: facultyList.length, icon: Users, color: "from-emerald-500/10 to-emerald-500/5 text-emerald-600 border-emerald-100 bg-white" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className={`bg-gradient-to-br ${stat.color} border p-5 rounded-2xl flex items-center justify-between shadow-3xs`}>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-extrabold tracking-wide text-slate-500">{stat.label}</span>
                    <span className="text-2xl font-black text-slate-900 leading-none">{stat.count}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-3xs">
                    <Icon className="w-5 h-5 text-slate-655" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Content Interface Container */}
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-primary-hover to-accent" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

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
