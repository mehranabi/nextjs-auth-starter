import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { MuiThemeProvider } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '../src/utils/getPageContext'

class MyApp extends App {
  constructor() {
    super()
    this.state = {
      isRouting: false,
    }
    this.pageContext = getPageContext()
  }

  handleRouteChangeStarted = () => {
    this.setState({
      isRouting: true,
    })
  }

  handleRouteChangeFinished = () => {
    this.setState({
      isRouting: false,
    })
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    Router.events.on('routeChangeStart', this.handleRouteChangeStarted)
    Router.events.on('routeChangeComplete', this.handleRouteChangeFinished)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <title>My Application</title>
        </Head>
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <CssBaseline />
            {this.state.isRouting && (
              <LinearProgress style={{ zIndex: 2000 }} />
            )}
            <Component pageContext={this.pageContext} {...pageProps} />
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

export default MyApp
