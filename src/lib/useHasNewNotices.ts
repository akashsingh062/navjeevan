"use client";

import { useState, useEffect } from "react";

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

/**
 * Checks whether any notice has been posted within the last 2 days.
 * Returns { hasNew, loading }.
 */
export function useHasNewNotices() {
  const [hasNew, setHasNew] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const notices = Array.isArray(data) ? data : (data.notices ?? []);
        const now = Date.now();
        const recent = notices.some((n: { date?: string; createdAt?: string }) => {
          const dateStr = n.date || n.createdAt;
          if (!dateStr) return false;
          const diff = now - new Date(dateStr).getTime();
          return diff >= 0 && diff <= TWO_DAYS_MS;
        });
        setHasNew(recent);
      })
      .catch(() => {
        if (!cancelled) setHasNew(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { hasNew, loading };
}
