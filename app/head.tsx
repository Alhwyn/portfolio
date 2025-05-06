// app/head.tsx
export default function Head() {
    return (
      <>
        <meta charSet="utf-8" />
        <title>Alhwyn Geonzon Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Preconnect for font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Load Instrument Serif and Source Serif 4 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap"
          rel="stylesheet"
        />
      </>
    );
};