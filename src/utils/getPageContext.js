import { SheetsRegistry } from 'jss'
import {
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'
import purple from '@material-ui/core/colors/purple'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    drawer: purple[900],
  },
  typography: {
    useNextVariants: true,
  },
})

function createPageContext() {
  return {
    theme,
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName(),
  }
}

let pageContext

export default function getPageContext() {
  if (!process.browser) {
    return createPageContext()
  }

  if (!pageContext) {
    pageContext = createPageContext()
  }

  return pageContext
}
