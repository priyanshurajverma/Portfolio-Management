"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { ProjectCard } from "@/components/project-card";

const projects = [
    {
        title: "E-Commerce Dashboard",
        description: "A comprehensive dashboard for managing data, visualizing sales trends, and tracking inventory in real-time.",
        tags: ["Next.js", "Recharts", "Supabase"],
        demoUrl: "#",
        repoUrl: "#"
    },
    {
        title: "AI Content Generator",
        description: "SaaS application that uses OpenAI GPT-3 to generate marketing copy and blog posts for users.",
        tags: ["React", "FastAPI", "OpenAI"],
        demoUrl: "#",
        repoUrl: "#"
    },
    {
        title: "Task Management App",
        description: "Collaborative task manager with real-time updates and team workspace features.",
        tags: ["Vue.js", "Firebase", "Tailwind"],
        demoUrl: "#",
        repoUrl: "#"
    },
    {
        title: "Portfolio Platform",
        description: "The very site you are looking at! Built with Next.js, FastAPI, and Glassmorphism design.",
        tags: ["Next.js", "FastAPI", "PostgreSQL"],
        demoUrl: "#",
        repoUrl: "#"
    }
];

export default function ProjectsPage() {
    useAnalytics();

    return (
        <div className="max-w-6xl mx-auto py-12">
            <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">Featured Projects</h1>
            <p className="text-center text-muted-foreground mb-12">A collection of my work and experiments.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        {...project}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}
