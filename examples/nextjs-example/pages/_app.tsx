import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

declare global {
  interface Window {
    TranslationWidget: (publicKey: string, options: {
      pageLanguage:   string;
      position: string;
      autoDetectLanguage: boolean;
    }) => void;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var script = document.createElement('script');
              script.src = "http://localhost:5173/dist/index.min.js";
              script.onload = function() {
                TranslationWidget("sk_ae757fe5d2d3f1faf73bb0139508fd45628c2218e06610095116ae01cacde5ac947edf3cd1bac990faa4dee5ee5e89747d2b12b3b38787716880bc3cab891b2c0244Zh7yv6Fmq7GUP1WSW", {
                  pageLanguage: 'en',
                  position: "top-right",
                  autoDetectLanguage: false,
                })
              };
              document.body.appendChild(script);
            })();
          `,
        }}
      />
    </>
  );
}
