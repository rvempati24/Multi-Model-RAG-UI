"use client";

import { useRef, useState } from "react";

type Props = {
  onUpload: (file: File) => void;
  loading: boolean;
};

export default function UploadArea({ onUpload, loading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(file));
    onUpload(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-medium uppercase tracking-widest text-gray-400">
        Upload Screenshot
      </h2>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
          dragging
            ? "border-blue-500 bg-blue-950/20"
            : "border-gray-700 hover:border-gray-500 hover:bg-gray-900"
        }`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Uploaded screenshot preview"
            className="max-h-72 rounded-lg object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
              />
            </svg>
            <p className="text-sm">Drag & drop or click to upload</p>
            <p className="text-xs">PNG, JPG, WebP</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {preview && (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Analyzing…" : "Upload a different screenshot"}
        </button>
      )}
    </section>
  );
}
