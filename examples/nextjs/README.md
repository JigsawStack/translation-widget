# JigsawStack Translation Widget

This guide will help you integrate the Translation Widget into your Next.js website.


## Prerequisites
- A valid public key (obtain from your [JigsawStack dashboard](https://jigsawstack.com))

## Installation Steps

### 1. Create a Translation Widget Component
Create a new file `components/TranslationWidget.tsx`:

```typescript
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    initializeTranslationWidget: (key: string) => void;
  }
}

interface TranslationWidgetProps {
  publicKey: string;
}

export default function TranslationWidget({ publicKey }: TranslationWidgetProps) {
  useEffect(() => {
    // Load the translation widget script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/JigsawStack/translation-widget/translate-widget.min.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize the widget once the script is loaded
      window.initializeTranslationWidget(publicKey, options);
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, [publicKey, options]);

  return null; // This component doesn't render anything
}
```


### 2. Add to Your Layout or Page
You can add the widget to your app layout (`app/layout.tsx`) or specific pages:

```typescript
import TranslationWidget from '@/components/TranslationWidget';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        <TranslationWidget 
          publicKey="YOUR_PUBLIC_KEY_HERE"
        />
      </body>
    </html>
  );
}
```




### 3. Environment Variables (Optional)
For better security, store your public key in environment variables:

1. Create or update `.env`:
```bash
NEXT_PUBLIC_JIGSAWSTACK_PUBLIC_KEY=your_public_key_here
```

2. Update your layout:
```typescript
<TranslationWidget 
  publicKey={process.env.NEXT_PUBLIC_JIGSAWSTACK_PUBLIC_KEY}
/>
```

## Need Help?

- Reach out on [Discord](https://discord.gg/dj8fMBpnqd). We'll be happy to help.

## Security Best Practices

1. Always load the script from our CDN to receive automatic updates and security patches
2. Never expose your private key in the frontend code
3. Keep your public key secure and rotate it if compromised


## Contributing
JigsawStack Translation Widget is open-source and welcomes contributions. Please open an issue or submit a pull request with your changes. Make sure to be as descriptive as possible with your submissions, include examples if relevant.
