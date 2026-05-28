import React from "react";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | Nav Jeevan Public School Kushinagar",
  description:
    "Get in touch with Nav Jeevan Public School in Khabharabhar, Captanganj, Kushinagar, UP. Call +91 7880952150 or fill out our online inquiry form.",
};

export default function ContactPage() {
  return (
    <div className="py-12 bg-white flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            Contact Desk
          </span>
          <SectionHeading
            title="Get in Touch With Us"
            subtitle="We welcome you to visit our campus in Captanganj or reach out via phone, email, or WhatsApp."
          />
        </div>

        {/* Contact info cards row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Address card */}
          <div className="bg-neutral-light border border-gray-200 p-5 rounded-2xl flex gap-3.5 items-start">
            <MapPin className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-extrabold text-neutral-dark">
                Campus Address
              </h4>
              <p className="text-xs text-neutral-body mt-1 leading-relaxed">
                Khabharabhar, Captanganj,
                <br />
                Kushinagar, Uttar Pradesh - 274301
              </p>
            </div>
          </div>

          {/* Phone numbers card */}
          <div className="bg-neutral-light border border-gray-200 p-5 rounded-2xl flex gap-3.5 items-start">
            <Phone className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-extrabold text-neutral-dark">
                Call Helpline
              </h4>
              <a
                href="tel:+917880952150"
                className="block text-sm font-extrabold text-primary mt-1 hover:underline"
              >
                +917880952150
              </a>
              <span className="block text-[10px] text-neutral-body mt-0.5">
                8:00 AM to 2:00 PM
              </span>
            </div>
          </div>

          {/* Email card */}
          <div className="bg-neutral-light border border-gray-200 p-5 rounded-2xl flex gap-3.5 items-start">
            <Mail className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-extrabold text-neutral-dark">
                Email Support
              </h4>
              <a
                href="mailto:info@navjeevanschool.org"
                className="block text-xs font-extrabold text-neutral-dark mt-1 hover:underline break-all"
              >
                info@navjeevanschool.org
              </a>
              <span className="block text-[10px] text-neutral-body mt-0.5">
                Response within 24 hours
              </span>
            </div>
          </div>

          {/* Office hours card */}
          <div className="bg-neutral-light border border-gray-200 p-5 rounded-2xl flex gap-3.5 items-start">
            <Clock className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-extrabold text-neutral-dark">
                Office Timings
              </h4>
              <p className="text-xs text-neutral-body mt-1 leading-relaxed">
                <strong>Mon - Sat:</strong> 8:00 AM - 1:30 PM
                <br />
                <strong>Sunday:</strong> Closed (Holiday)
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form & Google Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Contact Form (Left) */}
          <div className="lg:col-span-6 flex flex-col gap-6 justify-center items-start w-full">
            <div className="flex flex-col gap-2 max-w-lg text-left">
              <span className="text-xs font-black text-primary uppercase tracking-widest">
                Inquiry Form
              </span>
              <h3 className="text-2xl font-extrabold text-neutral-dark tracking-tight leading-tight">
                Send Us a Message Online
              </h3>
              <p className="text-xs md:text-sm text-neutral-body leading-relaxed font-normal">
                If you have an admission query, fee concession request, or
                feedback, please fill in your details and our team will get in
                touch with you.
              </p>
            </div>

            <div className="w-full flex justify-start">
              <ContactForm />
            </div>
          </div>

          {/* Google Maps & WhatsApp Shortcut (Right) */}
          <div className="lg:col-span-6 flex flex-col gap-8 w-full text-left">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black text-primary uppercase tracking-widest">
                Map Directions
              </span>
              <h3 className="text-2xl font-extrabold text-neutral-dark tracking-tight leading-tight">
                Our Campus Location
              </h3>
              <p className="text-xs md:text-sm text-neutral-body leading-relaxed font-normal">
                Located in Khabharabhar, just a short distance from the main
                Captanganj block road, making it highly accessible for students
                and bus routes.
              </p>
            </div>

            {/* Google Map Safe iframe Frame */}
            <div className="relative w-full aspect-video rounded-3xl border border-gray-200 overflow-hidden shadow-sm bg-neutral-light">
              <iframe
                title="Nav Jeevan Public School Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113794.13783709033!2d83.67022068997321!3d26.927236531557022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39915cdad5d7d363%3A0xe5a3bb408b02130e!2sKhabharabhar%2C%20Captanganj%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1716892300000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>

            {/* Direct WhatsApp Call out */}
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
              <div className="flex gap-4 items-start text-left">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shrink-0 mt-0.5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-extrabold text-emerald-900 leading-tight">
                    Chat on WhatsApp
                  </h4>
                  <p className="text-[11px] text-emerald-700 mt-1 leading-relaxed font-semibold">
                    Have a quick question? Message our admissions team directly
                    on WhatsApp for an instant response.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/917880952150?text=Hello%20Nav%20Jeevan%20School%2C%20I%20have%20an%20admission%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-sm transition-colors focus:outline-none shrink-0 w-full md:w-auto cursor-pointer"
              >
                <span>Message Admissions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
