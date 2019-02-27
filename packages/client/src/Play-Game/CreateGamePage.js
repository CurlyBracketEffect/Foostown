import React from 'react'

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

//components
import SelectOpponent from './SelectOpponent'

const CreateGamePage = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Typography style={{ marginTop: 25, marginBottom: 25 }} variant="overline">
      Create Game
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
              goals_for: '',
              goals_against: '',
              organization_id: 1,
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values)
              values = {
                ...values,
              }
              createMatch({ variables: { createMatch: values } })
              setSubmitting(false)
              alert('Submitting Score!')
            }}
            validationSchema={Yup.object().shape({
              team_id: Yup.number().required('required'),
              goals_for: Yup.number().required('required'),
              goals_against: Yup.number().required('required'),
            })}
          >
            {props => {
              const { handleChange, handleSubmit, isSubmitting, values } = props
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
                  <FormControl variant="outlined">
                    <Query
                      query={gql`
                        query{
                          viewer{
                            id
                          }
                        }
                      `}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>
                        if (error){
                          console.log(error)
                          return <p>Error :(</p>
                        } 
                        return (
                          <SelectOpponent
                            userID = {data.viewer.id}
                            value={parseInt(values.team_id)}
                            onChange={handleChange}
                          />
                        )
                      }}
                    </Query>
                  </FormControl>

                  <div
                    style={{
                      marginTop: 50,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TextField
                      name="goals_for"
                      label="Your Score"
                      value={values.goals_for}
                      onChange={handleChange}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{
                        width: '45%',
                      }}
                      variant="outlined"
                    />

                    <TextField
                      name="goals_against"
                      label="Opponent Score"
                      value={values.goals_against}
                      onChange={handleChange}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{
                        width: '45%',
                      }}
                      variant="outlined"
                    />
                  </div>

                  {/* <Link style={{ marginTop: 50, width: '75%', textDecoration: 'none' }} to='/'> */}
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
                    Submit Scores
                  </Button>
                  {/* </Link> */}
                </form>
              )
            }}
          </Formik>
        )
      }}
    </Mutation>
  </div>
)

export default CreateGamePage
