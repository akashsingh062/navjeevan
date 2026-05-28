import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Quote } from "lucide-react";

export const metadata = {
  title: "Principal's Message | Nav Jeevan Public School",
  description:
    "A message from the Principal of Nav Jeevan Public School, Kaptanganj, Kushinagar.",
};

export default function PrincipalMessagePage() {
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
            Principal's Message
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-1 w-10 bg-primary rounded-full" />
          <span className="text-xs font-black text-primary uppercase tracking-widest">
            Principal's Desk
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark mb-8">
          Principal's Message
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
          {/* Photo */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-md bg-neutral-light">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face&auto=format"
                alt="Principal - Shri Rajesh Kumar Mishra"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-extrabold text-neutral-dark">
                Shri Rajesh Kumar Mishra
              </p>
              <p className="text-xs text-primary font-bold uppercase tracking-wide mt-0.5">
                Principal
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
                <p>Dear Students, Parents, and Guardians,</p>
                <p>
                  It is a joy and an honour to serve as the Principal of Nav
                  Jeevan Public School. Our objective here is not simply to
                  produce students who score well in examinations — though
                  academic excellence is certainly important. Our deeper aim is
                  to nurture young individuals who are curious, compassionate,
                  and courageous.
                </p>
                <p>
                  We understand that many of our families have made significant
                  sacrifices to provide their children with an education. That
                  trust weighs deeply on us. Every lesson planned, every
                  activity organized, every interaction between teacher and
                  student is guided by a single question: are we truly helping
                  this child grow?
                </p>
                <p>
                  Our commitment is to make learning accessible, exciting, and
                  morally grounding. We ensure our children are not left behind
                  by modern digital advancements, bridging technology with
                  regional culture. Whether through our IT lab, smart
                  classrooms, sports, or cultural programs — we aim to develop
                  every dimension of a child's being.
                </p>
                <p className="font-semibold text-neutral-dark">
                  With respect and affection,
                  <br />
                  Shri Rajesh Kumar Mishra
                  <br />
                  <span className="text-xs font-normal text-primary">
                    Principal, Nav Jeevan Public School
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
