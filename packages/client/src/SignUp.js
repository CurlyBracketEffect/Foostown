import React from 'react';
import gql from 'graphql-tag'
import * as Yup from 'yup'

import { Link } from 'react-router-dom';
import { Formik } from 'formik'
import { makeStyles } from '@material-ui/styles'
import { ThemeProvider } from '@material-ui/styles'
import { unstable_Box as Box } from '@material-ui/core/Box'
import {
    Typography, TextField, Button
} from '@material-ui/core'

const SignUp = ({
  // setCSRFToken
}) => {
  //const classes = useStyles();
  return (
    <ThemeProvider>
      <div>
        <Typography variant='overline'>Sign-up here</Typography>
        <Formik
          initialValues={
            {
              fullname: '',
              email: '',
              password: '',
            }
          }
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              //signUp({variables: {user: values}})
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
            handleReset
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <TextField
                name='full name'
                label='full name'
                type='text'
                margin='dense'
                value={values.fullname}
                onChange={handleChange}
                onBlur={handleBlur}
              //   className={`{
              //     ${classes.inputField}
              //     ${classes.fullname && touched.fullname ? 'text-input error' : 'text-input'}
              //   }`
              // }
              /> <br />
              {errors.fullname &&
                touched.fullname && <div className='input-feedback'>{errors.fullname}</div>}
              
              <TextField
                name='email'
                label='email'
                type='text'
                margin='dense'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              //   className={`{
              //     ${classes.inputField}
              //     ${classes.email && touched.email ? 'text-input error' : 'text-input'}
              //   }`
              // }
              /> <br />
              {errors.email &&
                touched.email && <div className='input-feedback'>{errors.email}</div>}

              <TextField
                name='password'
                label='password'
                type='text'
                margin='dense'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                // className={`{
                //   ${classes.inputField}
                //   ${errors.password && touched.password ? 'text-input error' : 'text-input'}
                // }`}
              /> <br />
              {errors.password &&
                touched.password && <div className="input-feedback">{errors.password}</div>}

              <Box display='flex' justifyContent='space-between' alignItems='center' marginTop='15px'>
                <Button
                  type='submit'
                  className='outline'
                  disabled={isSubmitting}
                  variant='contained'
                  color='secondary'
                >
                  Submit
                </Button>
              </Box>
            </form>
          )
        }}
        </Formik>
      </div>
    </ThemeProvider>
  )
}

export default SignUp;

{/* <div>
<h1>Sign Up Page</h1>
<Link to="/"><button>Login</button></Link>
</div> */}