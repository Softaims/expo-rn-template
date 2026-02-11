/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: [
      "./components/**/*.{js,jsx,ts,tsx}",
      "./app/**/*.{js,jsx,ts,tsx}",
      "./modules/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          primary: 'var(--color-primary)',
          'primary-foreground': 'var(--color-primary-foreground)',
          secondary: 'var(--color-secondary)',
          'secondary-foreground': 'var(--color-secondary-foreground)',
          background: 'var(--color-background)',
          foreground: 'var(--color-foreground)',
          muted: 'var(--color-muted)',
          'muted-foreground': 'var(--color-muted-foreground)',
          accent: 'var(--color-accent)',
          'accent-foreground': 'var(--color-accent-foreground)',
          destructive: 'var(--color-destructive)',
          'destructive-foreground': 'var(--color-destructive-foreground)',
          border: 'var(--color-border)',
          input: 'var(--color-input)',
          ring: 'var(--color-ring)',
          'chat-message': 'var(--color-chat-message)',
        },
        fontFamily: {
          'thin': ['SharpSans-Thin'],
          'light': ['SharpSans-Light'],
          'normal': ['SharpSans-Regular'],
          'medium': ['SharpSans-Medium'],
          'semibold': ['SharpSans-Semibold'],
          'bold': ['SharpSans-Bold'],
          'extrabold': ['SharpSans-Extrabold'],
        },
      },
    },
    plugins: [],
  }
