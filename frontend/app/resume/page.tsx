"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumePage() {
    const [status, setStatus] = useState<"idle" | "tracking" | "downloading" | "done">("idle");

    const handleDownload = async () => {
        setStatus("tracking");
        try {
            // Track the download event
            // We need a visitor_id. For now we assume the session or just pass 0 if analytics isn't strict.
            // In a real app we'd wait for visitors data context.
            // Let's just fire and forget or await briefly.

            // To get visitor_id we might need a context, but let's try to track with a new visit call if needed or just skip ID for now if backend allows nullable.
            // Our backend ResumeDownload requires visitor_id. 
            // We'll trigger a visit first to get ID.

            const visitRes = await api.post("/analytics/visit", { path: "/resume" });
            const visitorId = visitRes.data.visitor_id;

            await api.post("/analytics/resume-download", {
                visitor_id: visitorId,
                page_source: "resume_page"
            });

            setStatus("downloading");

            // Simulator download delay
            setTimeout(() => {
                // Trigger real download
                // For now we don't have a real PDF, so we create a dummy one or point to a placeholder.
                // We'll just alert for now as we don't have a file.

                // window.location.href = "/resume.pdf";
                alert("Resume download started! (Placeholder)");
                setStatus("done");
            }, 1000);

        } catch (error) {
            console.error("Tracking failed", error);
            // Fallback download
            alert("Resume download started! (Fallback)");
            setStatus("done");
        }
    };

    return (
        <div className="h-[80vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 rounded-2xl text-center max-w-md w-full"
            >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-8 h-8 text-purple-400" />
                </div>

                <h1 className="text-2xl font-bold mb-2">Download Resume</h1>
                <p className="text-gray-400 mb-8">Get a copy of my resume in PDF format.</p>

                <Button
                    size="lg"
                    className="w-full"
                    onClick={handleDownload}
                    disabled={status === "tracking" || status === "downloading"}
                >
                    {status === "tracking" || status === "downloading" ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                    ) : (
                        <><Download className="mr-2 h-4 w-4" /> Download PDF</>
                    )}
                </Button>

                {status === "done" && (
                    <p className="text-sm text-green-400 mt-4">Generously tracked and downloaded!</p>
                )}
            </motion.div>
        </div>
    );
}
