# 🌍 JigsawStack Translation Widget

The JigsawStack Translation Widget enables lightning-fast, accurate translations on your website with a customizable, drop-in widget. Built for modern websites, it's the perfect solution for product teams, documentation portals, and global businesses that demand more than just literal translations.


## 🔧 Prerequisites

To use the widget, you'll need a **public key** from your [JigsawStack dashboard](https://jigsawstack.com).
This key ensures secure usage and links translations to your account.


## 📦 Installation

### 1. Add the Widget Script

Insert the following just before the closing `</body>` tag in your HTML file:

```html
<!-- JigsawStack Translation Widget -->
<script defer src="https://cdn.jsdelivr.net/gh/JigsawStack/translation-widget/dist/index.min.js"></script>
```

### 2. Initialize the Widget

Right after the widget script, initialize it with your configuration:

```html
<script defer type="module">
  TranslationWidget('YOUR_PUBLIC_KEY_HERE', {
    pageLanguage: 'en',          // Language of your page content
    position: "top-right",       // Position the widget 
    autoDetectLanguage: false,   // Set true to enable auto-detection
  });
</script>
```

Replace `YOUR_PUBLIC_KEY_HERE` with your actual public key from the dashboard.

## ✅ Complete Example

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
  <script defer src="https://cdn.jsdelivr.net/gh/JigsawStack/translation-widget/dist/index.min.js"></script>
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
window.translate('hi');  // translates page to Hindi
```

---

### 4. ⚡ Smart Caching for Efficient API Usage

Benefits include:

* Fewer API calls
* Optimal translation quota usage
* Lightning-fast repeated loads


### 5. Font Size Adjustment

The translation widget automatically adjusts font sizes when translating text to prevent overflow issues. This is particularly useful when translating to languages that typically have longer text lengths. The font size adjustment works as follows:

- Base font size: 12px (minimum)
- Maximum font size: Original font size of the element
- The font size scales logarithmically based on text length
- Original font sizes are preserved and restored when resetting translations

The font size adjustment is automatic and requires no additional configuration. It helps maintain readability while preventing text overflow in translated content.

### 6. 🚀 Faster and More Accurate than Google Translate

Our engine offers **contextual accuracy** and **lower latency**, especially for dynamic content.



# ⚙️ Configuration Options

| Parameter            | Type    | Default | Description                                                         |
| -------------------- | ------- | ------- | ------------------------------------------------------------------- |
| `pageLanguage`       | string  | `'en'`  | Language of the main page content                                   |
| `autoDetectLanguage` | boolean | `false` | Automatically detect and translate based on user's browser language |
| `position`           | string  | `top-right` | Automatically Set the position of the widget in the screen, supported `top-right`, `top-left`, `bottom-left`, `bottom-right`.

---


## 🚀 Next.js Integration

### App Router (Next.js 13+)

Add the widget container and script to your root layout (`app/layout.tsx`):

```tsx
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
          <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = "https://cdn.jsdelivr.net/gh/JigsawStack/translation-widget/dist/index.min.js";
                script.onload = function() {
                  TranslationWidget("sk_dkdks", {
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
        src="https://cdn.jsdelivr.net/gh/JigsawStack/translation-widget/dist/index.min.js"
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
        <script src="https://cdn.jsdelivr.net/gh/JigsawStack/translation-widget/dist/index.min.js" defer></script>
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
      pageLanguage: string;
      position: string;
      autoDetectLanguage: boolean;
    }) => void;
  }
}
```

This will resolve any TypeScript errors related to the `TranslationWidget` global function.

## 🎯 React Integration

For React applications, you can add the widget by including the script tags in your `index.html` file:

```html
<script src="https://cdn.jsdelivr.net/gh/JigsawStack/translation-widget/dist/index.min.js"></script>
<script defer type="module">
    TranslationWidget(import.meta.env.VITE_TRANSLATION_WIDGET_PUBLIC_KEY, {
        pageLanguage: 'en',
        autoDetectLanguage: false,
        position: 'top-right',
    })
