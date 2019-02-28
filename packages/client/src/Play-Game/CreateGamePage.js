import React from 'react'

//router
import { Link } from 'react-router-dom'

//formik & yup
import { Formik } from 'formik'
import * as Yup from 'yup'

//apollo
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

//components
import SelectOpponent from './SelectOpponent'

//material-ui
import { makeStyles } from '@material-ui/styles'
import { 
  Typography,
  FormControl,
  TextField,
  Button
} from '@material-ui/core/'

const useStyles = makeStyles({
  createPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPageTitle: {
    marginTop: 25, 
    marginBottom: 25,
  },
  backToHomeBtn: {
    marginBottom: 25,
    textDecoration: 'none',
    width: '50%',
  },
  submitScoreForm: {
    marginTop: 50,
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scoreInputField: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'space-between',
  },
  enterScore: {
    width: '45%',
  },
  submitBtn: {
    marginTop: 50,
  },
})

const CreateGamePage = () => {
  const classes = useStyles();
  return (
  <div className={classes.createPage}>
    <Typography className={classes.createPageTitle} variant="overline">
      Create Game
    </Typography>

    <Link className={classes.backToHomeBtn} to="/">
      <Button
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
                  className={classes.submitScoreForm}
                >
                  <FormControl variant="outlined">
                    <SelectOpponent 
                      value={parseInt(values.team_id)}
                      onChange={handleChange} />
                  </FormControl>

                  <div className={classes.scoreInputField}>
                    <TextField
                      name="goals_for"
                      label="Your Score"
                      value={values.goals_for}
                      onChange={handleChange}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      className={classes.enterScore}
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
                      variant="outlined"
                      className={classes.enterScore}
                    />
                  </div>

                  {/* <Link style={{ marginTop: 50, width: '75%', textDecoration: 'none' }} to='/'> */}
                  <Button
                    type="submit"
                    color="secondary"
                    disabled={isSubmitting}
                    variant="contained"
                    className={classes.submitBtn}
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
)}

export default CreateGamePage
