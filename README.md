# 🌍 JigsawStack Translation Widget

JigsawStack Translation Widget is a powerful, drop-in translation solution that brings enterprise-grade translation capabilities to any website. It's designed to be the last translation widget you'll ever need, combining speed, accuracy, and context-aware translations in one seamless package.


⭐ Lightning-fast translations with smart caching

🌍 Automatic language detection and URL-based switching

🧠 Contextual accuracy beyond literal translations

🎨 Fully customizable UI and positioning

📱 Responsive design with automatic font scaling

⚡ Built-in performance optimizations

🔒 Secure API key-based authentication

🔄 Programmatic translation control

🎯 Perfect for product teams, documentation, and global businesses


Powered by JigsawStack's advanced translation engine for superior accuracy and performance.

<br>

# 🔧 Prerequisites

To use the widget, you'll need a **public key** from your [JigsawStack dashboard](https://jigsawstack.com).
This key ensures secure usage and links translations to your account.

### Here a quick demo :

https://github.com/user-attachments/assets/b182020b-8990-4d7a-8280-6e751e8c0d5f

> ⚠️ **Important**: Make sure to use a **public key** from your JigsawStack dashboard with translation capabilities enabled. This ensures secure usage and proper access to translation features only.

<br>


# Integrations
 ## Basic Integration

### 1. Add the Widget Script

Insert the following just before the closing `</body>` tag in your HTML file:

```html
<!-- JigsawStack Translation Widget -->
<script defer src="https://unpkg.com/translation-widget@latest/dist/index.min.js"></script>
```

### 2. Initialize the Widget

Right after the widget script, initialize it with your configuration:

```html
<script defer type="module">
  TranslationWidget('YOUR_PUBLIC_KEY_HERE', {
    pageLanguage: 'en',          // Language of your page content ( optional )
    position: "top-right",       // Position the widget ( optional )
    autoDetectLanguage: false,   // Set true to enable auto-detection ( optional )
    theme:{
      baseColor: '',  //( optional )
      textColor: '',  //( optional )
    }
    showUI: true, // (optional)
  });
</script>
```

Replace `YOUR_PUBLIC_KEY_HERE` with your actual public key from the dashboard.

### ✅ Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to my site!</h1>

  <!-- Required Translation Container -->
  <div class="translation-widget"></div>

  <!-- JigsawStack Translation Widget -->
  <script defer src="https://unpkg.com/translation-widget@latest/dist/index.min.js"></script>
  <script defer type="module">
    TranslationWidget('YOUR_PUBLIC_KEY_HERE', {
      pageLanguage: 'en',
      position: "top-right",   
      autoDetectLanguage: false,
    });
  </script>
</body>
</html>
```

## Next.Js Integration
### App Router (Next.js 13+)

Add the TranslationWidget Component with `use client` directive inside your components folder.

```tsx
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    TranslationWidget: (
      publicKey: string,
      config?: {
        pageLanguage?: string;
        position?: string;
        autoDetectLanguage?: boolean;
        theme?: {
          baseColor: string;
          textColor: string;
        };
        showUI?: boolean;
      }
    ) => void;
  }
}

export default function TranslationWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/translation-widget@latest/dist/index.min.js';
    script.defer = true;
    
    function initWidget() {
      if (window.TranslationWidget) {
        window.TranslationWidget("YOUR_PUBLIC_KEY", {
          // options here
        });
      }
    }
    script.onload = () => {
      if (document.readyState === 'complete') {
        initWidget();
      } else {
        window.addEventListener('load', initWidget);
      }
    };
  
    document.body.appendChild(script);
  
    return () => {
      window.removeEventListener('load', initWidget);
      document.body.removeChild(script);
    };
  }, []);


  return null;
}

```

Then import it in your layout.tsx

```tsx
import TranslationWidget from "@/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
        <TranslationWidget />
      </body>
    </html>
  );
}
```

### Pages Router (Legacy)

If you're using the Pages Router, add the widget to your `pages/_app.tsx`:

```tsx
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script
        src="https://unpkg.com/translation-widget@latest/dist/index.min.js"
        onLoad={() => {
          window.TranslationWidget("YOUR_PUBLIC_KEY_HERE", {
            pageLanguage: 'en',
            position: "top-right",
            autoDetectLanguage: false,
          });
        }}
      />
    </>
  );
}
```

Alternatively, if you prefer using script tags directly, you can add this to your `pages/_document.tsx`:

```tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script src="https://unpkg.com/translation-widget@latest/dist/index.min.js" defer></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function () {
                if (window.TranslationWidget) {
                  window.TranslationWidget("YOUR_PUBLIC_KEY_HERE", {
                    pageLanguage: 'en',
                    position: "top-right",
                    autoDetectLanguage: false,
                  });
                }
              });
            `,
          }}
        />
      </body>
    </Html>
  )
}
```

### TypeScript Support

If you're using TypeScript and encountering type errors with `window.TranslationWidget`, add the following type declaration to your project (typically in a `types.d.ts` file or at the top of your component file):

```ts
declare global {
  interface Window {
    TranslationWidget: (publicKey: string, options: {
      pageLanguage?: string;
      position?: string;
      autoDetectLanguage?: boolean;
      theme?:{
        baseColor?: string,
        textColor?: string,
      }
      showUI?: boolean
    }) => void;
  }
}
```

This will resolve any TypeScript errors related to the `TranslationWidget` global function.


## React Integration

For React applications, you can add the widget by including the script tags in your `index.html` file:

