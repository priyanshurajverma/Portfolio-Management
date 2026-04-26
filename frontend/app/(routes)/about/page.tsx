"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { motion } from "framer-motion";

export default function AboutPage() {
    useAnalytics();

    const birthDate = new Date("2004-09-07");
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Dynamic Semester Calculation (Approximate start Aug 2024 for 2nd year lateral? Or just assume 4th sem now)
    // User said "2 year 4 sem" it must be dynamic.
    // Assuming 4th sem in Feb 2026. This implies sem increment every ~6 months.
    // Let's create a helper or just base it on date.
    // Base: Feb 2026 = 4th Sem. May 2026 = 5th Sem? (Usually Aug/Sept = Odd sem start, Jan/Feb = Even sem start)
    // Even Sem (4th) starts Jan 2026 -> Ends May/June 2026.
    // Odd Sem (5th) starts Aug 2026.

    // Simple Logic:
    // Start Year: 2024 (Admission Year)
    // Current Year: YYYY
    // Current Month: MM
    // Sem = (YYYY - 2024) * 2
    // If MM > 6 (July+), Sem += 1. Else Sem += 0 (Even Sem).
    // Let's try: 2026 - 2024 = 2 * 2 = 4. Month Feb (<6). Sem = 4. Correct.
    // Next year Feb 2027: 3 * 2 = 6. Sem 6. Correct.
    // Aug 2026: 2 * 2 = 4. Month > 6. Sem = 5. Correct.

    const startYear = 2024;
    let semester = (today.getFullYear() - startYear) * 2;
    if (today.getMonth() >= 6) { // July onwards
        semester += 1;
    }
    // Correction: If user is in 4th sem in Feb 2026, the calc gives 4.
    // If user started in 2024.

    const yearOfStudy = Math.ceil(semester / 2);

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 md:p-12 rounded-2xl border border-slate-200"
            >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Profile & Quick Stats */}
                    <div className="w-full md:w-1/3 space-y-6">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 relative">
                            {/* Placeholder for Profile image or upload */}
                            <div className="absolute inset-0">
                                <img src="/profile.jpg" alt="Priyanshu Raj" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Age</p>
                                <p className="text-2xl font-bold text-slate-900">{age} Years</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Education</p>
                                <p className="text-lg font-semibold text-slate-900">B.Tech CSE</p>
                                <p className="text-md text-primary">{yearOfStudy === 2 ? '2nd' : yearOfStudy === 3 ? '3rd' : yearOfStudy === 4 ? '4th' : yearOfStudy + 'th'} Year, {semester}th Sem</p>
                                <p className="text-xs text-muted-foreground mt-1">Maharshi Dayanand University</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Diploma</p>
                                <p className="text-slate-900 font-medium">Passed 2025</p>
                                <p className="text-emerald-600 font-bold">8.9 CGPA</p>
                            </div>
                        </div>
                    </div>

                    {/* Bio & Experience */}
                    <div className="w-full md:w-2/3 space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">Priyanshu Raj</h1>
                            <p className="text-xl text-muted-foreground">Full Stack Developer</p>
                        </div>

                        <div className="space-y-4 text-slate-700 leading-relaxed text-lg">
                            <p>
                                I am a Full Stack Developer currently pursuing my B.Tech in Computer Science and Engineering at Maharshi Dayanand University. I specialize in bridging the gap between complex business requirements and structured, scalable technical architecture.
                            </p>
                            <p>
                                My current focus is on building high-performance web applications using <span className="text-slate-900 font-medium">Next.js</span>, <span className="text-slate-900 font-medium">FastAPI (Python)</span>, and <span className="text-slate-900 font-medium">MySQL</span>.
                            </p>
                            <p>
                                One of my primary current projects is developing a comprehensive <span className="text-indigo-600 font-medium">Warehouse Management System</span>, where I am applying modern data modeling techniques to solve real-world inventory and logistics challenges.
                            </p>
                        </div>

                        <div className="border-t border-slate-200 pt-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
                                Experience
                            </h2>
                            <div className="space-y-8">
                                <div className="relative pl-8 border-l border-slate-200 pb-2">
                                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-white shadow-sm"></div>
                                    <h3 className="text-xl font-bold text-slate-900">Full Stack Engineer</h3>
                                    <p className="text-primary mb-2">Mobeology Communication Pvt Ltd</p>
                                    <p className="text-muted-foreground">
                                        Worked on full-stack development, contributing to the architecture and implementation of scalable web solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
