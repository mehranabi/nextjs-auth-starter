import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import LoginForm from '../../src/components/forms/LoginForm'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import AuthService from '../../src/services/authService'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 3,
  },
  divider: {
    margin: theme.spacing.unit * 2,
  },
  centered: {
    alignItems: 'center',
    textAlign: 'center',
  },
  welcomeText: {
    color: '#989898',
  },
  ssText: {
    color: '#FEAF33',
  },
})

const Auth = new AuthService()

class Login extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Head>
          <title>Sign In | SuperStar CRM</title>
        </Head>
        <Grid container spacing={16}>
          <Grid item xs={5}>
            <Grid container alignItems="center" direction="column">
              <Typography variant="h4" className={classes.welcomeText}>
                WELCOME BACK TO
              </Typography>
              <Typography variant="h3" className={classes.ssText}>
                SUPERSTAR
              </Typography>
              <img src="/static/images/welcome-to-superstar.png" />
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Paper className={classes.paper} square>
              <Typography variant="h4" align="center" gutterBottom>
                SignIn
              </Typography>
              <Typography variant="subtitle2" align="center">
                Fill your credentials to login to your account.
              </Typography>
              <Divider className={classes.divider} />
              <LoginForm
                onSubmit={(values, actions) => {
                  actions.setSubmitting(true)
                  alert(JSON.stringify(values))
                  Auth.setToken('hello-world')
                  actions.setSubmitting(false)
                  Router.push('/')
                }}
              />
              <Divider className={classes.divider} />
              <Typography variant="caption" align="center">
                Don't have an account? SignUp here:
              </Typography>
              <div className={classes.centered}>
                <Link href="/auth/register">
                  <Button variant="contained">SignUp</Button>
                </Link>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)
