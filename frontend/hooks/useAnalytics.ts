"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import api from "@/lib/api";

export function useAnalytics() {
    const pathname = usePathname();

    useEffect(() => {
        // We can track visits on mount or pathname change
        // Backend handles "visit" (session) vs "page-view"

        // First, ensure we have a visitor_id in local storage or session
        // For simplicity, we just fire page-view. Backend can infer visitor from IP hash or we can store ID.
        // Optimization: proper session management.

        // For this MVP, we just hit the page-view endpoint which expects visitor_id.
        // However, our backend /visit returns visitor_id.

        const track = async () => {
            try {
                // 1. Register Visit (get ID)
                const visitRes = await api.post("/analytics/visit", { path: pathname });
                const visitorId = visitRes.data.visitor_id;

                // 2. Register Page View
                await api.post("/analytics/page-view", {
                    visitor_id: visitorId,
                    path: pathname
                });
            } catch (error) {
                console.error("Analytics Error:", error);
            }
        };

        track();
    }, [pathname]);
}
