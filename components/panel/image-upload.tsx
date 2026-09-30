"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import * as api from "@/lib/api/panel";
import { errorMessage } from "@/lib/api/errors";

const ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_BYTES = 5 * 1024 * 1024;

/** Public images (product/category) -> Cloudinary via POST /media. First image = cover. */
export function ImageUpload({ urls, max, onChange }: { urls: string[]; max: number; onChange: (urls: string[]) => void }) {
  const [busy, setBusy] = useState(false);

  const add = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, max - urls.length);
    e.target.value = "";
    if (files.some((f) => f.size > MAX_BYTES)) {
      toast.error("Each image must be 5 MB or smaller.");
      return;
    }
    setBusy(true);
    try {
      const uploaded: string[] = [];
      for (const f of files) {
        const res = await api.uploadFile(f, "public");
        if (res.url) uploaded.push(res.url);
      }
      onChange([...urls, ...uploaded]);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {urls.map((u, i) => (
        <div key={u} className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={u} alt={i === 0 ? "Cover image" : `Image ${i + 1}`} className="size-20 rounded-lg object-cover border border-gray-500/20" />
          {i === 0 && max > 1 && <span className="absolute bottom-1 left-1 bg-white/90 text-[10px] px-1 rounded">Cover</span>}
          <button
            type="button"
            aria-label="Remove image"
            onClick={() => onChange(urls.filter((x) => x !== u))}
            className="absolute -top-2 -right-2 size-6 rounded-full bg-error text-white text-xs"
          >
            ×
          </button>
        </div>
      ))}
      {urls.length < max && (
        <label className="size-20 rounded-lg border border-dashed border-gray-400 flex items-center justify-center text-xs text-light-secondary-text cursor-pointer text-center">
          {busy ? "Uploading…" : "+ Add image"}
          <input type="file" accept={ACCEPT} multiple={max > 1} className="sr-only" onChange={add} disabled={busy} />
        </label>
      )}
    </div>
  );
}
