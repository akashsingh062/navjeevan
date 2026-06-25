"use client";

import { motion } from "framer-motion";
import { Lock, AlertCircle, LogIn, ArrowLeft, Shield, Sparkles, GraduationCap } from "lucide-react";
import Link from "next/link";

interface AdminLoginProps {
  loginUsername: string;
  setLoginUsername: (val: string) => void;
  loginPassword: string;
  setLoginPassword: (val: string) => void;
  loginLoading: boolean;
  loginError: string;
  handleLogin: (e: React.FormEvent) => void;
}

export default function AdminLogin({
  loginUsername,
  setLoginUsername,
  loginPassword,
  setLoginPassword,
  loginLoading,
  loginError,
  handleLogin,
}: AdminLoginProps) {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-[#0F172A] via-[#1a1e3a] to-[#0d1526] flex flex-col items-center justify-center p-6 overflow-hidden animate-gradient-shift" style={{ backgroundSize: "200% 200%" }}>
      {/* Animated mesh gradient orbs */}
      <div className="absolute top-[-15%] left-[-15%] w-[40rem] h-[40rem] rounded-full bg-primary/8 blur-[120px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[35rem] h-[35rem] rounded-full bg-accent/8 blur-[100px] pointer-events-none animate-float" />
      <div className="absolute top-[40%] left-[50%] w-[25rem] h-[25rem] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      {/* Floating decorative elements */}
      <div className="absolute top-[15%] right-[15%] opacity-[0.06] animate-float-slow pointer-events-none hidden md:block">
        <GraduationCap className="w-20 h-20 text-white" />
      </div>
      <div className="absolute bottom-[20%] left-[12%] opacity-[0.04] animate-float pointer-events-none hidden md:block">
        <Shield className="w-16 h-16 text-white" />
      </div>

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 hover:border-white/20 text-xs font-semibold tracking-wide transition-all shadow-md backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-md z-10 flex flex-col gap-8">
        {/* Header branding */}
        <div className="flex flex-col items-center text-center gap-2.5">
          <div className="relative">
            <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-primary to-primary-hover border border-primary-light/20 flex items-center justify-center shadow-2xl shadow-primary/30 animate-glow-pulse">
              <Shield className="w-9 h-9 text-white" />
            </div>
            {/* Sparkle decoration */}
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center shadow-sm">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white mt-4">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Nav Jeevan Public School
            </span>
          </h1>
          <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase font-black">
            Administration Gateway
          </p>
        </div>

        {/* Card Panel */}
        <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.12] p-8 rounded-[2rem] shadow-2xl flex flex-col gap-6 relative overflow-hidden">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          {/* Subtle inner glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
          
          <div className="flex flex-col gap-1 text-center relative z-10">
            <h2 className="text-lg font-bold text-white tracking-wide">Staff Authorization</h2>
            <p className="text-xs text-white/50">
              Please enter your security keys to access dashboard operations.
            </p>
          </div>

          {/* Error alerts with animations */}
          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/25 text-red-200 p-4 rounded-2xl flex gap-3 items-start text-xs leading-relaxed backdrop-blur-sm"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="font-semibold">{loginError}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5 relative z-10">
            <div className="flex flex-col gap-2 text-left">
              <label htmlFor="username" className="text-xs font-bold text-white/70 tracking-wide">
                Admin Username
              </label>
              <div className="relative group">
                <input
                  id="username"
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter admin identifier"
                  className="w-full pl-4 pr-4 py-3.5 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/60 focus:ring-2 focus:ring-primary/20 text-sm rounded-2xl font-medium text-white placeholder-white/20 focus:outline-none transition-all"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <label htmlFor="password" className="text-xs font-bold text-white/70 tracking-wide">
                Security Password
              </label>
              <div className="relative group">
                <input
                  id="password"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-4 py-3.5 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/60 focus:ring-2 focus:ring-primary/20 text-sm rounded-2xl font-medium text-white placeholder-white/20 focus:outline-none transition-all"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loginLoading}
              className="w-full mt-2 py-4 bg-gradient-to-r from-primary to-primary-hover disabled:from-primary/40 disabled:to-primary/30 text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
            >
              {loginLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Security note */}
        <p className="text-[10px] text-white/25 text-center font-medium tracking-wide">
          <Lock className="w-3 h-3 inline-block mr-1 -mt-0.5" />
          Secure connection • Authorized personnel only
        </p>
      </div>
    </div>
  );
}
