"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Users, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    if (!authorized) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col hidden md:flex">
                <h2 className="text-xl font-bold mb-8 text-white">Admin Panel</h2>

                <nav className="space-y-2 flex-1">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/admin/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/admin/blogs"><FileText className="mr-2 h-4 w-4" /> Blogs</Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/admin/leads"><Users className="mr-2 h-4 w-4" /> Leads</Link>
                    </Button>
                </nav>

                <Button variant="destructive" className="w-full justify-start mt-auto" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
