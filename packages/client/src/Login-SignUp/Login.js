import React from 'react'
import gql from 'graphql-tag'
import * as Yup from 'yup'

// import App from './App.js'

import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { makeStyles } from '@material-ui/styles'
import { unstable_Box as Box } from '@material-ui/core/Box'
import {
  Typography, TextField, Button
} from '@material-ui/core'

const useStyles = makeStyles({
  loginContainer: {
    width: 300,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  createAccount: {
    color: '#000',
    textDecoration: 'none',
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: 500,
  },
  inputField: {
    width: 250,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  cssLabel: {
    '&$cssFocused': {
      color: '#007900',
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#007900'
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#007900',
    },
  },
  notchedOutline: {},
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15
  }
}, { name: 'hello_worlkd_wtf', index: 10 })

const LOG_IN = gql`
  mutation loginMutation ($user: LoginInput!) {
    login (input:$user) {
      user {
        id
        fullname
        email
      }
      csrfToken
    }
  }
`;

const Login = ({
  setCSRFToken
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.loginContainer} >
      <Mutation
        mutation={LOG_IN}
        onCompleted={(data) => {
          console.log('csrf token:', data.login.csrfToken)
          localStorage.setItem('token', data.login.csrfToken)
          setCSRFToken(data.login.csrfToken)
        }}
        onError={(error) => {
          alert(error)
        }}>
        {(login, { data }) => (
          <div className={classes.loginForm}>
            <Typography
              variant='overline'
              style={{ fontSize: 16, color: '#00aa25', fontWeight: 'bold' }}>
              Login
            </Typography>
            <Formik
              initialValues={
                {
                  email: '',
                  password: '',
                }
              }
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  //alert(JSON.stringify(values, null, 2));
                  login({ variables: { user: values } });
                  setSubmitting(false);
                }, 500);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email()
                  .required('Required'),
                password: Yup.string(),
              })}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
                      name='email'
                      label='Email'
                      type='email'
                      margin='normal'
                      variant='outlined'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`{
                      ${classes.inputField}
                      ${errors.email && touched.email ? 'text-input error' : 'text-input'}
                    }`}
                    /> <br />
                    {errors.email &&
                      touched.email && <div className='input-feedback'>{errors.email}</div>}

                    <TextField
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
                      name='password'
                      label='Password'
                      type='text'
                      margin='normal'
                      variant='outlined'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`{
                      ${classes.inputField}
                      ${errors.password && touched.password ? 'text-input error' : 'text-input'}
                    }`}
                    /> <br />
                    {errors.email &&
                      touched.email && <div className='input-feeback'>{errors.email}</div>}

                    <Box className={classes.submitBtn}>

                      <Button
                        type='submit'
                        className='outline'
                        disabled={isSubmitting}
                        variant='contained'
                        color='secondary'
                      >
                        submit                        
                    </Button>

                      <Link to='/sign-up' className={classes.createAccount}>
                        create an account
                    </Link>
                    </Box>
                  </form>
                )
              }}
            </Formik>
          </div>
        )}
      </Mutation>
    </Box>

  )

};


export default Login;