import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 38,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 118,
            height: 118,
            borderRadius: 999,
            background: "rgba(183,182,233,0.18)",
            filter: "blur(24px)",
          }}
        />
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 999,
            background: "#eeb08c",
          }}
        />
      </div>
    ),
    size,
  );
}