</script>
```

Make sure to:
1. Place these scripts just before the closing `</body>` tag
2. Set up your environment variable `VITE_TRANSLATION_WIDGET_PUBLIC_KEY` in your `.env` file
3. If you're not using Vite, replace `import.meta.env.VITE_TRANSLATION_WIDGET_PUBLIC_KEY` with your public key directly

### Configuration Options

You can customize the widget by modifying the configuration object in the `TranslationWidget` initialization:

```js
TranslationWidget("YOUR_PUBLIC_KEY_HERE", {
  pageLanguage: 'en',          // Your page's default language
  autoDetectLanguage: false,   // Enable/disable auto-detection
  position: "top-right",       // Widget position
});
```


## 🎨 CSS Customization

You can customize the appearance by overriding CSS classes.

---

### Widget Container and Positioning

| Selector                                    | Description           | Example Usage                                           |
| ------------------------------------------- | --------------------- | ------------------------------------------------------- |
| `.translation-widget`                       | Main widget container | `.translation-widget { z-index: 2000; }`                |
| `.translation-widget.position-top-right`    | Top-right positioning | `.position-top-right { top: 1rem; right: 1rem; }`       |
| `.translation-widget.position-top-left`     | Top-left positioning  | `.position-top-left { top: 1rem; left: 1rem; }`         |
| `.translation-widget.position-bottom-right` | Bottom-right          | `.position-bottom-right { bottom: 1rem; right: 1rem; }` |
| `.translation-widget.position-bottom-left`  | Bottom-left           | `.position-bottom-left { bottom: 1rem; left: 1rem; }`   |

---

### Widget Trigger Button

| Selector           | Description         | Example Usage                              |
| ------------------ | ------------------- | ------------------------------------------ |
| `.widget-trigger`  | Main trigger button | `.widget-trigger { background: #f0f0f0; }` |
| `.trigger-content` | Inside trigger      | `.trigger-content { gap: 0.5rem; }`        |
| `.lang-code`       | Language code text  | `.lang-code { font-size: 16px; }`          |
| `.lang-name`       | Language name text  | `.lang-name { color: #666; }`              |

---

### Dropdown Menu

| Selector           | Description          | Example Usage                               |
| ------------------ | -------------------- | ------------------------------------------- |
| `.widget-dropdown` | Dropdown container   | `.widget-dropdown { width: 300px; }`        |
| `.dropdown-header` | Header section       | `.dropdown-header { background: #f8f9fa; }` |
| `.dropdown-title`  | Title area           | `.dropdown-title { padding: 1rem; }`        |
| `.title-text`      | Title text           | `.title-text { font-weight: bold; }`        |
| `.language-count`  | Language count badge | `.language-count { background: #e9ecef; }`  |

---

### Search Section

| Selector            | Description         | Example Usage                           |
| ------------------- | ------------------- | --------------------------------------- |
| `.search-container` | Container           | `.search-container { margin: 1rem; }`   |
| `.search-input`     | Input field         | `.search-input { border-radius: 8px; }` |
| `.search-icon`      | Search icon         | `.search-icon { color: #666; }`         |
| `.clear-search`     | Clear search button | `.clear-search { color: #999; }`        |

---

### Language List

| Selector                  | Description    | Example Usage                              |
| ------------------------- | -------------- | ------------------------------------------ |
| `.language-list`          | List container | `.language-list { max-height: 400px; }`    |
| `.language-item`          | Language item  | `.language-item { padding: 0.75rem; }`     |
| `.language-item.selected` | Selected item  | `.selected { background: #e3f2fd; }`       |
| `.language-item.focused`  | Focused item   | `.focused { background: #f5f5f5; }`        |
| `.language-name`          | Name text      | `.language-name { font-weight: 500; }`     |
| `.language-code`          | Code badge     | `.language-code { background: #f0f0f0; }`  |
| `.language-details`       | Extra details  | `.language-details { font-size: 0.8rem; }` |

---

### Icons and Visual Elements

| Selector           | Description       | Example Usage                                 |
| ------------------ | ----------------- | --------------------------------------------- |
| `.globe-icon`      | Globe icon        | `.globe-icon { color: #2196f3; }`             |
| `.check-icon`      | Check mark        | `.check-icon { color: #4caf50; }`             |
| `.loading-spinner` | Spinner animation | `.loading-spinner { border-color: #2196f3; }` |

---

### Footer

| Selector           | Description    | Example Usage                               |
| ------------------ | -------------- | ------------------------------------------- |
| `.dropdown-footer` | Footer section | `.dropdown-footer { background: #f8f9fa; }` |
| `.footer-text`     | Footer text    | `.footer-text { color: #666; }`             |

---

### Responsive Design

| Selector                    | Description   | Example Usage                                                     |
| --------------------------- | ------------- | ----------------------------------------------------------------- |
| `@media (max-width: 640px)` | Mobile styles | `@media (max-width: 640px) { .widget-dropdown { width: 90vw; } }` |

---

### Accessibility

| Selector                                  | Description        | Example Usage                                                                |
| ----------------------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| `@media (prefers-contrast: high)`         | High contrast mode | `@media (prefers-contrast: high) { .widget-trigger { border: 2px solid; } }` |
| `@media (prefers-reduced-motion: reduce)` | Reduced motion     | `@media (prefers-reduced-motion: reduce) { * { transition: none; } }`        |


```html
<style>
  .widget-trigger {
    background-color: #eee;
    border-radius: 8px;
  }
</style>
```

## 🧪 Running Locally

### 1. Clone the Repo

```bash
git clone https://github.com/JigsawStack/translation-widget.git
cd translation-widget
```

### 2. Create a `.env` file

```bash
VITE_TRANSLATION_WIDGET_PUBLIC_KEY=your_public_key_here
```

### 3. Install Dependencies

```bash
npm install
# or
yarn install
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Navigate to `http://localhost:5173`.

### 5. Build for Production

```bash
npm run build
# or
yarn build
```

The output will be in the `dist/` directory.

---
