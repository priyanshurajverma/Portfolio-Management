"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
    name: string;
    level: number; // 0 to 100
    index: number;
}

export function SkillBar({ name, level, index }: SkillBarProps) {
    return (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">{name}</span>
                <span className="text-xs text-muted-foreground">{level}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-primary h-2.5 rounded-full"
                />
            </div>
        </div>
    );
}
