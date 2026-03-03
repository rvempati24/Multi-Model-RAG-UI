"use client";

import { useState } from "react";
import UploadArea from "@/components/UploadArea";
import ResultsPanel from "@/components/ResultsPanel";

export type AnalysisResult = {
  feedback: string;
  guidelines: {
    id: string;
    title: string;
    source: string;
    content: string;
    relevance_score: number;
  }[];
  similar_uis: {
    id: string;
    description: string;
    image_url: string;
    relevance_score: number;
  }[];
};

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File) {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data: AnalysisResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <UploadArea onUpload={handleUpload} loading={loading} />
      <ResultsPanel result={result} error={error} loading={loading} />
    </div>
  );
}
