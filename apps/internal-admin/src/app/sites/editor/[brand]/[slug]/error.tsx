'use client';

export default function EditorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error('Editor route error:', error);
  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <h1 className="text-3xl font-semibold text-red-600">Editor Error</h1>
      <p className="mt-4 text-red-700">{error.message}</p>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-black text-white rounded">Try again</button>
    </div>
  );
}
