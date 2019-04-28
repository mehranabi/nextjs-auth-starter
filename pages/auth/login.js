import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
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
})

const Auth = new AuthService()

class Login extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Head>
          <title>ورود به حساب | Trade Room</title>
        </Head>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center" gutterBottom>
            ورود
          </Typography>
          <Typography variant="subtitle2" align="center">
            برای ورود به حساب، اطاعات کاربری خود را وارد نمایید.
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
            حساب کاربری ندارید؟ ثبت نام کنید:
          </Typography>
          <div className={classes.centered}>
            <Link href="/auth/register">
              <Button variant="contained">ثبت نام</Button>
            </Link>
          </div>
        </Paper>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)
