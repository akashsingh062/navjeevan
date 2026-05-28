"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Phone,
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MessageCircle,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Define the validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(12, "Phone number must not exceed 12 digits")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  honeypot: z.string().optional(), // Bot trap honeypot field
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (showSuccessModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSuccessModal]);

  // Handle escape key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSuccessModal(false);
        setSubmitStatus("idle");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    // If honeypot is filled, silent reject (bot spam protection)
    if (data.honeypot) {
      console.warn("Spam bot detected!");
      setSubmitStatus("success");
      setSubmittedName(data.name || "Guest");
      setShowSuccessModal(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Validate schema client-side
      contactSchema.parse(data);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setSubmittedName(data.name);
        setShowSuccessModal(true);
        toast.success("Inquiry sent successfully!");
        reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          result.message || "Failed to submit inquiry. Please try again.",
        );
        toast.error(
          result.message || "Failed to submit inquiry. Please try again.",
        );
      }
    } catch (err: unknown) {
      setSubmitStatus("error");
      let msg = "An unexpected error occurred. Please check your connection.";
      if (err instanceof z.ZodError) {
        msg = err.issues[0]?.message || "Invalid input data.";
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-5 w-full max-w-lg"
      >
        <div className="flex flex-col gap-1.5 mb-2">
          <h3 className="text-lg font-extrabold text-neutral-dark">Send Online Inquiry</h3>
          <p className="text-xs text-neutral-body font-normal leading-relaxed">
            Fill out the form below, and our team in Kaptanganj will call you back.
          </p>
        </div>

        {/* Error Banner */}
        {submitStatus === "error" && (
          <div
            className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex gap-2.5 items-start text-xs font-semibold leading-relaxed"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Honeypot Spam Bot Trap (hidden visually but readable by bots) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="honeypot">Leave this field blank</label>
          <input
            id="honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("honeypot")}
          />
        </div>

        {/* Name Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-extrabold text-neutral-dark flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-primary" />
            Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Ramesh Kumar"
            className={`w-full px-4 py-3 bg-neutral-light border text-sm rounded-xl font-medium focus:outline-none focus:bg-white focus:border-primary transition-all text-neutral-dark ${
              errors.name ? "border-brand-red" : "border-gray-200"
            }`}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span id="name-error" className="text-[11px] text-brand-red font-bold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-extrabold text-neutral-dark flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-primary" />
            Mobile Number <span className="text-brand-red">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500 select-none">
              +91
            </span>
            <input
              id="phone"
              type="tel"
              placeholder="9876543210"
              className={`w-full pl-14 pr-4 py-3 bg-neutral-light border text-sm rounded-xl font-medium focus:outline-none focus:bg-white focus:border-primary transition-all text-neutral-dark ${
                errors.phone ? "border-brand-red" : "border-gray-200"
              }`}
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone", { required: "Mobile number is required" })}
            />
          </div>
          {errors.phone && (
            <span id="phone-error" className="text-[11px] text-brand-red font-bold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* Email Address Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-extrabold text-neutral-dark flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-primary" />
            Email Address <span className="text-brand-red">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="ramesh@gmail.com"
            className={`w-full px-4 py-3 bg-neutral-light border text-sm rounded-xl font-medium focus:outline-none focus:bg-white focus:border-primary transition-all text-neutral-dark ${
              errors.email ? "border-brand-red" : "border-gray-200"
            }`}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span id="email-error" className="text-[11px] text-brand-red font-bold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Message Textarea */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-xs font-extrabold text-neutral-dark flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-primary" />
            Your Message <span className="text-brand-red">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Type your inquiry or question here..."
            className={`w-full px-4 py-3 bg-neutral-light border text-sm rounded-xl font-medium focus:outline-none focus:bg-white focus:border-primary transition-all text-neutral-dark ${
              errors.message ? "border-brand-red" : "border-gray-200"
            }`}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && (
            <span id="message-error" className="text-[11px] text-brand-red font-bold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.message.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
        >
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>

      {/* Success Modal Popup Overlay */}
      <AnimatePresence>
        {showSuccessModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Backdrop click closer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowSuccessModal(false);
                setSubmitStatus("idle");
              }}
              className="absolute inset-0 cursor-pointer pointer-events-auto"
            />

            {/* Dialog Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl z-10 border border-gray-100 flex flex-col items-center text-center gap-5 pointer-events-auto"
            >
              {/* Close Button X */}
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setSubmitStatus("idle");
                }}
                className="absolute top-4 right-4 p-1.5 hover:bg-neutral-light rounded-full text-neutral-body hover:text-neutral-dark transition-colors focus:outline-none"
                aria-label="Close message"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Bouncing success icon ring */}
              <div className="relative mt-2">
                <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-45 scale-125" />
                <div className="relative p-4 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <h3
                  id="modal-title"
                  className="text-lg md:text-xl font-extrabold text-neutral-dark flex items-center justify-center gap-1.5"
                >
                  <span>Inquiry Submitted!</span>
                  <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
                </h3>

                <p className="text-xs md:text-sm font-medium text-neutral-body leading-relaxed max-w-sm">
                  Thank you,{" "}
                  <strong className="text-neutral-dark font-black">
                    {submittedName}
                  </strong>
                  ! We have registered your inquiry details successfully.
                </p>

                <p className="text-xs text-neutral-body/90 leading-relaxed max-w-sm bg-neutral-light/50 p-3 rounded-2xl border border-gray-150 mt-1">
                  Our admissions team and school administration staff at
                  Kushinagar will review your message and contact you on your
                  mobile number shortly.
                </p>
              </div>

              {/* Actions grid */}
              <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-2">
                {/* WhatsApp direct helpline action */}
                <a
                  href="https://wa.me/917880952150?text=Hello%20Nav%20Jeevan%20School%20Kushinagar%2C%20I%20have%2520just%2520submitted%2520an%2520inquiry%2520online%2520and%2520would%2520like%2520to%2520connect%2520directly."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 focus:outline-none"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* standard dismiss button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccessModal(false);
                    setSubmitStatus("idle");
                  }}
                  className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white font-extrabold text-xs rounded-xl shadow-sm transition-all focus:outline-none cursor-pointer"
                >
                  Awesome, Thanks!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
