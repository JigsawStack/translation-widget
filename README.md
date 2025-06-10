![Screen Recording 2025-06-11 at 4 59 10 AM](https://github.com/user-attachments/assets/a2919d34-8711-4141-9efa-387320ba5902)Demo Link - [Website](https://translation-widget-demo.vercel.app/)

# 🌍 JigsawStack Translation Widget

![Screen Recording 2025-06-11 at 4 59 10 AM](https://github.com/user-attachments/assets/85ab9c33-e430-4842-90c9-7c4714abb13f)


JigsawStack Translation Widget is a powerful, drop-in translation solution that brings enterprise-grade translation capabilities to any website. It's designed to be the last translation widget you'll ever need, combining speed, accuracy, and context-aware translations in one seamless package.


The goal is to make web page translations feel seamless and thoughtful — like someone truly cared enough to get it right.

- ⭐ Lightning-fast translations with smart caching
- 🌍 Automatic language detection and URL-based switching
- 🧠 Contextual accuracy beyond literal translations
- 🎨 Fully customizable UI and positioning
- 📱 Responsive design with automatic font scaling
- 🔒 Secure API key-based authentication
- 🔄 Programmatic translation control
- 🎯 Perfect for product teams, documentation, and global businesses

Powered by JigsawStack's advanced translation engine for superior accuracy and performance.

# 🔧 Prerequisites

  

To use the widget, you'll need a **public key** from your [JigsawStack dashboard](https://jigsawstack.com).

This key ensures secure usage and links translations to your account.

  

### Here a quick demo :

  

https://github.com/user-attachments/assets/b182020b-8990-4d7a-8280-6e751e8c0d5f

  

> ⚠️ **Important**: Make sure to use a **public key** from your JigsawStack dashboard with translation capabilities enabled. This ensures secure usage and proper access to translation features only.

# ⚡ Quick Install

You can install the `translation-widget` using your preferred package manager:

```bash
npm install translation-widget
# or
yarn add translation-widget
# or
pnpm add translation-widget

```
## 📦 Usage with React / Next.js

### 1. Create a Translation Component

Create a React component to initialize the widget:

```tsx
"use client";
import { useEffect } from "react";
import TranslationWidget from "translation-widget";

export default function Translation() {
  useEffect(() => {
    TranslationWidget("YOUR_PUBLIC_KEY_HERE", {
      showUI: true,
      pageLanguage: 'en',
      position: "top-right",
      autoDetectLanguage: false,
    });
  }, []);

  return null;
}

```

Replace `"YOUR_PUBLIC_KEY_HERE"` with your actual public key from the dashboard.

### 2. Use It in Your Layout

Import and include the component in your layout file:

```tsx
import Translation from './components/Translation';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Translation />
    </>
  );
}

```

----------

## 🌐 Embed via Script Tag (For Static Sites or Non-React Apps)

### 1. Add the Widget Script

Place this script just before the closing `</body>` tag in your HTML file:

```html
<!-- JigsawStack Translation Widget -->
<script defer src="https://unpkg.com/translation-widget@latest/dist/index.min.js"></script>

```

### 2. Initialize the Widget

Immediately after the script, add this initialization code:

```html
<script defer type="module">
  TranslationWidget('YOUR_PUBLIC_KEY_HERE', {
    pageLanguage: 'en',         // Optional
    position: 'top-right',      // Optional
    autoDetectLanguage: false,  // Optional
    showUI: true,               // Optional
    theme: {
      baseColor: '',     // Optional
      textColor: '',     // Optional
    }
  });
</script>

```

----------

## ✅ Full HTML Example

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
          // configuration options 
      });
    </script>
  </body>
</html>

```

----------

## ⚙️ Next.js Integration

### App Router (Next.js 13+)

1.  Create the widget component with client-side directive:
    

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

export default function TranslationWidgetComponent() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/translation-widget@latest/dist/index.min.js';
    script.defer = true;

    const initWidget = () => {
      if (window.TranslationWidget) {
        window.TranslationWidget("YOUR_PUBLIC_KEY", {
            // configuration options 
        });
      }
    };

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

2.  Use it in your layout:
    

```tsx
import TranslationWidgetComponent from '@/components/TranslationWidget';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <TranslationWidgetComponent />
      </body>
    </html>
  );
}

