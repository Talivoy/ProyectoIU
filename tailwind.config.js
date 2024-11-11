module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#001A23',
            light: '#5D4E6D',
          },
          secondary: {
            DEFAULT: '#8FA998',
            light: '#9CBFA7',
          },
          accent: '#C9F299',
        },
      },
    },
    plugins: [],
  }
