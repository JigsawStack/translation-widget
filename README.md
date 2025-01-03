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
<script>
    initializeTranslationWidget('YOUR_PUBLIC_KEY_HERE', {pageLanguage: 'en'});
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
    <script src="https://cdn.jsdelivr.net/gh/JigsawStack/translation-widget/translate-widget.min.js"></script>
    <script>
      initializeTranslationWidget('YOUR_PUBLIC_KEY_HERE', {pageLanguage: 'en'});
    </script>
</body>
</html>
```

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
