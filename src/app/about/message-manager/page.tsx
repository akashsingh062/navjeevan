import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Quote } from "lucide-react";

export const metadata = {
  title: "Manager's Message | Nav Jeevan Public School",
  description:
    "A message from the Managing Director of Nav Jeevan Public School, Kaptanganj, Kushinagar.",
};

export default function ManagerMessagePage() {
  return (
    <div className="flex-1 bg-white">
      {/* Breadcrumb */}
      <div className="bg-neutral-light border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-neutral-body">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-neutral-dark font-semibold">
            Manager's Message
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-1 w-10 bg-accent rounded-full" />
          <span className="text-xs font-black text-accent uppercase tracking-widest">
            Management Desk
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark mb-8">
          Manager's Message
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
          {/* Photo */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 border-accent/20 shadow-md bg-neutral-light">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format"
                alt="Manager - Shri Anil Kumar Singh"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-extrabold text-neutral-dark">
                Shri Anil Kumar Singh
              </p>
              <p className="text-xs text-accent font-bold uppercase tracking-wide mt-0.5">
                Managing Director
              </p>
              <p className="text-[10px] text-neutral-body mt-1">
                Nav Jeevan Public School
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <div className="relative bg-primary-light rounded-2xl p-6 border border-primary/15">
              <Quote className="absolute top-4 left-4 w-6 h-6 text-primary/20" />
              <div className="flex flex-col gap-4 text-sm text-neutral-body leading-relaxed pl-4">
                <p>Dear Students, Parents, and Well-wishers,</p>
                <p>
                  It is with immense pride and deep humility that I welcome you
                  to Nav Jeevan Public School. When we founded this institution
                  in 2008, our singular goal was simple yet profound — to ensure
                  that no child in Khabharabhar and the surrounding villages of
                  Kaptanganj would have to travel far for quality education.
                </p>
                <p>
                  Education is not merely the transfer of knowledge. It is the
                  awakening of a young mind to its own potential. At Nav Jeevan,
                  we strive every day to create an environment where children
                  feel safe, celebrated, and inspired to grow — academically,
                  morally, and socially.
                </p>
                <p>
                  I am deeply grateful to our dedicated faculty, our supportive
                  parent community, and each student who has placed their trust
                  in this institution. Together, we are building a stronger,
                  more educated Kushinagar.
                </p>
                <p className="font-semibold text-neutral-dark">
                  With warm regards,
                  <br />
                  Shri Anil Kumar Singh
                  <br />
                  <span className="text-xs font-normal text-primary">
                    Managing Director, Nav Jeevan Public School
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
