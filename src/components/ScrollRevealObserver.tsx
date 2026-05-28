"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Auto-inject reveal classes to structure elements across all pages
    const injectRevealClasses = () => {
      // Inject to section headers
      const headers = document.querySelectorAll("h2, .section-title");
      headers.forEach((header) => {
        // Skip headers inside card elements, menus, or header sections
        if (header.closest("button") || header.closest("a") || header.closest("header") || header.closest("nav")) return;
        if (!header.classList.contains("reveal-on-scroll")) {
          header.classList.add("reveal-on-scroll", "reveal-fade-up");
        }
      });

      // Inject to grid layouts (staggered card reveals)
      const grids = document.querySelectorAll(".grid");
      grids.forEach((grid) => {
        // Skip header areas or menus
        if (grid.closest("header") || grid.closest("nav")) return;

        const children = Array.from(grid.children);
        // Only stagger if there are multiple cards/elements
        if (children.length > 1) {
          children.forEach((child, idx) => {
            if (child.classList.contains("reveal-on-scroll")) return;
            
            // Add scroll reveal classes
            child.classList.add("reveal-on-scroll", "reveal-fade-up");
            
            // Calculate a staggered delay based on its column position (max 4 column layout loop)
            const delayVal = (idx % 4) * 100; // 0ms, 100ms, 200ms, 300ms
            if (delayVal > 0) {
              child.classList.add(`delay-${delayVal}`);
            }
          });
        }
      });

      // Inject to standalone page/section divs or containers inside main
      const containers = document.querySelectorAll("main > div > section, main > section, .content-section");
      containers.forEach((section) => {
        // If the section doesn't have direct child grids or if it is a text page block
        if (!section.classList.contains("reveal-on-scroll") && !section.querySelector(".grid")) {
          section.classList.add("reveal-on-scroll", "reveal-fade-up");
        }
      });
    };

    // Run injector
    injectRevealClasses();

    // 2. Setup IntersectionObserver to trigger animations on scroll
    if (!window.IntersectionObserver) {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -80px 0px", // Trigger when the element is 80px above the bottom viewport edge
      threshold: 0.05, // Trigger as soon as 5% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const elements = document.querySelectorAll(".reveal-on-scroll");
      elements.forEach((el) => {
        if (!el.classList.contains("revealed")) {
          observer.observe(el);
        }
      });
    };

    // Bind initial elements
    observeElements();

    // Trigger stagger delay to catch hydration updates
    const timer = setTimeout(() => {
      injectRevealClasses();
      observeElements();
    }, 150);

    // Watch for dynamic rendering changes (loaded data, tabs switching, filters)
    const mutationObserver = new MutationObserver(() => {
      injectRevealClasses();
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
