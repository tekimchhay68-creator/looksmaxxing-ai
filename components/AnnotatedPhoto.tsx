"use client";

import { useState } from "react";
import { Annotation, POSITIVE, NEGATIVE } from "@/lib/types";

function tooltipStyle(a: Annotation): React.CSSProperties {
  const flipBelow  = a.y < 18;
  const shiftLeft  = a.x > 78;
  const shiftRight = a.x < 22;
  return {
    left:      shiftLeft  ? "auto"  : shiftRight ? "14px" : "50%",
    right:     shiftLeft  ? "14px"  : "auto",
    top:       flipBelow  ? "14px"  : "auto",
    bottom:    flipBelow  ? "auto"  : "14px",
    transform: (!shiftLeft && !shiftRight) ? "translateX(-50%)" : undefined,
  };
}

export default function AnnotatedPhoto({
  photoUrl,
  annotations,
}: {
  photoUrl: string;
  annotations: Annotation[];
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative select-none">
      <img
        src={photoUrl}
        alt="Your photo with analysis markers"
        className="w-full block rounded-2xl"
        draggable={false}
      />

      {annotations.map((a, i) => {
        const c = a.type === "positive" ? POSITIVE : NEGATIVE;
        const isHovered = hovered === i;

        return (
          <div
            key={i}
            className="absolute"
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <svg
              width="38"
              height="38"
              viewBox="-19 -19 38 38"
              aria-hidden
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                overflow: "visible",
                cursor: "pointer",
              }}
            >
              <circle
                r={9}
                stroke={c}
                strokeWidth={0.75}
                fill={isHovered ? `${c}12` : "none"}
                strokeOpacity={isHovered ? 0.8 : 0.32}
                style={{ transition: "stroke-opacity 0.2s ease, fill 0.2s ease" }}
              />
              <circle
                r={2.5}
                fill={c}
                fillOpacity={isHovered ? 1 : 0.78}
                style={{ transition: "fill-opacity 0.2s ease" }}
              />
            </svg>

            {isHovered && (
              <div
                aria-hidden
                className="absolute z-20 pointer-events-none"
                style={tooltipStyle(a)}
              >
                <div
                  className="font-sans text-xs whitespace-nowrap px-3 py-1.5 rounded-xl"
                  style={{
                    background: "rgba(250,250,250,0.96)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(232,213,183,0.65)",
                    borderLeft: `2.5px solid ${c}`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    color: "#2C2C2C",
                  }}
                >
                  {a.label}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
