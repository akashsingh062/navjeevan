"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Phone, Mail, User, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";

// Define the validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(12, "Phone number must not exceed 12 digits")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  honeypot: z.string().optional() // Bot trap honeypot field
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // If honeypot is filled, silent reject (bot spam protection)
    if (data.honeypot) {
      console.warn("Spam bot detected!");
      setSubmitStatus("success");
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
          message: data.message
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err: any) {
      setSubmitStatus("error");
      if (err instanceof z.ZodError) {
        setErrorMessage(err.errors[0]?.message || "Invalid input data.");
      } else {
        setErrorMessage("An unexpected error occurred. Please check your connection.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div 
        className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center flex flex-col items-center gap-4 text-emerald-800"
        role="alert"
      >
        <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-extrabold">Inquiry Sent Successfully!</h3>
        <p className="text-sm font-medium text-emerald-700 max-w-sm leading-relaxed">
          Thank you for contacting Nav Jeevan Public School. Our admission cell or administration staff will get in touch with you shortly.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="mt-2 px-5 py-2.5 bg-accent text-white font-bold text-sm rounded-xl hover:bg-accent-hover transition-colors focus:outline-none"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-5 w-full max-w-lg"
    >
      <div className="flex flex-col gap-1.5 mb-2">
        <h3 className="text-lg font-extrabold text-neutral-dark">Send Online Inquiry</h3>
        <p className="text-xs text-neutral-body font-normal leading-relaxed">
          Fill out the form below, and our team in Captanganj will call you back.
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
            className={`w-full pl-12 pr-4 py-3 bg-neutral-light border text-sm rounded-xl font-medium focus:outline-none focus:bg-white focus:border-primary transition-all text-neutral-dark ${
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
  );
}
