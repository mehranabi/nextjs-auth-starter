import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import withAuth from '../src/hoc/withAuth'
import Head from 'next/head'
import AuthService from '../src/services/authService'
import Layout from '../src/components/base/layout'

const styles = theme => ({})

const Auth = new AuthService()

class Index extends Component {
  render() {
    const { classes, auth } = this.props

    return (
      <Layout profile={auth.profile} route="/">
        <Head>
          <title>خانه | Trade Room</title>
        </Head>
        <Typography>پنل شما: {auth.token}</Typography>
        <Button
          variant="contained"
          onClick={() => {
            Auth.removeToken()
            window.location.href = '/'
          }}
        >
          خروج
        </Button>
      </Layout>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

export default withAuth(withStyles(styles)(Index))
