import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Priyanshu Raj - Full Stack Developer",
  description: "Full Stack Engineer specializing in Next.js, FastAPI, and MySQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-indigo-100 selection:text-indigo-900`}>
        {/* Background Gradients */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50">
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-blue-100/40 blur-[100px] rounded-full opacity-50 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] bg-indigo-100/40 blur-[100px] rounded-full opacity-50 pointer-events-none" />
        </div>

        <Navbar />
        <main className="flex-1 pt-24 px-4 w-full max-w-7xl mx-auto">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
