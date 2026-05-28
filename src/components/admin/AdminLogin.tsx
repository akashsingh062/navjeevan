"use client";

import React from "react";
import { Lock, AlertCircle, LogIn } from "lucide-react";

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
