import React, { useState } from 'react'

//formik & yup
import { Formik } from 'formik'
import * as Yup from 'yup'

//apollo
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

//material-ui
import { FormControl, Button } from '@material-ui/core/'

//components
import SelectYourTeam from './SelectYourTeam'

const JoinTournament = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Mutation
        onError={error => {
          alert(error)
        }}
        mutation={gql`
          mutation($createMatch: NewMatchInput!) {
            createMatch(input: $createMatch) {
              match_id
              team_id
              goals_for
              goals_against
            }
          }
        `}
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
                team_id: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values)
                values = {
                  ...values,
                }
                createMatch({ variables: { createMatch: values } })
                setSubmitting(false)
              }}
              validationSchema={Yup.object().shape({
                team_id: Yup.number().required('required'),
              })}
            >
              {props => {
                const { handleChange, handleSubmit, isSubmitting, values } = props
                return (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      width: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <FormControl variant="outlined">
                      <SelectYourTeam value={values.team_id} onChange={handleChange} />
                    </FormControl>

                    <Button
                      type="submit"
                      color="secondary"
                      disabled={isSubmitting}
                      variant="contained"
                      style={{
                        width: '100%',
                        width: '75%',
                        marginTop: 25,
                        marginBottom: 25,
                      }}
                    >
                      Join
                    </Button>
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

export default JoinTournament
