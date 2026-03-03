type Item = {
  id: string;
  description: string;
  image_url: string;
  relevance_score: number;
};

type Props = {
  items: Item[];
};

export default function SimilarExamples({ items }: Props) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">
        Similar Well-Designed UIs
      </h3>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col gap-2 rounded-lg bg-gray-800 p-3">
            {item.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image_url}
                alt={item.description}
                className="h-32 w-full rounded object-cover"
              />
            ) : (
              <div className="flex h-32 w-full items-center justify-center rounded bg-gray-700 text-xs text-gray-500">
                No image
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">{item.description}</p>
              <span className="shrink-0 text-xs text-gray-500">
                {Math.round(item.relevance_score * 100)}% match
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
