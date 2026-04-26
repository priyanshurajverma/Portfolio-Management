"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
    title: string;
    description: string; // Excerpt
    slug: string;
    date: string;
    readTime: string;
    index: number;
}

export function BlogCard({ title, description, slug, date, readTime, index }: BlogCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <Link href={`/blog/${slug}`}>
                <article className="glass-card p-6 h-full border border-slate-200 hover:border-slate-300 transition-all">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {date}</span>
                        <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {readTime}</span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-3">{description}</p>
                </article>
            </Link>
        </motion.div>
    );
}
