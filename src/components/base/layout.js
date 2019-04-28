import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Nav from './nav'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
})

class Layout extends Component {
  render() {
    const { classes, route, profile, children, title } = this.props

    return (
      <div className={classes.root}>
        <Nav profile={profile} route={route} title={title} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Layout)
