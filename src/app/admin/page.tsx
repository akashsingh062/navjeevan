"use client";

import { useState, useEffect } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { FileText, Camera, Users, LogOut, Globe, Shield, Activity, TrendingUp, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";
import { Notice, Faculty, GalleryItem } from "@/types";
import AdminLogin from "@/components/admin/AdminLogin";
import NoticeFormSection from "@/components/admin/NoticeFormSection";
import GalleryFormSection from "@/components/admin/GalleryFormSection";
import FacultyFormSection from "@/components/admin/FacultyFormSection";
import { motion, AnimatePresence } from "framer-motion";

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
    { name: "notices" as TabName, label: "Bulletins & Notices", icon: FileText, desc: "Publish exam timelines, holiday lists, and circulars.", color: "text-blue-500", bgColor: "bg-blue-500" },
    { name: "gallery" as TabName, label: "Photo Gallery Logs", icon: Camera, desc: "Register photo logs from school functions.", color: "text-amber-500", bgColor: "bg-amber-500" },
    { name: "faculty" as TabName, label: "Teacher Profile", icon: Users, desc: "Add newly joined educators and mentors.", color: "text-emerald-500", bgColor: "bg-emerald-500" }
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
    <div className="min-h-screen bg-[#F8FAFC] text-left flex flex-col lg:flex-row relative">
      {/* ──────────── SIDEBAR (Desktop) ──────────── */}
      <aside className="hidden lg:flex lg:w-80 bg-gradient-to-b from-[#0F172A] via-[#131d35] to-[#0d1526] text-slate-355 flex-col shrink-0 lg:border-r border-slate-800/50 z-10 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto hide-scrollbar">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/60 flex items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-primary-hover flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20 animate-glow-pulse">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white leading-tight tracking-wide">Nav Jeevan</h2>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mt-0.5">Control Center</span>
            </div>
          </div>
        </div>

        {/* Admin info card */}
        <div className="p-5 border-b border-slate-800/60 flex items-center gap-3 bg-slate-900/20">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 flex items-center justify-center font-bold text-white text-xs shadow-sm">
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
        <nav className="p-4 flex flex-col gap-1.5 lg:flex-1">
          <p className="text-[9px] uppercase font-extrabold tracking-widest text-slate-500 px-4 mb-2">Navigation</p>
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
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-xs font-bold transition-all duration-300 cursor-pointer focus:outline-none select-none group whitespace-normal shrink-0 lg:shrink ${
                  isActive
                    ? "bg-white/[0.08] text-white shadow-lg shadow-white/[0.02] border border-slate-700/50"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isActive ? `bg-primary/20 text-primary` : "bg-slate-800/50 text-slate-400 group-hover:text-white group-hover:bg-slate-800"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="leading-none">{tab.label}</span>
                  {isActive && (
                    <span className="text-[9px] text-slate-400 font-medium leading-none">{tab.desc}</span>
                  )}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute right-3 w-1 h-5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer options */}
        <div className="p-4 border-t border-slate-800/60 flex flex-col gap-1.5 shrink-0">
          <a
            href="/"
            className="flex items-center gap-2.5 px-4.5 py-3 rounded-xl text-xs font-bold transition-colors text-slate-400 hover:text-white hover:bg-white/[0.04]"
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
            className="flex items-center gap-2.5 px-4.5 py-3 rounded-xl text-xs font-bold transition-colors text-red-400 hover:text-white hover:bg-red-500/10 cursor-pointer text-left focus:outline-none"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ──────────── MOBILE HEADER ──────────── */}
      <header className="lg:hidden sticky top-0 glass-dark text-white h-16 px-4 flex items-center justify-between border-b border-slate-800/50 z-20 shadow-sm shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-primary-hover flex items-center justify-center text-white shrink-0 shadow-sm">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-black leading-none text-white tracking-wide">Nav Jeevan</h2>
            <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest block mt-0.5">Control Center</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <a
            href="/"
            title="Go to Website"
            className="p-2 text-slate-400 hover:text-white transition-colors flex items-center justify-center rounded-lg hover:bg-slate-800/50"
          >
            <Globe className="w-4 h-4" />
          </a>
          <button
            onClick={() => triggerConfirm(
              "Sign Out",
              "Are you sure you want to terminate your administrative session?",
              handleLogout
            )}
            title="Sign Out"
            className="p-2 text-red-400 hover:text-red-305 transition-colors cursor-pointer focus:outline-none flex items-center justify-center rounded-lg hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ──────────── MAIN CONTENT ──────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-20 lg:pb-0">
        {/* Desktop Top Header */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-5 hidden lg:flex lg:flex-row justify-between items-start lg:items-center gap-4 shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[10px] uppercase font-black tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full">
                Staff Workspace
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                •
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Live
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
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

        {/* Mobile Page Title */}
        <div className="px-4 py-3 flex flex-col gap-1 border-b border-slate-100 bg-white lg:hidden shrink-0 text-left">
          <span className="text-[8px] uppercase font-black tracking-wider text-primary bg-primary-light px-2 py-0.5 rounded-full self-start">
            Staff Workspace
          </span>
          <h1 className="text-sm font-black text-slate-900 tracking-tight leading-none mt-1">
            School Administration
          </h1>
        </div>

        {/* Dashboard Panels */}
        <div className="p-3 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-8 flex-1 max-w-6xl w-full mx-auto">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-5">
            {[
              { label: "Bulletins", count: noticesList.length, icon: FileText, gradient: "from-blue-500/10 to-blue-600/5", color: "text-blue-600", borderColor: "border-blue-100", iconBg: "bg-blue-50" },
              { label: "Photos", count: galleryList.length, icon: Camera, gradient: "from-amber-500/10 to-amber-600/5", color: "text-amber-600", borderColor: "border-amber-100", iconBg: "bg-amber-50" },
              { label: "Teachers", count: facultyList.length, icon: Users, gradient: "from-emerald-500/10 to-emerald-600/5", color: "text-emerald-600", borderColor: "border-emerald-100", iconBg: "bg-emerald-50" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className={`relative border ${stat.borderColor} bg-white p-2.5 sm:p-5 rounded-2xl flex flex-row items-center justify-between gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-left overflow-hidden card-hover-lift`}>
                  {/* Subtle gradient bg */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} pointer-events-none`} />

                  <div className="flex flex-col gap-0.5 min-w-0 relative z-10">
                    <span className="text-[8px] sm:text-[10px] uppercase font-extrabold tracking-wide text-slate-400 truncate">{stat.label}</span>
                    <span className="text-sm sm:text-2xl font-black text-slate-900 leading-none">{stat.count}</span>
                    <span className={`hidden sm:flex items-center gap-1 text-[9px] font-bold ${stat.color} mt-1`}>
                      <TrendingUp className="w-3 h-3" />
                      Active
                    </span>
                  </div>
                  <div className={`w-7 h-7 sm:w-11 sm:h-11 rounded-xl ${stat.iconBg} ${stat.color} border ${stat.borderColor} flex items-center justify-center shrink-0 relative z-10`}>
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-inherit" />
                  </div>
                </div>
              );
            })}
          </div>
 
          {/* Form Content Interface Container */}
          <div className="bg-white border border-slate-200 p-3.5 sm:p-6 md:p-8 rounded-3xl shadow-[0_1px_6px_rgba(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-primary-hover to-accent" />

            {/* Active Tab Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              {(() => {
                const currentTab = tabs.find(t => t.name === activeTab);
                const Icon = currentTab?.icon || FileText;
                return (
                  <>
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-900 leading-none">{currentTab?.label}</h2>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">{currentTab?.desc}</p>
                    </div>
                  </>
                );
              })()}
            </div>
            
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

      {/* ──────────── MOBILE BOTTOM NAV ──────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-stretch justify-around z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
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
              className={`flex flex-col items-center justify-center flex-1 gap-1 min-h-0 min-w-0 text-center relative focus:outline-none cursor-pointer select-none ${
                isActive ? "text-primary font-black" : "text-slate-400 font-bold"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-active-line"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isActive ? "bg-primary/10" : ""
              }`}>
                <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110" : "scale-100"}`} />
              </div>
              <span className="text-[9px] leading-none tracking-wide">{tab.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </nav>

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
