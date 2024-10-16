/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        'bux-blue': '#3B82F6',
        'primary': '#071d2b', // Keep this for the BUXDAO logo
        'secondary': '#1f435a', // Keep this for the BUXDAO logo
        'background': '#050505', // Darker background
        'surface': '#0f0f0f', // Slightly lighter surface color
        'text': '#ffffff', // White text
        'neon-blue': '#00ffff', // Neon blue accent
        'neon-pink': '#ff00ff', // Neon pink accent
        'neon-green': '#00ff00', // Neon green accent
      },
      textStroke: {
        '2': '2px',
        'yellow': '2px yellow',
      },
      textStrokeColor: {
        'yellow-400': '#FBBF24',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon-blue': '0 0 5px theme("colors.neon-blue"), 0 0 10px theme("colors.neon-blue")',
        'neon-pink': '0 0 5px theme("colors.neon-pink"), 0 0 10px theme("colors.neon-pink")',
        'neon-green': '0 0 5px theme("colors.neon-green"), 0 0 10px theme("colors.neon-green")',
      },
      textStrokeWidth: {
        'default': '1px',
        '0': '0',
        '2': '2px',
      },
      textStrokeColor: theme => theme('colors'),
      textShadow: {
        'neon-blue': '0 0 5px #00ffff, 0 0 10px #00ffff',
        'neon-pink': '0 0 5px #ff00ff, 0 0 10px #ff00ff',
        'neon-green': '0 0 5px #00ff00, 0 0 10px #00ff00',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities, theme, variants }) {
      const newUtilities = {
        '.text-stroke': {
          '-webkit-text-stroke-width': '1px',
          '-webkit-text-stroke-color': theme('colors.yellow.400', '#FBBF24'),
          'text-stroke-width': '1px',
          'text-stroke-color': theme('colors.yellow.400', '#FBBF24'),
        },
      }
      addUtilities(newUtilities, variants('textStroke'))
    },
    // Custom text shadow implementation
    function({ addUtilities, theme, variants }) {
      const textShadowUtilities = Object.entries(theme('textShadow')).map(([key, value]) => {
        return {
          [`.text-shadow-${key}`]: {
            textShadow: value,
          },
        }
      })
      addUtilities(textShadowUtilities, variants('textShadow'))
    },
    function({ addUtilities }) {
      const newUtilities = {
        '.text-stroke-yellow': {
          '-webkit-text-stroke': '2px yellow',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
