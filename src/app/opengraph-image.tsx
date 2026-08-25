import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Karakura Digital — Desarrollo Web, Software e IA desde Córdoba";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  // Old UA forces Google Fonts to return TTF (satori only accepts TTF/OTF, not WOFF2)
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&display=swap",
    { headers: { "User-Agent": "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)" } }
  ).then((r) => r.text());

  const ttfUrl = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1] ?? "";
  const fontData = ttfUrl ? await fetch(ttfUrl).then((r) => r.arrayBuffer()) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#001711",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: fontData ? "Plus Jakarta Sans" : "system-ui",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Orange ambient */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 560,
            height: 560,
            background: "radial-gradient(circle, rgba(255,122,0,0.22) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Green ambient */}
        <div
          style={{
            position: "absolute",
            bottom: -140,
            right: -80,
            width: 480,
            height: 480,
            background: "radial-gradient(circle, rgba(78,222,163,0.18) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Top: overline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: "#4edea3",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(78,222,163,0.75)",
            }}
          >
            Desde Córdoba al mundo
          </span>
        </div>

        {/* Center: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "white",
              letterSpacing: "-0.02em",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <span>Desarrollo web y</span>
            <span
              style={{
                background: "linear-gradient(to right, #ff7a00, #4edea3)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              software a medida.
            </span>
          </div>

          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: "rgba(194,235,220,0.65)",
              lineHeight: 1.5,
            }}
          >
            Automatización con IA · Aplicaciones empresariales · Sin fronteras geográficas
          </div>
        </div>

        {/* Bottom: URL + location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "rgba(78,222,163,0.7)",
              letterSpacing: "0.01em",
            }}
          >
            karakuradigital.es
          </span>
          <span
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Córdoba · España
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? {
            fonts: [
              { name: "Plus Jakarta Sans", data: fontData, weight: 800, style: "normal" },
            ],
          }
        : {}),
    }
  );
}
