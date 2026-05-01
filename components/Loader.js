export default function Loader({ size = 40, text = "Loading..." }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "80px 0",
      }}
    >
      <div
        className="loader-ring"
        style={{ width: size, height: size }}
      />
      {text && (
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.9rem",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
}
