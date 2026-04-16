"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Loader2, Mail, Send } from "lucide-react";

export default function ContactPage() {
    useAnalytics();

    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await api.post("/contact/submit", formData);
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <div className="max-w-lg mx-auto py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8 rounded-2xl"
            >
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-bold">Get in Touch</h1>
                    <p className="text-gray-400 text-sm mt-2">Have a project in mind or just want to say hi?</p>
                </div>

                {status === "success" ? (
                    <div className="text-center py-10 bg-green-500/10 rounded-lg border border-green-500/20">
                        <h3 className="text-green-400 font-medium text-lg">Message Sent!</h3>
                        <p className="text-gray-400 mt-2 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                        <Button variant="ghost" className="mt-4" onClick={() => setStatus("idle")}>Send another</Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-gray-600"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-gray-600"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-gray-600 resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <Button type="submit" className="w-full mt-2" disabled={status === "loading"}>
                            {status === "loading" ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                            ) : (
                                <><Send className="mr-2 h-4 w-4" /> Send Message</>
                            )}
                        </Button>

                        {status === "error" && (
                            <p className="text-red-400 text-sm text-center mt-2">Something went wrong. Please try again.</p>
                        )}
                    </form>
                )}
            </motion.div>
        </div>
    );
}
