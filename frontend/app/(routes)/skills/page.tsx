"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { SkillBar } from "@/components/skill-bar";
import { motion } from "framer-motion";

export default function SkillsPage() {
    useAnalytics();

    const skills = [
        {
            category: "Frontend", items: [
                { name: "React / Next.js", level: 95 },
                { name: "TypeScript", level: 90 },
                { name: "Tailwind CSS", level: 95 },
                { name: "Framer Motion", level: 85 },
            ]
        },
        {
            category: "Backend", items: [
                { name: "Python / FastAPI", level: 90 },
                { name: "Node.js", level: 80 },
                { name: "PostgreSQL", level: 85 },
                { name: "Docker / AWS", level: 75 },
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Technical Skills</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {skills.map((section, secIndex) => (
                    <motion.div
                        key={section.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: secIndex * 0.2 }}
                        className="glass p-6 rounded-xl"
                    >
                        <h2 className="text-xl font-semibold mb-6 border-b border-white/10 pb-2">{section.category}</h2>
                        <div className="space-y-4">
                            {section.items.map((skill, index) => (
                                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={index} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
