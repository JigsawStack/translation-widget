# JigsawStack Translation Widget

This guide will help you integrate the Translation Widget into your website.


## Prerequisites
- A valid public key (obtain from your [JigsawStack dashboard](https://jigsawstack.com))


## Installation Steps

### 1. Add the Widget Script
Add the following code to your HTML file, just before the closing `</body>` tag:

```html
<!-- Translation Widget -->
<script src="https://cdn.jsdelivr.net/gh/JigsawStack/translation-widget/translate-widget.min.js"></script>
```

### 2. Initialize the Widget
Add the initialization code after the widget script:

```html
 <script  defer type="module">
       TranslationWidget('YOUR_PUBLIC_KEY_HERE', 
            {
                primaryColor: '#2563eb',
                pageLanguage: 'en',
                autoDetectLanguage: false,
            })
        </script>
```

Replace `YOUR_PUBLIC_KEY_HERE` with your actual public key.

### Complete Example
Here's a minimal working example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your website content here -->

    <!-- Translation Widget -->
     <script defer src="./dist/index.min.js"></script>
        <script  defer type="module">
            TranslationWidget(import.meta.env.VITE_TRANSLATION_WIDGET_PUBLIC_KEY, {
                primaryColor: '#2563eb',
                pageLanguage: 'en',
                autoDetectLanguage: false,
            })
        </script>
</body>
</html>
```

## Running Locally

To run and test the widget locally:

1. Clone the repository:
```bash
git clone https://github.com/JigsawStack/translation-widget.git
cd translation-widget
```

2. Create a `.env` file in the root directory and add your public key:
```bash
VITE_TRANSLATION_WIDGET_PUBLIC_KEY=your_public_key_here
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

6. To build for production:
```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist` directory.

## Prevent Translation
To stop an element from being translated, add the class `notranslate` to the HTML element.
```html
<h1 class="notranslate">Don't translate</h1>
```
This ensures that the content inside the element remains in its original form, even if  translation is applied to the rest of the page.

## Configuration options

| param          | type   | default   | description                                 |
|-----------------|--------|-----------|---------------------------------------------|
| pageLanguage    | string | `en`   | Defines the language of the page content.   |
| primaryColor    | string | #2563eb   | Sets the primary theme color for the widget.  |

## Additional Features

### Translation Widget Container
Add a div with the class `translation-widget` where you want the translation widget to appear:
```html
<div class="translation-widget"></div>
```

### Direct Translation Button
You can add a button to trigger translation to a specific language using the `window.translate()` function:
```html
<button onclick="window.translate('hi')" class="translate-hindi-btn">Translate to Hindi</button>
```
Replace `'hi'` with the language code you want to translate to (e.g., 'es' for Spanish, 'fr' for French).

## More Examples

- [Next.js integration guide](./examples/nextjs/README.md)

## Need Help?

- Reach out on [Discord](https://discord.gg/dj8fMBpnqd)

## Security Best Practices

1. Always load the script from our CDN to receive automatic updates and security patches
2. Never expose your private key in the frontend code
3. Keep your public key secure and rotate it if compromised


## Contributing
JigsawStack Translation Widget is open-source and welcomes contributions. Please open an issue or submit a pull request with your changes. Make sure to be as descriptive as possible with your submissions, include examples if relevant.
