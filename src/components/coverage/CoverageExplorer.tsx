"use client";

import { useMemo, useState } from "react";
import CoverageCard from "./CoverageCard";
import SchemaJsonPanel from "./SchemaJsonPanel";
import WarrantyTypeBadge from "../ui/WarrantyTypeBadge";
import type { WarrantySummaryPayload } from "../../lib/types";

interface CoverageExplorerProps {
  summary: WarrantySummaryPayload;
}

export default function CoverageExplorer({ summary }: CoverageExplorerProps) {
  const [filter, setFilter] = useState("");
  const [showJson, setShowJson] = useState(false);
  const rows = summary.coverage_components || [];
  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        (r.coverage_id || "").toLowerCase().includes(q) ||
        (r.coverage_name || "").toLowerCase().includes(q) ||
        (r.coverage_type || "").toLowerCase().includes(q)
    );
  }, [rows, filter]);

  const program = summary.warranty_program || {};
  const stats = summary.stats || { coverage_count: rows.length };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "var(--text-primary)" }}>
          {program.program_name || summary.filename || "Warranty Program"}
        </h2>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 8 }}>
          {[
            summary.applicability?.make,
            (summary.applicability?.models || []).join(", "),
            (summary as any).vehicle?.model_year?.value,
            (summary as any).vehicle?.vin?.value ? `VIN ${(summary as any).vehicle.vin.value}` : null
          ]
            .filter(Boolean)
            .join(" · ") || "—"}
          {summary.warrantyType && <WarrantyTypeBadge warrantyType={summary.warrantyType} />}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Coverages", value: stats.coverage_count ?? rows.length },
          { label: "Time limits", value: stats.with_time_limit ?? 0 },
          { label: "Mileage limits", value: stats.with_mileage_limit ?? 0 },
          { label: "Confidence", value: stats.extraction_confidence ?? "—" },
        ].map((tile) => (
          <div key={tile.label} className="card" style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase" }}>
              {tile.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>{tile.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by code, name, or type…"
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "var(--r-sm)",
            border: "1px solid var(--border)",
            background: "var(--bg-raised)",
            color: "var(--text-primary)",
            fontSize: 13,
          }}
        />
        <button
          type="button"
          onClick={() => setShowJson(true)}
          style={{
            padding: "8px 14px",
            borderRadius: "var(--r-sm)",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text-secondary)",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          View raw schema
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {filtered.map((row) => (
          <CoverageCard key={row.coverage_id} row={row} />
        ))}
      </div>

      {showJson ? (
        <SchemaJsonPanel schema={summary} onClose={() => setShowJson(false)} />
      ) : null}
    </div>
  );
}

export function CoverageSkeleton() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card" style={{ height: 120, animation: "breathe 1.4s ease-in-out infinite" }} />
      ))}
    </div>
  );
}
