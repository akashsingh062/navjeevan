"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GalleryItem } from "@/types";
import { 
  ZoomIn, 
  Camera, 
  FolderClosed, 
  FolderOpen, 
  ArrowLeft, 
  Shuffle, 
  Image as ImageIcon 
} from "lucide-react";
import ImageModal from "./ImageModal";

interface GalleryGridProps {
  items: GalleryItem[];
  limit?: number;
}

const CATEGORIES = [
  "Annual Function",
  "Sports Day",
  "Classroom Activities",
  "Cultural Events",
  "Independence Day",
  "Prize Distribution",
  "Others"
];

export default function GalleryGrid({ items, limit }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [currentHighlight, setCurrentHighlight] = useState<GalleryItem | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // Get a random photo different from the current one
  const getRandomPhoto = useCallback((currentId?: string): GalleryItem | null => {
    if (!items || items.length === 0) return null;
    if (items.length === 1) return items[0];
    const filtered = currentId ? items.filter(i => i.id !== currentId) : items;
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  }, [items]);

  // Client-side initialization to prevent Hydration Mismatch
  useEffect(() => {
    if (items && items.length > 0) {
      const timer = setTimeout(() => {
        setCurrentHighlight(prev => prev || getRandomPhoto());
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [items, getRandomPhoto]);

  // Swap transition helper
  const swapHighlight = useCallback(() => {
    if (!items || items.length === 0) return;
    setIsFading(true);
    setIsShuffling(true);

    setTimeout(() => {
      setCurrentHighlight(prev => getRandomPhoto(prev?.id || undefined));
      setIsFading(false);
      setTimeout(() => {
        setIsShuffling(false);
      }, 500);
    }, 300); // 300ms matches out fade transition
  }, [items, getRandomPhoto]);

  // Auto-swap highlight photo every 5 seconds
  useEffect(() => {
    if (!items || items.length === 0 || selectedCategory) return;

    const interval = setInterval(() => {
      swapHighlight();
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, [items, selectedCategory, swapHighlight]);

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Calculate count per category
  const getCategoryCounts = () => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach(cat => {
      counts[cat] = items.filter(item => item.category === cat).length;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  // Filter categories to only those containing at least 1 photo
  const populatedCategories = CATEGORIES.filter(cat => categoryCounts[cat] > 0);

  // Filter items for current category view
  const filteredItems = selectedCategory
    ? items.filter(item => item.category === selectedCategory)
    : items;

  // Apply page-level limit if present (e.g. for Home Page preview)
  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  return (
    <div className="flex flex-col gap-10">
      
      {/* =========================================================
          CASE A: PAGE LIMIT IS SET (E.G. HOME PAGE PREVIEW)
          ========================================================= */}
      {limit ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedItems.slice(0, limit).map((item) => {
            const hasError = imageErrors[item.id || ""] || false;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col items-start focus:outline-none text-left w-full h-full cursor-pointer relative"
                aria-haspopup="dialog"
                aria-label={`View photo of ${item.title}`}
              >
                <div className="relative w-full aspect-4/3 bg-neutral-light overflow-hidden flex items-center justify-center border-b border-border">
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
                      <div className="absolute inset-0 bg-neutral-dark/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                        <ZoomIn className="w-8 h-8" />
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-tr from-blue-50 to-emerald-50/40 flex flex-col items-center justify-center p-4 text-center">
                      <Camera className="w-8 h-8 text-primary/40 mb-2" />
                      <span className="text-[10px] uppercase font-extrabold text-accent bg-accent/10 px-2 rounded-full tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 w-full">
                  <span className="text-[9px] uppercase font-black text-accent tracking-wider block">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-extrabold text-neutral-dark mt-1 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* =========================================================
            CASE B: MAIN PHOTO GALLERY PAGE (WITH FOLDERS OVERHAUL)
            ========================================================= */
        <>
          {/* 1. AUTO-SWAPPING RANDOM PHOTO HIGHLIGHTS SHOWCASE */}
          {!selectedCategory && items.length > 0 && currentHighlight && (
            <div className="bg-surface border border-border rounded-3xl p-6 shadow-xs relative overflow-hidden animate-fade-in-up">
              {/* Saffron side border decoration */}
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-primary" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4 mb-6">
                <div>
                  <h3 className="text-base font-black text-neutral-dark flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary animate-pulse" />
                    Lively Gallery Highlights
                  </h3>
                  <p className="text-xs text-neutral-body font-semibold mt-1">
                    An active, swapping showcase of student life, sports, and celebrations.
                  </p>
                </div>
                <button
                  onClick={swapHighlight}
                  disabled={isShuffling}
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer select-none focus:outline-none shrink-0"
                >
                  <Shuffle className={`w-3.5 h-3.5 ${isShuffling ? "animate-spin" : ""}`} />
                  <span>Next Snap</span>
                </button>
              </div>

              {/* Swapping Active Hero Container */}
              <div className="w-full flex justify-center">
                <div 
                  onClick={() => setSelectedItem(currentHighlight)}
                  className={`w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-border shadow-sm bg-neutral-light cursor-pointer relative group transition-all duration-300 ${
                    isFading ? "opacity-0 scale-98" : "opacity-100 scale-100"
                  }`}
                  role="button"
                  aria-label={`View featured snapshot: ${currentHighlight.title}`}
                >
                  {currentHighlight.imageUrl && !imageErrors[`rand-single-${currentHighlight.id}`] ? (
                    <>
                      <Image
                        src={currentHighlight.imageUrl}
                        alt={currentHighlight.title}
                        fill
                        priority
                        className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                        onError={() => handleImageError(`rand-single-${currentHighlight.id}`)}
                      />
                      <div className="absolute inset-0 bg-neutral-dark/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                        <ZoomIn className="w-8 h-8" />
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-tr from-blue-50 to-emerald-50/40 flex flex-col items-center justify-center p-6 text-center">
                      <Camera className="w-10 h-10 text-primary/40 mb-2" />
                      <span className="text-xs font-black uppercase text-accent bg-accent/10 px-3 py-1 rounded-full tracking-wider">
                        {currentHighlight.category}
                      </span>
                    </div>
                  )}

                  {/* Gradient Overlay Info Banner */}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/30 to-transparent p-4 md:p-6 text-white flex flex-col justify-end text-left transition-opacity duration-300">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase text-primary bg-primary-light border border-primary/20 px-2.5 py-0.5 rounded-md inline-block self-start mb-2 tracking-wider">
                      {currentHighlight.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-black leading-tight drop-shadow-xs truncate max-w-full">
                      {currentHighlight.title}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. MAIN GRID CONDITIONAL RENDERING */}
          {!selectedCategory ? (
            /* =========================================================
                VIEW A: FOLDERS LIST GRID MODE
                ========================================================= */
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1.5 w-6 bg-accent rounded-full" />
                <h3 className="text-base font-black text-neutral-dark">
                  Browse by Activity Folder
                </h3>
              </div>

              {populatedCategories.length === 0 ? (
                <div className="text-center py-20 bg-surface border border-border rounded-3xl p-6">
                  <Camera className="w-12 h-12 text-neutral-body/30 mx-auto mb-4" />
                  <p className="text-sm font-semibold text-neutral-body">
                    No active photo folders are currently published.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {populatedCategories.map((cat) => {
                    const count = categoryCounts[cat] || 0;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="bg-surface border border-border rounded-3xl p-5 hover:border-primary/40 hover:shadow-md transition-all flex items-center gap-4 text-left group cursor-pointer focus:outline-none relative overflow-hidden"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                          <FolderClosed className="w-6 h-6 group-hover:hidden" />
                          <FolderOpen className="w-6 h-6 hidden group-hover:block" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-extrabold text-neutral-dark truncate leading-tight group-hover:text-primary transition-colors">
                            {cat}
                          </h4>
                          <span className="text-[10px] bg-accent-light text-accent border border-accent/15 px-2 py-0.5 rounded-md font-extrabold inline-block mt-1.5 tracking-wider uppercase leading-none">
                            {count} {count === 1 ? "Photo" : "Photos"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* =========================================================
                VIEW B: EXPANDED FOLDER PHOTOS GRID MODE
                ========================================================= */
            <div className="flex flex-col gap-6 animate-fade-in-up">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="p-2.5 bg-neutral-light border border-border text-neutral-dark rounded-xl hover:bg-neutral-light/75 transition-colors cursor-pointer focus:outline-none flex items-center justify-center shrink-0"
                    aria-label="Back to folders"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-body">
                      <span 
                        onClick={() => setSelectedCategory(null)}
                        className="hover:text-primary transition-colors cursor-pointer"
                      >
                        All Folders
                      </span>
                      <span>/</span>
                      <span className="text-neutral-dark font-extrabold">{selectedCategory}</span>
                    </div>
                    <h3 className="text-lg font-black text-neutral-dark mt-0.5 leading-none flex items-center gap-2">
                      {selectedCategory}
                      <span className="text-[10px] bg-accent-light text-accent border border-accent/10 px-2 py-0.5 rounded-md font-extrabold">
                        {displayedItems.length} {displayedItems.length === 1 ? "Item" : "Items"}
                      </span>
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1.5 self-start sm:self-center transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to All Folders</span>
                </button>
              </div>

              {displayedItems.length === 0 ? (
                <div className="text-center py-16 bg-surface border border-border rounded-3xl p-6">
                  <Camera className="w-10 h-10 text-neutral-body/40 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-neutral-body">
                    No images are currently found in this folder.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedItems.map((item) => {
                    const hasError = imageErrors[item.id || ""] || false;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="bg-surface rounded-3xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col items-start focus:outline-none text-left w-full h-full cursor-pointer relative"
                        aria-haspopup="dialog"
                        aria-label={`View photo of ${item.title}`}
                      >
                        <div className="relative w-full aspect-4/3 bg-neutral-light overflow-hidden flex items-center justify-center border-b border-border">
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
                              <div className="absolute inset-0 bg-neutral-dark/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                                <ZoomIn className="w-8 h-8" />
                              </div>
                            </>
                          ) : (
                            <div className="absolute inset-0 bg-linear-to-tr from-blue-50 to-emerald-50/40 flex flex-col items-center justify-center p-4 text-center">
                              <Camera className="w-8 h-8 text-primary/40 mb-2" />
                              <span className="text-[10px] uppercase font-extrabold text-accent bg-accent/10 px-2 rounded-full tracking-wider">
                                {item.category}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-4 w-full">
                          <span className="text-[9px] uppercase font-black text-accent tracking-wider block">
                            {item.category}
                          </span>
                          <h3 className="text-sm font-extrabold text-neutral-dark mt-1 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
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
