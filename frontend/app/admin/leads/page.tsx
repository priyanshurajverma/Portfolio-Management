"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Mail, Loader2 } from "lucide-react";

export default function LeadsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/contact/admin/leads")
            .then(res => {
                setLeads(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin h-8 w-8 text-blue-500" /></div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Contact Leads</h1>

            <div className="glass rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                            <th className="p-4 font-semibold text-gray-300">Name</th>
                            <th className="p-4 font-semibold text-gray-300">Email</th>
                            <th className="p-4 font-semibold text-gray-300">Message</th>
                            <th className="p-4 font-semibold text-gray-300">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">{lead.name}</td>
                                <td className="p-4 flex items-center text-blue-400">
                                    <Mail className="h-4 w-4 mr-2" />
                                    {lead.email}
                                </td>
                                <td className="p-4 text-gray-400 max-w-xs truncate" title={lead.message}>{lead.message}</td>
                                <td className="p-4 text-sm text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {leads.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">No leads found yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
