"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryItem } from "@/types";
import { ZoomIn, Camera } from "lucide-react";
import ImageModal from "./ImageModal";

interface GalleryGridProps {
  items: GalleryItem[];
  limit?: number;
}

const CATEGORIES = [
  "All",
  "Annual Function",
  "Sports Day",
  "Classroom Activities",
  "Cultural Events",
  "Independence Day",
  "Prize Distribution"
];

export default function GalleryGrid({ items, limit }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Filter items based on active category selection
  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter(item => item.category === selectedCategory);

  // Apply page-level limit if present (e.g. for Home Page preview)
  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Category Filter Button Bar (skip if limit is set, e.g. on home page) */}
      {!limit && (
        <div 
          className="flex flex-wrap gap-2.5 justify-center pb-2 border-b border-gray-100"
          role="tablist"
          aria-label="Gallery Categories"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 text-xs font-extrabold rounded-full border transition-all cursor-pointer focus:outline-none ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white text-neutral-body border-gray-200 hover:border-gray-300 hover:text-neutral-dark"
              }`}
              role="tab"
              aria-selected={selectedCategory === cat}
              tabIndex={0}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Cards Grid */}
      {displayedItems.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-3xl p-6">
          <Camera className="w-10 h-10 text-neutral-body/40 mx-auto mb-3" />
          <p className="text-sm font-semibold text-neutral-body">No images uploaded under this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedItems.map((item) => {
            const hasError = imageErrors[item.id || ""] || false;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col items-start focus:outline-none text-left w-full h-full cursor-pointer relative"
                aria-haspopup="dialog"
                aria-label={`View photo of ${item.title}`}
              >
                {/* Photo Aspect Ratio Block */}
                <div className="relative w-full aspect-4/3 bg-neutral-light overflow-hidden flex items-center justify-center border-b border-gray-100">
                  {item.imageUrl && !hasError ? (
                    <>
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-w-640px) 100vw, (max-w-768px) 50vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError(item.id || "")}
                        loading="lazy"
                      />
                      {/* Zoom Indicator Icon Overlay on hover */}
                      <div className="absolute inset-0 bg-neutral-dark/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                        <ZoomIn className="w-8 h-8" />
                      </div>
                    </>
                  ) : (
                    /* Elegant visual fallback when image asset is missing locally */
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-emerald-50/40 flex flex-col items-center justify-center p-4 text-center">
                      <Camera className="w-8 h-8 text-primary/40 mb-2" />
                      <span className="text-[10px] uppercase font-extrabold text-accent bg-accent/10 px-2 rounded-full tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info Text Area */}
                <div className="p-4 flex-1 flex flex-col justify-between w-full">
                  <div>
                    <span className="text-[9px] uppercase font-black text-neutral-body tracking-wider block">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-extrabold text-neutral-dark mt-1 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Image Modal Lightbox Pop-up portal */}
      {selectedItem && (
        <ImageModal
          isOpen={!!selectedItem}
          imageUrl={selectedItem.imageUrl}
          category={selectedItem.category}
          title={selectedItem.title}
          date={selectedItem.uploadedAt}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
