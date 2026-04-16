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
                <span className="text-sm font-medium text-gray-300">{name}</span>
                <span className="text-xs text-gray-500">{level}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-blue-500 h-2.5 rounded-full"
                />
            </div>
        </div>
    );
}
