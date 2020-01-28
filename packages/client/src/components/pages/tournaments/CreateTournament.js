import React, { useState } from 'react'

//router
import { Link } from 'react-router-dom'

//formik & yup
import { Formik } from 'formik'
import * as Yup from 'yup'

//apollo
import { Mutation } from 'react-apollo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

//material-ui
import { Typography, FormControl, TextField, Button } from '@material-ui/core/'

import { CREATE_TOURNAMENT } from 'gql/mutations'

//components
// import CustomizedSnackbar from './SnackBar'

// import Snackbar from '@material-ui/core/Snackbar';
// import SnackbarContent from '@material-ui/core/SnackbarContent';

const CreateTourament = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography style={{ marginTop: 25, marginBottom: 25 }} variant="overline">
        Create Tournament
      </Typography>

      <Link style={{ marginBottom: 25, textDecoration: 'none', width: '50%' }} to="/">
        <Button
          style={{
            width: '100%',
          }}
          color="primary"
          variant="contained"
        >
          Back To Home
        </Button>
      </Link>

      <Mutation
        onError={error => {
          alert(error)
        }}
        mutation={CREATE_TOURNAMENT}
      >
        {(createMatch, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) {
            console.log(error)
            return <p>Error :(</p>
          }

          return (
            <Formik
              initialValues={{
                tournament_name: '',
                number_of_players: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values)
                values = {
                  ...values,
                }
                createMatch({ variables: { createTournament: values } })
                setSubmitting(false)
                // setSnackBarOpen(true)

                // console.log('snack_bar_open', snackBarOpen)
              }}
              validationSchema={Yup.object().shape({
                tournament_name: Yup.string().required('required'),
                number_of_players: Yup.number()
                  .min(8, 'Minimum number of players is 8')
                  .required('required'),
              })}
            >
              {props => {
                const { errors, handleChange, handleSubmit, isSubmitting, values } = props
                return (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      marginTop: 50,
                      width: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      name="tournament_name"
                      label="Tourament Name"
                      value={values.goals_for}
                      onChange={handleChange}
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />

                    <br />
                    <br />
                    <TextField
                      name="number_of_players"
                      label="Number Of Players"
                      value={values.goals_against}
                      onChange={handleChange}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      className={errors.title ? 'text-input error' : 'text-input'}
                    />
                    {errors.title && <div>{errors.title}</div>}

                    <Button
                      type="submit"
                      color="secondary"
                      disabled={isSubmitting}
                      variant="contained"
                      style={{
                        width: '100%',
                        width: '75%',
                        marginTop: 50,
                      }}
                    >
                      Create Tournament
                    </Button>

                    {/* <CustomizedSnackbar 
                    open={snackBarOpen}
                    setSnackBarOpen={setSnackBarOpen} 
                  /> */}
                  </form>
                )
              }}
            </Formik>
          )
        }}
      </Mutation>
    </div>
  )
}

export default CreateTourament
