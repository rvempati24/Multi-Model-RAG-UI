import type { AnalysisResult } from "@/app/page";
import SimilarExamples from "./SimilarExamples";

type Props = {
  result: AnalysisResult | null;
  error: string | null;
  loading: boolean;
};

export default function ResultsPanel({ result, error, loading }: Props) {
  if (loading) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium uppercase tracking-widest text-gray-400">Results</h2>
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-gray-800 bg-gray-900">
          <p className="animate-pulse text-sm text-gray-500">Analyzing screenshot…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium uppercase tracking-widest text-gray-400">Results</h2>
        <div className="rounded-xl border border-red-800 bg-red-950/30 p-4 text-sm text-red-400">
          {error}
        </div>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium uppercase tracking-widest text-gray-400">Results</h2>
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-gray-800 bg-gray-900">
          <p className="text-sm text-gray-600">Upload a screenshot to see feedback.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-sm font-medium uppercase tracking-widest text-gray-400">Results</h2>

      {/* LLM Feedback */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
          Design Feedback
        </h3>
        <p className="text-sm leading-relaxed text-gray-300">{result.feedback}</p>
      </div>

      {/* Retrieved Guidelines */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">
          Relevant Guidelines
        </h3>
        <ul className="flex flex-col gap-3">
          {result.guidelines.map((g) => (
            <li key={g.id} className="flex flex-col gap-1 rounded-lg bg-gray-800 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-100">{g.title}</span>
                <span className="text-xs text-gray-500">
                  {Math.round(g.relevance_score * 100)}% match
                </span>
              </div>
              <span className="text-xs text-blue-400">{g.source}</span>
              <p className="text-xs text-gray-400">{g.content}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Similar UI Examples */}
      <SimilarExamples items={result.similar_uis} />
    </section>
  );
}
