"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditBlogPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [data, setData] = useState({ title: "", slug: "", content: "", published: true });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // Fetch existing
        // Since we don't have a direct "get by ID" endpoint for public (only slug), 
        // we might access it from the list or admin needs specific endpoint.
        // Actually, update_blog uses ID. But read uses slug.
        // Let's assume we can fetch by slug if we had it, or we need an endpoint for ID get.
        // Quick fix: Admin endpoint to get by ID or filter on client side if list is small.
        // Better: GET /blogs/admin/{id} or modify public GET to support ID.
        // For now, I'll filter from the all list (not efficient but works for MVP).
        api.get("/blogs/admin/all").then(res => {
            const found = res.data.find((b: any) => b.id === parseInt(params.id));
            if (found) {
                setData({
                    title: found.title,
                    slug: found.slug,
                    content: found.content,
                    published: found.published
                });
            }
            setLoading(false);
        });
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put(`/blogs/${params.id}`, data);
            router.push("/admin/blogs");
        } catch (error) {
            console.error(error);
            alert("Failed to update");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Button asChild variant="ghost" className="mb-4 pl-0">
                <Link href="/admin/blogs"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
            </Button>

            <h1 className="text-3xl font-bold">Edit Blog Post</h1>

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

                <Button type="submit" disabled={saving}>
                    {saving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />} Update Post
                </Button>
            </form>
        </div>
    );
}
