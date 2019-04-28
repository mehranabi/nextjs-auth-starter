import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { string, object } from 'yup'

const styles = theme => ({
  root: {
    marginRight: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 5,
  },
  centered: {
    textAlign: 'center',
  },
})

const validationSchema = object().shape({
  email: string()
    .required('Required!')
    .email('Please provide a valid email address!'),
  password: string()
    .required('Required!')
    .min(6, 'Please provide at least 6 characters!')
    .max(50, 'Please provide at most 50 characters!'),
})

class LoginForm extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={this.props.onSubmit}
          validationSchema={validationSchema}
          render={({ isSubmitting, handleSubmit }) => (
            <Form>
              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <Field
                    type="email"
                    name="email"
                    label="E-Mail Address"
                    component={TextField}
                    fullWidth
                    variant="filled"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    type="password"
                    name="password"
                    label="Password"
                    component={TextField}
                    fullWidth
                    variant="filled"
                    required
                  />
                </Grid>
                {isSubmitting && (
                  <Grid item xs={12} className={classes.centered}>
                    <CircularProgress />
                  </Grid>
                )}
                <Grid item xs={12} className={classes.centered}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    SignIn
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        />
      </div>
    )
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default withStyles(styles)(LoginForm)
