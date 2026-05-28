'use client';

import React, { useState } from 'react';

export interface ImageFieldProps {
  /** Field label shown above the control */
  label?: string;
  /** Current image path stored in content JSON (e.g. "/slug/images/hero.jpg" or external https URL) */
  value?: string;
  /** Called with the new path after upload or manual edit */
  onChange: (newPath: string) => void;
  /** Brand id (e.g. "odins-innovations" or "postalocity") — required for upload target + preview proxy */
  brand: string;
  /** Site slug (e.g. "scent-beads" or "credit-repair") — required for upload target + preview proxy */
  slug: string;
  /** Optional extra classes */
  className?: string;
  /** Optional placeholder for the path input */
  placeholder?: string;
}

/**
 * Reusable ImageField / ImageUpload component for any section editor.
 *
 * - Editable path input (supports both local /slug/images/... paths and external URLs)
 * - Small live preview thumbnail (uses local disk proxy API when path is internal)
 * - "Choose file" button triggers native file picker, uploads via multipart to the
 *   on-disk generated site folder (sites/{brand}/{slug}/public/images/), and updates
 *   the path value automatically.
 * - Works in the local dev setup by writing files directly to disk.
 *
 * Drop-in usage example (inside HeroEditor or BenefitsEditor etc.):
 *
 *   <ImageField
 *     label="Background Image"
 *     value={hero.background?.image}
 *     onChange={(p) => updateBackground({ image: p })}
 *     brand={brand}
 *     slug={slug}
 *   />
 *
 * The parent editor must receive `brand` and `slug` (passed from SiteEditorClient).
 */
export default function ImageField({
  label = 'Image',
  value = '',
  onChange,
  brand,
  slug,
  className = '',
  placeholder = '/slug/images/your-image.jpg or https://...',
}: ImageFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const isExternal = !!value && /^https?:\/\//i.test(value);

  // Build a browser-fetchable preview URL.
  // For external URLs we use them directly.
  // For internal paths we go through the local asset proxy so the Next.js admin can display it.
  const getPreviewSrc = (): string | null => {
    if (!value) return null;
    if (isExternal) return value;

    // Strip optional leading "/slug/" (or "slug/") so the proxy URL is clean: /api/.../asset/images/xxx.jpg
    let assetPart = value.replace(new RegExp(`^/?${slug}/?`, 'i'), '');
    assetPart = assetPart.replace(/^\/+/, '');

    // If after stripping we have nothing useful, fall back gracefully
    if (!assetPart) {
      assetPart = value.replace(/^\/+/, '');
    }

    return `/api/sites/${encodeURIComponent(brand)}/${encodeURIComponent(slug)}/asset/${assetPart}`;
  };

  const previewSrc = getPreviewSrc();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    try {
      const form = new FormData();
      form.append('file', file);

      const uploadUrl = `/api/sites/${encodeURIComponent(brand)}/${encodeURIComponent(slug)}/upload-image`;
      const res = await fetch(uploadUrl, {
        method: 'POST',
        body: form,
      });

      if (!res.ok) {
        let msg = `Upload failed (${res.status})`;
        try {
          const j = await res.json();
          if (j?.error) msg = j.error;
        } catch {}
        throw new Error(msg);
      }

      const data = await res.json();
      if (data?.path) {
        onChange(data.path);
      } else {
        throw new Error('Server did not return a path');
      }
    } catch (err: any) {
      console.error('Image upload error', err);
      setUploadError(err?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      // Allow selecting the same file again
      e.target.value = '';
    }
  };

  const clearImage = () => {
    onChange('');
    setUploadError(null);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      )}

      <div className="flex items-start gap-3">
        {/* Thumbnail preview */}
        <div className="w-[84px] h-[60px] flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 shadow-inner">
          {previewSrc ? (
            <img
              src={previewSrc}
              alt="Current image preview"
              className="h-full w-full object-cover"
              onError={(ev) => {
                // Hide broken image gracefully
                (ev.currentTarget as HTMLImageElement).style.opacity = '0.15';
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-widest text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-1.5 font-mono text-xs focus:border-black focus:outline-none"
              spellCheck={false}
            />

            <label
              className={`inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md border px-3 py-1.5 text-sm transition ${
                isUploading
                  ? 'border-gray-200 bg-gray-100 text-gray-400'
                  : 'border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100'
              }`}
            >
              <span>{isUploading ? 'Uploading…' : 'Choose file'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>

            {value && (
              <button
                type="button"
                onClick={clearImage}
                className="rounded-md border border-gray-300 px-2.5 py-1.5 text-xs text-gray-600 hover:bg-red-50 hover:text-red-600"
                title="Clear image path"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status / path display */}
          <div className="flex min-h-[16px] items-center gap-2 text-[10px] text-gray-500">
            {value && (
              <span className="max-w-[320px] truncate font-mono text-gray-600" title={value}>
                {value}
              </span>
            )}
            {isUploading && <span className="text-blue-600">Saving to sites/{brand}/{slug}/public/images/</span>}
            {uploadError && <span className="text-red-600">{uploadError}</span>}
          </div>
        </div>
      </div>

      <p className="text-[10px] leading-tight text-gray-400">
        Local files are written directly into the generated site’s <code className="font-mono">public/images</code> folder and the JSON path is updated automatically. External URLs are preserved as-is.
      </p>
    </div>
  );
}