```

----------

### Pages Router (Next.js ≤12)

#### Option 1: Add in `_app.tsx`

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
              // configuration options 
          });
        }}
      />
    </>
  );
}

```

#### Option 2: Add in `_document.tsx`

```tsx
import { Html, Head, Main, NextScript } from 'next/document';

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
                     // configuration options 
                  });
                }
              });
            `,
          }}
        />
      </body>
    </Html>
  );
}

```

----------

## 🧠 TypeScript Support

If you're using TypeScript and encounter type errors for `window.TranslationWidget`, add the following declaration in a `types.d.ts` file or your component:

```ts
declare global {
  interface Window {
    TranslationWidget: (publicKey: string, config?: {
      pageLanguage?: string;
      position?: string;
      autoDetectLanguage?: boolean;
      theme?: {
        baseColor?: string;
        textColor?: string;
      };
      showUI?: boolean;
    }) => void;
  }
}

```

# ⚙️ Configuration Options

| Parameter             | Type    | Default   | Optional | Description                                                                                               |
|----------------------|---------|-----------|----------|-----------------------------------------------------------------------------------------------------------|
| `pageLanguage`       | string  | `'en'`    | Yes      | Language of the main page content                                                                         |
| `autoDetectLanguage` | boolean | `false`   | Yes      | Automatically detect and translate based on user's browser language                                       |
| `position`           | string  | `top-right` | Yes    | Set the position of the widget on the screen. Supported values: `top-right`, `top-left`, `bottom-left`, `bottom-right`. |
| `theme`              | object  | `{}`      | Yes      | Theme configuration for customizing widget appearance                                                     |
| `theme.baseColor`    | string  | `white`   | Yes      | Base color for the widget background and accents                                                          |
| `theme.textColor`    | string  | `black`   | Yes      | Text color for all text elements in the widget                                                            |
| `showUI`             | boolean | `true`    | Yes      | Toggle on/off the default widget UI                                                                       |

## Theme Configuration Example

  

```javascript
const widget = new TranslationWidget(publicKey, {
  pageLanguage: 'en',
  position: 'top-right',
  autoDetectLanguage: true,
  theme: {
    baseColor: '#2563eb', // Custom base color
    textColor: '#1f2937'  // Custom text color
  }
});
```

  
This section is informative and well-structured overall, but there are a few areas that could confuse users or be improved for better clarity, especially for beginners or those integrating the widget for the first time.

## ✨ Key Features

### 1. 🌍 Automatic Language Detection

Let the widget detect the user's preferred language automatically by setting:

```js
TranslationWidget('YOUR_PUBLIC_KEY_HERE', {
  autoDetectLanguage: true,
  // other options...
});

```

----------

### 2. 🔗 URL-Based Language Switching

Append a `lang` query parameter in your site URL to load the page in a specific language:

```
https://yoursite.com?lang=fr
```

This will automatically translate the page to French (`fr`).

----------

### 3. 🧠 Programmatic Translation with `window.translate()`

Manually trigger a language change using JavaScript:

```js
window.translate('hi', (res) => {
  console.log(res);
}, (err) => {
  console.error(err);
});  // Translates the page to Hindi

```

> 🛑 **Note:** To disable the default translation UI, use `showUI: false` in your config.

----------

### 4. ♻️ Reset Translation with `window.resetTranslation()`

Reset or re-translate the page to a specific language using:

```js
window.resetTranslation('en', (res) => {
  console.log(res);
}, (err) => {
  console.error(err);
});  // Resets or re-translates the page to English

```

> 🛑 **Note:** This is useful if you want to override an earlier translation or return to the original content.
> 
> To hide the widget UI, set `showUI: false` in your config.

----------

### ✅ Tips:

-   Both `translate()` and `resetTranslation()` can be used to build your own custom language selector.
    
-   Make sure the widget is initialized before calling these functions.
  
## 🏆 Language Selection Priority
The widget determines which language to display using the following priority order:

| Priority | Source                         | Description                                      |
|----------|--------------------------------|--------------------------------------------------|
| 1        | `lang` URL parameter           | Language set via the `?lang=` URL parameter      |
| 2        | User preference (selected language) | Language the user selects in the widget      |
| 3        | `pageLanguage` (default page language) | The default language set for the page      |


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

  

>  **Note:** You may need to use `!important` in your CSS rules to ensure your custom styles override the widget's default styles.

  

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

  

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
