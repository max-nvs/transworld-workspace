import { useId } from "react";

export function Logomark({ size = 48 }: { size?: number }) {
  const patternId = useId();
  return (
    <div
      className="relative overflow-hidden rounded-xl"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(180deg, #FFFFFF 0%, #0B1D3A 100%)",
        boxShadow:
          "0px 1.5px 3px 0px rgba(10,13,18,0.06), 0px 1.5px 4.5px 0px rgba(10,13,18,0.1), inset 0px -0.75px 0.75px 0px rgba(10,13,18,0.1)",
        border: "0.3px solid rgba(10,13,18,0.12)",
      }}
    >
      <div className="absolute inset-0 opacity-14">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={patternId} width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#0B1D3A" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>
      <div
        className="absolute rounded-full"
        style={{
          width: size / 2,
          height: size / 2,
          top: size / 4,
          left: size / 4,
          background: "linear-gradient(27deg, #B8954A 0%, #C9A64D 100%)",
          boxShadow:
            "0px 1.5px 3px 0px rgba(10,13,18,0.06), 0px 1.5px 4.5px 0px rgba(10,13,18,0.1)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: size / 2,
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(7.5px)",
          borderRadius: `0 0 12px 12px`,
        }}
      />
    </div>
  );
}
