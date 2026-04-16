
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getBlog(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/blogs/${slug}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        return null;
    }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const blog = await getBlog(params.slug);

    if (!blog) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
                <Button asChild variant="glass">
                    <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-12">
            <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-blue-400 text-gray-400">
                <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
            </Button>

            <article>
                <header className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{blog.title}</h1>
                    <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                </header>

                <div className="glass p-8 md:p-12 rounded-2xl prose prose-invert prose-lg max-w-none">
                    {/* Render Markdown */}
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
