module.exports = {
    darkMode: 'class', // Enables class-based dark mode for theme toggle
    content: [
      './app/**/*.{js,ts,jsx,tsx}', // Adjust paths to match your project structure
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          background: 'var(--color-background)',
          foreground: 'var(--color-foreground)',
          primary: 'var(--color-primary)',
          'primary-foreground': 'var(--color-primary-foreground)',
          secondary: 'var(--color-secondary)',
          'secondary-foreground': 'var(--color-secondary-foreground)',
          muted: 'var(--color-muted)',
          'muted-foreground': 'var(--color-muted-foreground)',
          accent: 'var(--color-accent)',
          'accent-foreground': 'var(--color-accent-foreground)',
          destructive: 'var(--color-destructive)',
          border: 'var(--color-border)',
          input: 'var(--color-input)',
          ring: 'var(--color-ring)',
          card: 'var(--color-card)',
          'card-foreground': 'var(--color-card-foreground)',
        },
        borderRadius: {
          sm: 'var(--radius-sm)',
          md: 'var(--radius-md)',
          lg: 'var(--radius-lg)',
          xl: 'var(--radius-xl)',
        },
      },
    },
    plugins: [],
  };