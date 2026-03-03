import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multi-Modal RAG UI",
  description: "Upload a UI screenshot and get actionable design feedback powered by RAG.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        <header className="border-b border-gray-800 px-6 py-4">
          <h1 className="text-lg font-semibold tracking-tight">Multi-Modal RAG UI</h1>
          <p className="text-sm text-gray-400">Upload a screenshot → get design feedback</p>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
