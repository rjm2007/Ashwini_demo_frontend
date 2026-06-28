"use client";

import type { CoverageComponent } from "../../lib/types";

export default function CoverageCard({ row }: { row: CoverageComponent }) {
  const period = row.coverage_period || {};
  const hierarchy = row.coverage_hierarchy || {};

  return (
    <div className="card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <span
          className="mono"
          style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)" }}
        >
          {row.coverage_id}
        </span>
        {row.coverage_type ? (
          <span
            style={{
              fontSize: 10,
              padding: "2px 8px",
              borderRadius: "var(--r-pill)",
              background: "var(--bg-hover)",
              color: "var(--text-muted)",
            }}
          >
            {row.coverage_type}
          </span>
        ) : null}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
        {row.coverage_name}
      </div>
      <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
        {period.duration_text ||
          [period.duration_months ? `${period.duration_months} mo` : null, period.mileage_limit ? `${period.mileage_limit} ${period.mileage_unit || "mi"}` : null]
            .filter(Boolean)
            .join(" / ") ||
          "—"}
      </div>
      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
        {[hierarchy.system, hierarchy.subsystem, hierarchy.component_group].filter(Boolean).join(" › ")}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {row.limit_of_liability?.amount != null ? (
          <Badge label={`LOL $${row.limit_of_liability.amount.toLocaleString()}`} />
        ) : null}
        {row.deductible?.amount != null ? (
          <Badge label={`Ded $${row.deductible.amount}`} />
        ) : null}
        {row.plan_tier ? <Badge label={row.plan_tier} /> : null}
      </div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: 10,
        padding: "2px 8px",
        borderRadius: "var(--r-pill)",
        border: "1px solid var(--border)",
        color: "var(--text-secondary)",
      }}
    >
      {label}
    </span>
  );
}
