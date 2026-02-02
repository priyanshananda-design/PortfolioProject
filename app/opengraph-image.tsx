import { ImageResponse } from "next/og";
import { site } from "../lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #05060a, #0b1424)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontSize: "52px",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ fontSize: "24px", letterSpacing: "0.2em", color: "#7bd8ff" }}>
          Signal → Insight → Decision
        </div>
        <div style={{ marginTop: "16px", fontWeight: 600 }}>{site.profile.name}</div>
        <div style={{ marginTop: "12px", fontSize: "30px", color: "#cbd5f5" }}>
          AI/Data Product Manager
        </div>
      </div>
    ),
    size
  );
}
