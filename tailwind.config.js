/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        jitter:{ 
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%':{transform:'skewY(0.7deg) skewX(-0.7deg) scale(1.006)'} }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        jitter: 'jitter 1s infinite'
      }
    },
  },
  plugins: [],
}
