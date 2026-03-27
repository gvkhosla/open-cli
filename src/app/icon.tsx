import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

function PromptMark({ scale = 1 }: { scale?: number }) {
  const stroke = 7 * scale;
  const left = 18 * scale;
  const mid = 30 * scale;
  const top = 18 * scale;
  const center = 32 * scale;
  const bottom = 46 * scale;

  return (
    <svg width={64 * scale} height={64 * scale} viewBox={`0 0 ${64 * scale} ${64 * scale}`} fill="none">
      <path
        d={`M ${left} ${top} L ${mid} ${center} L ${left} ${bottom}`}
        stroke="#F5F7FA"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M ${36 * scale} ${45 * scale} H ${48 * scale}`}
        stroke="#F5F7FA"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#151D26",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <PromptMark />
      </div>
    ),
    size,
  );
}
