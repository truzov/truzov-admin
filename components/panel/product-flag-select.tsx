import React from "react";
import type { ProductFlagMode } from "@/types/api";
import { inputClass } from "@/components/panel/kit";

export function ProductFlagSelect({ label, value, onChange, disabled }: {
  label: string; value: ProductFlagMode; onChange: (mode: ProductFlagMode) => void; disabled?: boolean;
}) {
  return <select aria-label={label} className={inputClass + " h-9 w-36"} value={value} disabled={disabled}
    onChange={(e) => onChange(e.target.value as ProductFlagMode)}>
    <option value="auto">Auto</option>
    <option value="force_on">Force on</option>
    <option value="force_off">Force off</option>
  </select>;
}
