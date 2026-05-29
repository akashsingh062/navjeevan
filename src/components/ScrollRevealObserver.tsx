"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const injectRevealClasses = () => {

      const headers = document.querySelectorAll("h2, .section-title");
      headers.forEach((header) => {

        if (header.closest("button") || header.closest("a") || header.closest("header") || header.closest("nav")) return;
        if (!header.classList.contains("reveal-on-scroll")) {
          header.classList.add("reveal-on-scroll", "reveal-fade-up");
        }
      });

      const grids = document.querySelectorAll(".grid");
      grids.forEach((grid) => {

        if (grid.closest("header") || grid.closest("nav")) return;

        const children = Array.from(grid.children);

        if (children.length > 1) {
          children.forEach((child, idx) => {
            if (child.classList.contains("reveal-on-scroll")) return;

            child.classList.add("reveal-on-scroll", "reveal-fade-up");

            const delayVal = (idx % 4) * 100;
            if (delayVal > 0) {
              child.classList.add(`delay-${delayVal}`);
            }
          });
        }
      });

      const containers = document.querySelectorAll("main > div > section, main > section, .content-section");
      containers.forEach((section) => {

        if (!section.classList.contains("reveal-on-scroll") && !section.querySelector(".grid")) {
          section.classList.add("reveal-on-scroll", "reveal-fade-up");
        }
      });
    };

    injectRevealClasses();

    if (!window.IntersectionObserver) {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.05,
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

    observeElements();

    const timer = setTimeout(() => {
      injectRevealClasses();
      observeElements();
    }, 150);

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
