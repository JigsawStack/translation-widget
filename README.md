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

<script  defer  src="https://cdn.jsdelivr.net/gh/JigsawStack/translation-widget/dist/index.min.js"></script>

```

  



  

### 2. Inject the Translation Widget into the DOM

  

The widget **requires** a container element to render properly.

Add the following `div` wherever you want the widget to appear on your page:

  

```html

<div  class="translation-widget"></div>

```

  

> ⚠️ **Required:** Without this container, the widget will not load. It acts as the anchor point for the UI.

  



  

### 3. Initialize the Widget

  

Right after the widget script, initialize it with your configuration:

  

```html

<script  defer  type="module">

TranslationWidget('YOUR_PUBLIC_KEY_HERE',  {

pageLanguage:  'en',  // Language of your page content

autoDetectLanguage:  false,  // Set true to enable auto-detection

});

</script>

```

  

Replace `YOUR_PUBLIC_KEY_HERE` with your actual public key from the dashboard.

  



  

## ✅ Complete Example

  

```html

<!DOCTYPE  html>

<html  lang="en">

<head>

<title>My Website</title>

</head>

<body>

<h1>Welcome to my site!</h1>

  

<!-- Required Translation Container -->

<div  class="translation-widget"></div>

  

<!-- JigsawStack Translation Widget -->

<script  defer  src="https://cdn.jsdelivr.net/gh/JigsawStack/translation-widget/dist/index.min.js"></script>

<script  defer  type="module">

TranslationWidget('YOUR_PUBLIC_KEY_HERE',  {

pageLanguage:  'en',

autoDetectLanguage:  false,

});

</script>

</body>

</html>

```

  
  

Great! Here's a professional and developer-friendly **Features** section you can plug right into your README, expanding on the five capabilities you listed:

  
  

## ✨ Key Features

  

### 1. 🌍 Automatic Language Detection

  

Detects the user's browser language and translates your page instantly.

To enable this, simply set `autoDetectLanguage: true` during initialization.

  

```js

TranslationWidget('YOUR_PUBLIC_KEY_HERE',  {

autoDetectLanguage:  true,

// other options...

});

```

  



  

### 2. 🔗 URL-Based Language Switching

  

You can trigger translation by passing a language code in the URL:

  

```

https://yoursite.com?lang=fr

```

  

This will automatically translate the page into French (`fr`) on load — perfect for SEO-friendly language targeting or marketing campaigns.

  



  

### 3. 🧠 Programmatic Translation with `window.translate()`

  

Need full control? Trigger translations manually from anywhere in your code using:

  

```js

window.translate('hi');  // translates page to hindi.

```

  

This enables custom buttons, language switchers, or even voice-command-based translations.

  



  

### 4. ⚡ Smart Caching for Efficient API Usage

  

The widget uses **intelligent node-level caching** and reuses previously translated DOM nodes. This ensures:

  

* Fewer API calls

* Optimal usage of your translation quota

* Lightning-fast translations after the first pass

  



  

### 5. 🚀 Faster and More Accurate than Google Translate

  

We built this widget with modern use cases in mind:

Our engine translates content with **contextual accuracy** and **significantly lower latency** compared to Google Translate — especially for dynamically generated or user-facing web content.

  



  

## 🧪 Running Locally

  

### 1. Clone the Repo

  

```bash

git  clone  https://github.com/JigsawStack/translation-widget.git

cd  translation-widget

```

  

### 2. Create a `.env` file

  

```bash

VITE_TRANSLATION_WIDGET_PUBLIC_KEY=your_public_key_here

```

  

### 3. Install Dependencies

  

```bash

npm  install

# or

yarn  install

```

  

### 4. Start Development Server

  

```bash

npm  run  dev

# or

yarn  dev

```

  

Navigate to `http://localhost:5173` to test the widget.

  

### 5. Build for Production

  

```bash

npm  run  build

# or

yarn  build

```

  

The production build will be in the `dist/` directory.

  



  

## ⚙️ Configuration Options

  
| Parameter            | Type    | Default | Description                                                         |
|-||||
| `pageLanguage`       | string  | `'en'`  | Language of the main page content.                                  |
| `autoDetectLanguage` | boolean | `false` | Automatically detect and translate based on user’s browser language. |



  

## 🔘 Direct Translation Button (Optional)

  

Trigger a translation to a specific language programmatically:

  

```html

<button  onclick="window.translate('hi')">Translate to Hindi</button>

```

  

Use any valid language code (e.g., `es`, `fr`, `de`, etc.).

  



  

## 🚫 Prevent Translation for Specific Elements

  

To exclude an element from being translated, add the `notranslate` class:

  

```html

<h2  class="notranslate">Brand Name</h2>

```

  

This will preserve its original text regardless of the page's translation state.

  

## 🤝 Contributing

  

We welcome your contributions!

Please open an issue or submit a pull request with improvements. Be sure to:

  

* Follow conventional commit messages.

* Include examples and test cases if relevant.


## 💬 Need Help?

Join our developer community: [Discord](https://discord.gg/fzezy9qYPq)
