"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "model";
    content: string;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "model", content: "Hi! I'm the AI assistant. Ask me anything about my projects or skills." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // Send history + new message
            const history = messages.map(m => ({ role: m.role, content: m.content }));

            const res = await api.post("/chat/ask", {
                message: userMsg.content,
                history: history
            });

            const botMsg: Message = { role: "model", content: res.data.response };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "model", content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] h-[500px] glass rounded-2xl flex flex-col shadow-2xl overflow-hidden border border-white/20"
                    >
                        {/* Header */}
                        <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                            <h3 className="font-semibold text-white">AI Assistant</h3>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        "max-w-[80%] rounded-xl p-3 text-sm",
                                        msg.role === "user"
                                            ? "bg-blue-600/80 text-white ml-auto rounded-tr-none"
                                            : "bg-white/10 text-gray-200 mr-auto rounded-tl-none"
                                    )}
                                >
                                    {msg.content}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="bg-white/10 text-gray-200 mr-auto rounded-xl rounded-tl-none p-3 w-12 flex items-center justify-center">
                                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-white/5 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-white/5 border-none rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none placeholder:text-gray-500"
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className={isLoading ? "opacity-50" : ""}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-500 shadow-lg flex items-center justify-center text-white transition-colors"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.button>
        </div>
    );
}
