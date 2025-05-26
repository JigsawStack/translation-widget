# Translation Widget

A lightweight, customizable translation widget that can be easily embedded into any website.

## Prerequisites

The widget requires React 18 to be loaded in your project. You can include React in one of two ways:

### Option 1: Using CDN (Recommended for simple websites)
Add these scripts to your HTML before loading the widget:
```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
```

### Option 2: Using npm (Recommended for React projects)
If you're already using React in your project, you can skip this step.

## Installation

1. Download the widget files from the `dist` directory:
   - `embed.min.js`
   - `embed.css`

2. Add the files to your project:
```html
<link rel="stylesheet" href="path/to/embed.css">
<script src="path/to/embed.min.js"></script>
```

## Usage

The widget will automatically initialize when the script loads. It will appear in the top-right corner of your website.

### Manual Initialization

If you need to initialize the widget manually, you can call:
```javascript
window.initTranslationWidget();
```

### Customization

The widget can be customized by modifying the following CSS variables in your stylesheet:

```css
:root {
  --widget-primary-color: #007bff;
  --widget-background-color: #ffffff;
  --widget-text-color: #333333;
  --widget-border-radius: 8px;
  --widget-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

## Features

- Language selection dropdown
- Search functionality for languages
- Responsive design
- Smooth animations
- RTL support for languages like Arabic and Hebrew

## Browser Support

The widget supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

To modify or build the widget:

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## License

MIT License - feel free to use this widget in your projects.

## Support

For issues and feature requests, please open an issue in the repository.
