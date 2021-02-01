const theme = {
  /**
   * Font
   */
  font: {
    family: "'Roboto', sans-serif",
    weight: {
      light: '300',
      normal: '400',
      semi: '500',
      bold: '700'
    },
    size: {
      tiny: '1.1rem',
      xxs: '1.3rem',
      xs: '1.4rem',
      sm: '1.6rem',
      md: '1.8rem',
      lg: '2.0rem',
      xl: '3.4rem'
    }
  },

  /**
   * Colors
   */
  colors: {
    black: '#000000',
    white: '#fff',
    success: '#34a853',
    body: '#fcfbfe',

    primary: {
      light: '#dae9f4',
      main: '#7f9eb2',
      dark: '#274c5e',
      lighterdark: '#3D7794',
      lighterdark1: '#4587A8',
      contrastText: '#fff'
    },

    secondary: {
      light: '#ff4081',
      lightbis: '#ff3366',
      main: '#eb2f64',
      dark: '#ba265d',
      contrastText: '#fff'
    },

    tertiary: {
      main: '#784af4'
    },

    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    },

    border: {
      light: '#f5f5f5',
      main: '#e0e0e0',
      dark: '#bdbdbd'
    },

    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },

    warning: '#FFB818',

    info: '#4169E1',

    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      light1: '#faf9f9',
      light2: '#f4f2f2',
      light3: '#f0eeee',
      light4: '#ccc',
      lightbis: '#eaeaf0',
      dark1: '#333',
      dark2: '#777',
      dark3: '#999'
    }
  },

  /**
   * Shadows
   */
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: 'rgba(0, 0, 0, 0.3) 0px 1px 8px 0px',
    lg: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    xl: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    light: '0 1rem 2rem rgba(0, 0, 0, 0.3)',
    dark: '0 2rem 6rem rgba(0, 0, 0, 0.3)'
  },

  /**
   * Breakpoints
   */
  screen: {
    xs: '540px',
    sm: '640px',
    md: '1007px',
    lg: '1100px',
    xl: '1230px',
    largest: '75em', // 1200 px
    large: '68.75em', // 1100px
    medium: '60em', // 960px
    medium800: '50em', // 800px
    medium716: '44.75em', // 716px
    small: '37.5em', // 600px
    smallest: '31.25em', //500px
    smallest400: '25em', //400px
    smallest292: '18.25em' //292px
  },

  /**
   * Spacing
   */
  spacing: {
    none: 0,
    xxs: '0.5rem',
    xs: '1rem',
    sm: '2rem',
    md: '3rem',
    lg: '4rem',
    xl: '6rem'
  },

  /**
   * Radius
   */
  radius: {
    sm: '0.3rem',
    md: '0.6rem',
    lg: '1.2rem'
  },

  /**
   * zIndex
   */
  zIndex: {
    xs: 10,
    sm: 20,
    md: 30,
    lg: 40,
    xl: 50
  }
};

export default theme;