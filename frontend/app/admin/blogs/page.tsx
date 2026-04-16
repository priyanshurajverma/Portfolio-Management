"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchBlogs = () => {
        api.get("/blogs/admin/all") // Use public for now or admin specific endpoint
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`/blogs/${id}`);
            setBlogs(blogs.filter(b => b.id !== id));
        } catch (error) {
            console.error(error);
            alert("Failed to delete");
        }
    };

    if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin h-8 w-8 text-blue-500" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Blogs</h1>
                <Button asChild>
                    <Link href="/admin/blogs/new"><Plus className="mr-2 h-4 w-4" /> New Post</Link>
                </Button>
            </div>

            <div className="glass rounded-xl overflow-hidden p-6">
                <div className="space-y-4">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/5">
                            <div>
                                <h3 className="font-semibold text-lg">{blog.title}</h3>
                                <p className="text-sm text-gray-500">Slug: {blog.slug} • {blog.published ? "Published" : "Draft"}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/admin/blogs/${blog.id}`}><Edit className="h-4 w-4 text-blue-400" /></Link>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id)}>
                                    <Trash className="h-4 w-4 text-red-400" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {blogs.length === 0 && (
                        <p className="text-center text-gray-500 p-8">No blogs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
