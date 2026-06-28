"use client";

export default function SchemaJsonPanel({
  schema,
  onClose,
}: {
  schema: unknown;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 50,
        display: "flex",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: "min(560px, 100%)",
          height: "100%",
          borderRadius: 0,
          padding: 20,
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <strong>Raw schema JSON</strong>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}>
            Close
          </button>
        </div>
        <pre
          style={{
            fontSize: 11,
            fontFamily: "'IBM Plex Mono', monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {JSON.stringify(schema, null, 2)}
        </pre>
      </div>
    </div>
  );
}
