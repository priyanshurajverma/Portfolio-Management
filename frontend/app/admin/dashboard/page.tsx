"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
// Card components available at @/components/ui/card if needed
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Users, Eye, Download, FileText } from "lucide-react";

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        api.get("/analytics/summary")
            .then(res => setStats(res.data))
            .catch(console.error);
    }, []);

    if (!stats) return <div>Loading Analytics...</div>;

    const data = stats.page_stats || [];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-xl border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-400 text-sm">Total Visitors</p>
                            <h3 className="text-3xl font-bold mt-1">{stats.visitors}</h3>
                        </div>
                        <Users className="h-8 w-8 text-blue-500 opacity-50" />
                    </div>
                </div>

                <div className="glass p-6 rounded-xl border-l-4 border-purple-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-400 text-sm">Page Views</p>
                            <h3 className="text-3xl font-bold mt-1">{stats.page_views}</h3>
                        </div>
                        <Eye className="h-8 w-8 text-purple-500 opacity-50" />
                    </div>
                </div>

                <div className="glass p-6 rounded-xl border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-400 text-sm">Resume Downloads</p>
                            <h3 className="text-3xl font-bold mt-1">{stats.resume_downloads}</h3>
                        </div>
                        <Download className="h-8 w-8 text-green-500 opacity-50" />
                    </div>
                </div>
            </div>

            {/* Charts & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-xl">
                    <h3 className="text-xl font-semibold mb-6">Page Traffic</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="path" stroke="#888" hide />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass p-8 rounded-xl">
                    <h3 className="text-xl font-semibold mb-6">Recent Leads</h3>
                    <div className="space-y-4">
                        {stats.recent_leads?.length === 0 ? (
                            <p className="text-gray-500">No recent leads.</p>
                        ) : (
                            stats.recent_leads?.map((lead: any) => (
                                <div key={lead.id} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors border border-white/5">
                                    <div>
                                        <p className="font-medium text-sm text-white">{lead.name}</p>
                                        <p className="text-xs text-gray-400">{lead.email}</p>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
