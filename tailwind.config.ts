import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#926f8e',
          pink: '#d25ca7',
          darkPurple: '#4a3548',
          darkerPurple: '#2a1f29',
          lightPurple: '#b89ab5',
        },
        neon: {
          pink: '#ff6ec7',
          purple: '#b967ff',
          blue: '#00d4ff',
        },
        bg: {
          primary: '#0a0a0f',
          secondary: '#12121a',
          card: '#1a1a24',
          hover: '#222230',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b8b8c8',
          muted: '#7a7a8e',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #d25ca7 0%, #926f8e 100%)',
        'gradient-neon': 'linear-gradient(135deg, #ff6ec7 0%, #b967ff 100%)',
      },
      boxShadow: {
        'glow-pink': '0 0 30px rgba(255, 110, 199, 0.5)',
        'glow-purple': '0 0 30px rgba(185, 103, 255, 0.5)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        typing: 'typing 3s steps(40) 1s forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
