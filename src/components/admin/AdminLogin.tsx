"use client";

import { motion } from "framer-motion";
import { Lock, AlertCircle, LogIn, ArrowLeft, Shield } from "lucide-react";
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
    <div className="relative min-h-[90vh] bg-gradient-to-br from-[#1A1A2E] via-[#161626] to-[#0d0d16] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-accent/10 blur-[90px] pointer-events-none" />

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 text-xs font-semibold tracking-wide transition-all shadow-md backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-md z-10 flex flex-col gap-8">
        {/* Header branding */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-tr from-primary to-primary-hover border border-primary-light/20 flex items-center justify-center shadow-lg shadow-primary/25">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white mt-4">
            Nav Jeevan Public School
          </h1>
          <p className="text-xs text-white/50 tracking-wider uppercase font-black">
            Administration Gateway
          </p>
        </div>

        {/* Card Panel */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/15 p-8 rounded-[2rem] shadow-2xl flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-lg font-bold text-white tracking-wide">Staff Authorization</h2>
            <p className="text-xs text-white/60">
              Please enter your security keys to access dashboard operations.
            </p>
          </div>

          {/* Error alerts with animations */}
          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-200 p-4 rounded-2xl flex gap-3 items-start text-xs leading-relaxed"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="font-semibold">{loginError}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 text-left">
              <label htmlFor="username" className="text-xs font-bold text-white/80 tracking-wide">
                Admin Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter admin identifier"
                  className="w-full pl-4 pr-4 py-3.5 bg-white/5 border border-white/10 hover:border-white/20 focus:border-primary focus:ring-1 focus:ring-primary/30 text-sm rounded-2xl font-medium text-white placeholder-white/25 focus:outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <label htmlFor="password" className="text-xs font-bold text-white/80 tracking-wide">
                Security Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-4 py-3.5 bg-white/5 border border-white/10 hover:border-white/20 focus:border-primary focus:ring-1 focus:ring-primary/30 text-sm rounded-2xl font-medium text-white placeholder-white/25 focus:outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loginLoading}
              className="w-full mt-2 py-4 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-black text-sm rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
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
      </div>
    </div>
  );
}
