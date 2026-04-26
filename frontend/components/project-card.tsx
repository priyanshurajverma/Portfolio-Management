"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectProps {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    demoUrl?: string;
    repoUrl?: string;
    index: number;
}

export function ProjectCard({ title, description, tags, demoUrl, repoUrl, index }: ProjectProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 flex flex-col h-full"
        >
            {/* Placeholder Image Area */}
            <div className="w-full h-48 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-muted-foreground text-sm">
                Project Image
            </div>

            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-1">{description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
                {tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/5 text-primary border border-primary/10">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex gap-4 mt-auto">
                {demoUrl && (
                    <Button variant="default" size="sm" asChild className="flex-1">
                        <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" /> Demo
                        </a>
                    </Button>
                )}
                {repoUrl && (
                    <Button variant="glass" size="sm" asChild className="flex-1">
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" /> Code
                        </a>
                    </Button>
                )}
            </div>
        </motion.div>
    );
}
