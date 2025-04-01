/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    extend: {
      backgroundImage: {
        'bg_img': "url('./Hotel Icon and Image/Hero Section.png')",

      },
      colors: {
        primary: 'rgba(255, 255, 255, 1)',
        secondary: 'rgba(0, 0, 0, 1)',
        primary_1:'rgba(0, 0, 0, 0.8)',
        primary_2:'rgba(0, 0, 0, 0.6)',
        primary_3:'rgba(30, 30, 30, 1)',
        bg_color:'rgba(61, 52, 28, 0.06)',
        border_color :'rgba(82, 82, 82, 1)',
        border_color_2 :'rgba(104, 104, 104, 1)',
        footer_colors :'rgba(36, 36, 36, 1)'        
      },
      fontFamily: {
        'Inter': ["Inter", 'sans-serif']
      }
    },
    
  },
  plugins: [],
}

