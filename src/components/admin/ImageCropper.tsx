"use client";

import { useState, useEffect, useRef } from "react";
import { Move, ZoomIn, ZoomOut, Crop, Check, X, Square, Circle } from "lucide-react";

interface ImageCropperProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onCrop: (croppedBlob: Blob) => void;
}

interface Size {
  width: number;
  height: number;
}

export default function ImageCropper({ isOpen, onClose, imageSrc, onCrop }: ImageCropperProps) {
  const [naturalSize, setNaturalSize] = useState<Size | null>(null);
  const [baseSize, setBaseSize] = useState<Size>({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [frameType, setFrameType] = useState<"circle" | "square">("circle");
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "4:3" | "3:4" | "16:9">("1:1");
  const [fitMode, setFitMode] = useState<"cover" | "contain">("cover");
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const imageRef = useRef<HTMLImageElement>(null);
  const viewportSize = 280; // Outer container size (w/h)

  // Calculate crop guide boundaries based on aspect ratio
  let guideW = 240;
  let guideH = 240;

  if (aspectRatio === "4:3") {
    guideW = 240;
    guideH = 180;
  } else if (aspectRatio === "3:4") {
    guideW = 180;
    guideH = 240;
  } else if (aspectRatio === "16:9") {
    guideW = 240;
    guideH = 135;
  }

  const guideLeft = (viewportSize - guideW) / 2;
  const guideTop = (viewportSize - guideH) / 2;

  // Reset natural state when modal opens
  useEffect(() => {
    if (isOpen) {
      setNaturalSize(null);
      setBaseSize({ width: 0, height: 0 });
      setPosition({ x: 0, y: 0 });
      setZoom(1);
      setAspectRatio("1:1");
      setFitMode("cover");
      setFrameType("circle");
    }
  }, [isOpen, imageSrc]);

  // Check if image is already cached/complete on mount or when src changes
  useEffect(() => {
    if (isOpen && imageRef.current && imageRef.current.complete) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      if (naturalWidth && naturalHeight) {
        setNaturalSize({ width: naturalWidth, height: naturalHeight });
      }
    }
  }, [isOpen, imageSrc]);

  // Recalculate dimensions when image size, aspect ratio, or fit mode changes
  useEffect(() => {
    if (!naturalSize) return;

    const imageAspect = naturalSize.width / naturalSize.height;
    const guideAspect = guideW / guideH;
    let w = 0;
    let h = 0;

    if (fitMode === "cover") {
      // Cover: image must cover guide completely
      if (imageAspect > guideAspect) {
        h = guideH;
        w = guideH * imageAspect;
      } else {
        w = guideW;
        h = guideW / imageAspect;
      }
    } else {
      // Contain: image fits inside guide fully
      if (imageAspect > guideAspect) {
        w = guideW;
        h = guideW / imageAspect;
      } else {
        h = guideH;
        w = guideH * imageAspect;
      }
    }

    setBaseSize({ width: w, height: h });
    
    // Centering alignment relative to the viewport (centers on the guide)
    setPosition({
      x: (viewportSize - w) / 2,
      y: (viewportSize - h) / 2
    });
    setZoom(1);
  }, [naturalSize, aspectRatio, fitMode]);

  if (!isOpen) return null;

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setNaturalSize({ width: naturalWidth, height: naturalHeight });
  };

  const getBounds = (w: number, h: number) => {
    if (fitMode === "cover") {
      return {
        minX: guideLeft + guideW - w,
        maxX: guideLeft,
        minY: guideTop + guideH - h,
        maxY: guideTop
      };
    } else {
      // Contain mode: relaxed boundaries to let the user drag
      // but keep at least 20px sliver of the image inside the crop guide
      return {
        minX: guideLeft - w + 20,
        maxX: guideLeft + guideW - 20,
        minY: guideTop - h + 20,
        maxY: guideTop + guideH - 20
      };
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    updatePosition(e.touches[0].clientX, e.touches[0].clientY);
  };

  const updatePosition = (clientX: number, clientY: number) => {
    let newX = clientX - dragStart.x;
    let newY = clientY - dragStart.y;

    const currentW = baseSize.width * zoom;
    const currentH = baseSize.height * zoom;

    const { minX, maxX, minY, maxY } = getBounds(currentW, currentH);

    if (newX < minX) newX = minX;
    if (newX > maxX) newX = maxX;
    if (newY < minY) newY = minY;
    if (newY > maxY) newY = maxY;

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomChange = (newZoom: number) => {
    const oldZoom = zoom;
    setZoom(newZoom);

    // Zoom centered in the viewport
    const center = viewportSize / 2;
    let newX = center - (center - position.x) * (newZoom / oldZoom);
    let newY = center - (center - position.y) * (newZoom / oldZoom);

    const currentW = baseSize.width * newZoom;
    const currentH = baseSize.height * newZoom;

    const { minX, maxX, minY, maxY } = getBounds(currentW, currentH);

    if (newX < minX) newX = minX;
    if (newX > maxX) newX = maxX;
    if (newY < minY) newY = minY;
    if (newY > maxY) newY = maxY;

    setPosition({ x: newX, y: newY });
  };

  const handleSave = () => {
    if (!naturalSize || !imageRef.current) return;

    const canvas = document.createElement("canvas");
    
    // Choose output bounds according to aspect ratio
    let canvasW = 600;
    let canvasH = 600;

    if (aspectRatio === "4:3") {
      canvasW = 600;
      canvasH = 450;
    } else if (aspectRatio === "3:4") {
      canvasW = 450;
      canvasH = 600;
    } else if (aspectRatio === "16:9") {
      canvasW = 600;
      canvasH = 338;
    }

    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Transform viewport coordinates to canvas output coordinates
    const scale = canvasW / guideW;
    const relX = position.x - guideLeft;
    const relY = position.y - guideTop;

    const drawX = relX * scale;
    const drawY = relY * scale;
    const drawW = baseSize.width * zoom * scale;
    const drawH = baseSize.height * zoom * scale;

    // Fill white background to clear corners/edges in contain mode
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Draw the image
    ctx.drawImage(imageRef.current, drawX, drawY, drawW, drawH);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCrop(blob);
        }
      },
      "image/jpeg",
      0.92
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Crop className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Frame & Center Photo</h3>
              <p className="text-[10px] text-slate-500 font-medium">Position face centered inside the frame guide</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-650 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content Workspace */}
        <div className="p-6 flex flex-col items-center gap-5">
          {/* Main Visual Crop Viewport */}
          <div
            className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-inner bg-slate-50 select-none cursor-grab active:cursor-grabbing"
            style={{ width: viewportSize, height: viewportSize }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* The Image */}
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Crop Workspace"
              onLoad={handleImageLoad}
              className="absolute pointer-events-none origin-top-left max-w-none max-h-none"
              style={naturalSize ? {
                width: baseSize.width * zoom,
                height: baseSize.height * zoom,
                left: position.x,
                top: position.y
              } : {
                opacity: 0,
                position: "absolute"
              }}
            />

            {/* Overlays / Mask Guides */}
            {frameType === "circle" && aspectRatio === "1:1" ? (
              <div className="absolute inset-0 pointer-events-none">
                {/* Circular Mask */}
                <div 
                  className="absolute rounded-full border-2 border-dashed border-white/80 pointer-events-none shadow-[0_0_0_9999px_rgba(15,23,42,0.5)] transition-all duration-300"
                  style={{
                    left: guideLeft,
                    top: guideTop,
                    width: guideW,
                    height: guideH,
                  }}
                />
              </div>
            ) : (
              <div className="absolute inset-0 pointer-events-none">
                {/* Square/Rectangular Mask matching guide aspect ratio */}
                <div 
                  className="absolute border-2 border-dashed border-white/80 pointer-events-none shadow-[0_0_0_9999px_rgba(15,23,42,0.5)] transition-all duration-300"
                  style={{
                    left: guideLeft,
                    top: guideTop,
                    width: guideW,
                    height: guideH,
                  }}
                />
              </div>
            )}
            
            {/* Action HUD / Centered Guide Help */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900/70 backdrop-blur-xs rounded-lg text-[9px] text-white/90 font-bold uppercase tracking-wider flex items-center gap-1.5 pointer-events-none shadow-sm">
              <Move className="w-3 h-3" />
              <span>Drag to position</span>
            </div>
          </div>

          {/* Controls HUD */}
          <div className="w-full flex flex-col gap-4">
            {/* Fit Option & Shape Mask Toggle */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <span className="text-[10px] font-black text-slate-555 uppercase tracking-wider">Fit Option</span>
                <div className="flex border border-slate-200 rounded-xl p-0.5 bg-slate-50 shadow-3xs">
                  <button
                    type="button"
                    onClick={() => setFitMode("cover")}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-black text-center transition-all cursor-pointer ${
                      fitMode === "cover"
                        ? "bg-white text-primary border border-slate-200/50 shadow-3xs"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Fill Frame
                  </button>
                  <button
                    type="button"
                    onClick={() => setFitMode("contain")}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-black text-center transition-all cursor-pointer ${
                      fitMode === "contain"
                        ? "bg-white text-primary border border-slate-200/50 shadow-3xs"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Fit Image
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <span className="text-[10px] font-black text-slate-555 uppercase tracking-wider">Mask Guide</span>
                <div className="flex border border-slate-200 rounded-xl p-0.5 bg-slate-50 shadow-3xs">
                  <button
                    type="button"
                    onClick={() => setFrameType("circle")}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-black text-center transition-all cursor-pointer ${
                      frameType === "circle"
                        ? "bg-white text-primary border border-slate-200/50 shadow-3xs"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Circle
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrameType("square")}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-black text-center transition-all cursor-pointer ${
                      frameType === "square"
                        ? "bg-white text-primary border border-slate-200/50 shadow-3xs"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Square
                  </button>
                </div>
              </div>
            </div>

            {/* Zoom Slider */}
            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-[10px] font-black text-slate-555 uppercase tracking-wider">Zoom</span>
              <div className="w-full flex items-center gap-3 bg-slate-50 border border-slate-150 rounded-2xl px-4 py-3">
                <ZoomOut className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.01"
                  value={zoom}
                  onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                  className="flex-1 accent-primary bg-slate-200 h-1 rounded-lg cursor-pointer"
                />
                <ZoomIn className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-[10px] font-black text-slate-500 w-8 text-right tabular-nums">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-extrabold text-xs rounded-xl shadow-3xs transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white font-black text-xs rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Apply Crop</span>
          </button>
        </div>
      </div>
    </div>
  );
}
