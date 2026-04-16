"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewBlogPage() {
    const router = useRouter();
    const [data, setData] = useState({ title: "", slug: "", content: "", published: true });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/blogs/", data);
            router.push("/admin/blogs");
        } catch (error) {
            console.error(error);
            alert("Failed to save");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Button asChild variant="ghost" className="mb-4 pl-0">
                <Link href="/admin/blogs"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
            </Button>

            <h1 className="text-3xl font-bold">New Blog Post</h1>

            <form onSubmit={handleSubmit} className="glass p-8 rounded-xl space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Title</label>
                        <input
                            type="text" required
                            value={data.title}
                            onChange={e => setData({ ...data, title: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Slug</label>
                        <input
                            type="text" required
                            value={data.slug}
                            onChange={e => setData({ ...data, slug: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-400">Content (Markdown)</label>
                    <textarea
                        required
                        rows={15}
                        value={data.content}
                        onChange={e => setData({ ...data, content: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 font-mono text-sm resize-y"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="published"
                        checked={data.published}
                        onChange={e => setData({ ...data, published: e.target.checked })}
                        className="rounded border-white/10 bg-black/20"
                    />
                    <label htmlFor="published" className="text-sm">Published</label>
                </div>

                <Button type="submit" disabled={loading}>
                    <Save className="mr-2 h-4 w-4" /> Save Post
                </Button>
            </form>
        </div>
    );
}
