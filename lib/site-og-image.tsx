import { ImageResponse } from "next/og";

export const siteOgImageSize = {
  width: 1200,
  height: 630,
};

export const siteOgImageAlt = "Alhwyn Geonzon";

export function createSiteOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f4f2",
          color: "#171717",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
          }}
        >
          Alhwyn Geonzon
        </div>
      </div>
    ),
    {
      ...siteOgImageSize,
    },
  );
}
