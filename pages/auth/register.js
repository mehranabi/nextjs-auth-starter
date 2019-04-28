import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import RegisterForm from '../../src/components/forms/RegisterForm'
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

class Register extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Head>
          <title>ساخت حساب | Trade Room</title>
        </Head>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center" gutterBottom>
            ثبت نام
          </Typography>
          <Typography variant="subtitle2" align="center">
            برای ساخت یک حساب جدید مشخصات خود را وارد نمایید.
          </Typography>
          <Divider className={classes.divider} />
          <RegisterForm
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
            حساب کاربری دارید؟ به حسابتان وارد شوید:
          </Typography>
          <div className={classes.centered}>
            <Link href="/auth/login">
              <Button variant="contained">ورود</Button>
            </Link>
          </div>
        </Paper>
      </div>
    )
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Register)
