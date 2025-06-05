# Contributing to JigsawStack Translation Widget

Thank you for your interest in contributing! 🎉

## How to Contribute

### 1. Fork the Repository
Click the "Fork" button at the top right of this page to create your own copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/your-username/translation-widget.git
cd translation-widget
```

### 3. Create a Branch
Use a descriptive branch name:
```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes
- Follow the existing code style.
- Add or update tests as needed.
- Update documentation if your changes affect usage.

### 5. Commit and Push
```bash
git add .
git commit -m "Describe your changes"
git push origin feature/your-feature-name
```

### 6. Open a Pull Request
Go to your fork on GitHub and click "Compare & pull request".

## Code Style

- Use clear, descriptive variable and function names.
- Write concise and meaningful commit messages.
- Keep pull requests focused and minimal.

## Reporting Issues

- Use the GitHub Issues tab.
- Provide as much detail as possible (steps to reproduce, screenshots, etc.).

## Community

- Be respectful and inclusive.
- Constructive feedback is welcome!

## Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
2. **Add Env**
   Create a `.env` file in the root directory with the following variables:
   ```bash
   # Required: Your JigsawStack Public API key
   VITE_TRANSLATION_WIDGET_PUBLIC_KEY=your_api_key_here
   ```
   You can get your Public API key from the [JigsawStack Dashboard](https://jigsawstack.com).

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

3. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```
   (or the port specified in your project) 