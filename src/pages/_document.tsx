
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="th">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="ระบบจองลานกางเต๊นท์" />
        <meta name="author" content="Camp Reservation" />
        <meta property="og:title" content="ระบบจองลานกางเต๊นท์" />
        <meta property="og:description" content="จองลานกางเต๊นท์ของคุณได้ง่ายๆ" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@camp_reservation" />
        <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
