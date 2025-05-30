# JigsawStack Translation Widget

This guide will help you integrate the Translation Widget into your Next.js website.


## Prerequisites
- A valid public key (obtain from your [JigsawStack dashboard](https://jigsawstack.com))

## Installation Steps

### 1. Copy this

```html
<!-- Add this div in the place where you want the widget to show up  -->
        <div className="translation-widget"></div>
<!--  -->
        <Script
         strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = "https://translation-widget.vercel.app/index.min.js";
                script.onload = function() {
                 TranslationWidget("YOUR_PUBLIC_KEY_HERE", {
                pageLanguage: 'en',
                autoDetectLanguage: false,
            })
                };
                document.body.appendChild(script);
              })();
            `,
          }}
        />
```


### 2. Add to Your Layout or Page
You can add the widget script to your app layout (`app/layout.tsx`) or specific pages:

```typescript

import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
<!-- Add this div in the place where you want the widget to show up  -->
        <div className="translation-widget"></div>
<!--  -->
        <Script
         strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = "https://translation-widget.vercel.app/index.min.js";
                script.onload = function() {
                 TranslationWidget("YOUR_PUBLIC_KEY_HERE", {
                pageLanguage: 'en',
                autoDetectLanguage: false,
            })
                };
                document.body.appendChild(script);
              })();
            `,
          }}
        />

      </body>
    </html>
  );
}
```


## Need Help?

- Reach out on [Discord](https://discord.gg/fzezy9qYPq). We'll be happy to help.

## Security Best Practices

1. Always load the script from our CDN to receive automatic updates and security patches
2. Never expose your private key in the frontend code
3. Keep your public key secure and rotate it if compromised


## Contributing
JigsawStack Translation Widget is open-source and welcomes contributions. Please open an issue or submit a pull request with your changes. Make sure to be as descriptive as possible with your submissions, include examples if relevant.
