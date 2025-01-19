/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        textPrimary: '#481196',
        textSecondary: '#2E1AA9',
        textGray: '#6E6E6E',
        placeholder: '#9E9E9E',
        bgPrimary: '#5125BF',
        bgSecondary: '#3A6FE2',
        darkBgPrimary: '#121212',
        tabsPrimary: '#8e8e93'
      },
      width: {
        'custom-269': '269px',
        'custom-306': '306px'
      },
      height: {
        'custom-38': '38px'
      },
      borderWidth: {
        'custom-1': '1px'
      },
      fontFamily: {
        poppins: ["Poppins_400Regular", "Poppins_500Medium", "Poppins_700Bold"],
        "poppins-regular": "Poppins_400Regular",
        "poppins-medium": "Poppins_500Medium",
        "poppins-bold": "Poppins_700Bold",
      },
    },
  },
  plugins: [],
}