```html
<script src="https://unpkg.com/translation-widget@latest/dist/index.min.js"></script>
<script defer type="module">
    TranslationWidget("YOUR_PUBLIC_KEY_HERE", {
        pageLanguage: 'en',
        autoDetectLanguage: false,
        position: 'top-right',
    })
</script>
```

Make sure to:
1. Place these scripts just before the closing `</body>` tag
2. Set up your environment variable `YOUR_PUBLIC_KEY_HERE` in your `.env` file

## NPM Package Integration

You can also install and use the translation widget as an npm package. This is particularly useful for modern JavaScript frameworks and TypeScript projects.

### Installation

```bash
npm install translation-widget
# or
yarn add translation-widget
# or
pnpm add translation-widget
```

### Usage

Import and use the widget in your React component:

```tsx
"use client"
import { useEffect } from "react";  
import TranslationWidget from "translation-widget";

export default function Translation() {
  useEffect(() => {
    TranslationWidget("YOUR_PUBLIC_KEY_HERE", {
      showUI: true,
      pageLanguage: 'en',
      position: "top-right",
      autoDetectLanguage: false,
      theme: {
        baseColor: '#2563eb',
        textColor: '#ffffff'
      }
    })
  }, [])
  
  return null;
}
```

Then import and use this component in your layout or app:

```tsx
import Translation from './components/Translation'

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Translation />
    </>
  )
}
```

The npm package provides the same functionality as the CDN version, with the added benefits of:
- TypeScript support out of the box
- Better integration with build tools
- Tree-shaking support
- Version control through package manager

<br>


# ⚙️ Configuration Options

| Parameter            | Type    | Default | Optional | Description                                                         |
| -------------------- | ------- | ------- | -------- | ------------------------------------------------------------------- |
| `pageLanguage`       | string  | `'en'`  | Yes       | Language of the main page content                                   |
| `autoDetectLanguage` | boolean | `false` | Yes      | Automatically detect and translate based on user's browser language |
| `position`           | string  | `top-right` | Yes   | Automatically Set the position of the widget in the screen, supported `top-right`, `top-left`, `bottom-left`, `bottom-right`. |
| `theme`              | object  | `{}`    | Yes      | Theme configuration for customizing widget appearance               |
| `theme.baseColor`    | string  | `white` | Yes      | Base color for the widget background and accents                    |
| `theme.textColor`    | string  | `black` | Yes      | Text color for all text elements in the widget                      |
| `showUI`             | boolean |  `true` | Yes      | Toggle on/off the default widget UI                                 |

## Theme Configuration Example

```javascript
const widget = new TranslationWidget(publicKey, {
    pageLanguage: 'en',
    position: 'top-right',
    autoDetectLanguage: true,
    theme: {
        baseColor: '#2563eb',  // Custom base color
        textColor: '#1f2937'   // Custom text color
    }
});
```

## ✨ Key Features

### 1. 🌍 Automatic Language Detection

To enable this, set `autoDetectLanguage: true`:

```js
TranslationWidget('YOUR_PUBLIC_KEY_HERE', {
  autoDetectLanguage: true,
  // other options...
});
```

---

### 2. 🔗 URL-Based Language Switching

Use URL parameters to switch language:

```
https://yoursite.com?lang=fr
```

This automatically translates the page to French (`fr`).

---

### 3. 🧠 Programmatic Translation with `window.translate()`

Use it manually in your app:

```js
window.translate('hi', (res)=>{
  console.log(res)
}, (err)=>{
  console.log(err)
});  // translates page to Hindi
```
if you wish to disable the UI use  `showUI: false` in the configs.

### 4. 🧠 Programmatic Translation with `window.resetTranslations()`

Use it manually in your app:

```js
window.resetTranslation('en', (res)=>{
  console.log(res)
}, (err)=>{
  console.log(err)
});  // translates page to Hindi
```
if you wish to disable the default translation widget ui use  `showUI: false` in the configs.


## 🏆 Language Selection Priority

The widget determines which language to display using the following priority order:

| Priority | Source                                 | Description                                         |
|----------|----------------------------------------|-----------------------------------------------------|
| 1        | `lang` URL parameter                   | Language set via the `?lang=` URL parameter         |
| 2        | User preference (selected language)    | Language the user selects in the widget             |
| 3        | `pageLanguage` (default page language) | The default language set for the page               |

---

### 5. Font Size Adjustment

The translation widget automatically adjusts font sizes when translating text to prevent overflow issues. This is particularly useful when translating to languages that typically have longer text lengths. The font size adjustment works as follows:

- Base font size: 12px (minimum)
- Maximum font size: Original font size of the element
- The font size scales logarithmically based on text length
- Original font sizes are preserved and restored when resetting translations

The font size adjustment is automatic and requires no additional configuration. It helps maintain readability while preventing text overflow in translated content.

### 6. 🚀 Faster and More Accurate than Google Translate

Our engine offers **contextual accuracy** and **lower latency**, especially for dynamic content.

# 🎨 CSS Customization

You can easily customize the appearance of the JigsawStack Translation Widget by overriding its CSS classes in your own stylesheet. This allows you to match the widget to your site's branding and user experience.

## Quick Demo: Change the Widget Trigger Button

> **Note:** You may need to use `!important` in your CSS rules to ensure your custom styles override the widget's default styles.

Here's a simple example of how to change the background color and border radius of the widget's trigger button:

```html
<style>
  .jigts-widget-trigger {
    background-color: #eee !important;
    border-radius: 8px !important;
  }
</style>
```

Just add this `<style>` block to your site's HTML, or include the rules in your main CSS file. The widget will automatically pick up your custom styles.

For a comprehensive list of all available CSS selectors and their descriptions, [see the Styling Guide](./STYLING.md).


## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.


