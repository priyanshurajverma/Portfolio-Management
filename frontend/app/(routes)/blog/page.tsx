
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";

async function getBlogs() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/blogs/`, { cache: 'no-store' });
        if (!res.ok) {
            // Fallback for demo if backend not running or empty
            return [];
        }
        return res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export default async function BlogPage() {
    const blogs = await getBlogs();

    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Tech Blog</h1>
                    <p className="text-gray-400 mt-2">Thoughts on development, design, and the future.</p>
                </div>
                {/* Admin link could go here if we had auth check, but keeping public clean */}
            </div>

            {blogs.length === 0 ? (
                <div className="text-center py-20 px-6 glass rounded-2xl">
                    <h2 className="text-xl font-semibold mb-2">No posts yet</h2>
                    <p className="text-gray-400 mb-6">Check back later for updates or check my projects!</p>
                    <Button asChild>
                        <Link href="/projects">View Projects</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {blogs.map((blog: any, index: number) => (
                        <BlogCard
                            key={blog.id}
                            title={blog.title}
                            description={blog.content ? blog.content.substring(0, 100) + "..." : "No description"}
                            slug={blog.slug}
                            date={new Date(blog.created_at).toLocaleDateString()}
                            readTime="5 min read" // Placeholder calculation
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
