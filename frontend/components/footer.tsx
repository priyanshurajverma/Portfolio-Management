
export function Footer() {
    return (
        <footer className="w-full py-6 mt-12 border-t border-slate-200 bg-slate-50/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Priyanshu Raj. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="https://github.com/priyanshurajverma?tab=repositories" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">GitHub</a>
                    <a href="https://www.linkedin.com/in/priyanshu-raj-ba9828291/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}
