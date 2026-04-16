"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    // Track Visit
    api.post("/analytics/visit", { path: "/" }).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-16 py-10">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Priyanshu Raj <br />
            <span className="text-2xl md:text-4xl block mt-2">Full Stack Developer</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl">
            Innovating with Code. I specialize in bridging the gap between complex business requirements and structured, scalable technical architecture.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="default" size="lg" asChild>
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link href="/contact">
                Contact Me
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/resume.pdf" download="Priyanshu_Raj_Resume.pdf">
                Resume <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="flex gap-4 pt-4">
            <a href="https://github.com/priyanshurajverma?tab=repositories" target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:bg-white/20 transition-all">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/priyanshu-raj-ba9828291/" target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:bg-white/20 transition-all">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:rajpriyanshu07sep@gmail.com" className="p-2 glass rounded-full hover:bg-white/20 transition-all">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1"
        >
          <div className="relative w-full h-[400px] glass rounded-3xl overflow-hidden flex items-center justify-center p-8">
            {/* Abstract Visual or Image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10" />
            <div className="code-block text-sm font-mono text-gray-300 p-4 w-full">
              <div className="text-pink-400">const profile = {"{"}</div>
              <div className="pl-4">name: <span className="text-green-300">"Priyanshu Raj"</span>,</div>
              <div className="pl-4">role: <span className="text-green-300">"Full Stack Engineer"</span>,</div>
              <div className="pl-4">stack: [</div>
              <div className="pl-8 text-blue-300">"Next.js", "FastAPI",</div>
              <div className="pl-8 text-blue-300">"MySQL", "Python"</div>
              <div className="pl-4">],</div>
              <div className="pl-4">status: <span className="text-green-300">"Building WMS"</span></div>
              <div className="text-pink-400">{"}"};</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick Stats or Highlights could go here */}
    </div>
  );
}
