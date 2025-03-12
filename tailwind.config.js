/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      screens: {
        'xs': '480px', // Add this for extra small screens
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      extend: {
        colors: {
          primary: '#ff55a2',
          secondary: '#5879ff',
          heroRed: '#eb0d18',
          yellow: '#f9e174',
          black: '#1f2024',
          lightBlue: '#ace5d7',
          blue: {
            dark: '#163892',
            light: '#cae9fa'
          },
          purple: {
            light: '#a774f9',
            dark: '#672fcf',
            darker: '#461a97'
          }
        },
        fontFamily: {
          'space-mono': ['"Space Mono"', 'monospace'],
          'right-grotesk': ['"Right Grotesk"', 'sans-serif'],
        },
        animation: {
          'float': 'float 3s ease-in-out infinite',
          'pulse': 'pulse 2s infinite',
          'logo-spin': 'logo-spin 20s linear infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          pulse: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.8' },
          },
          'logo-spin': {
            'from': { transform: 'rotate(0deg)' },
            'to': { transform: 'rotate(360deg)' },
          }
        },
        backgroundImage: {
          'pattern': "url('./assets/images/pattern-bg.png')",
        },
      },
    },
    plugins: [],
  }
  
