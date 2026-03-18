import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

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
          background: "#08090b",
          borderRadius: 14,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 44,
            height: 44,
            borderRadius: 999,
            background: "rgba(183,182,233,0.18)",
            filter: "blur(14px)",
          }}
        />
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            background: "#eeb08c",
          }}
        />
      </div>
    ),
    size,
  );
}
