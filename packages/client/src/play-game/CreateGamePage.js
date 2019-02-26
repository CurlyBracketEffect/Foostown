import React from 'react'

//router
import { Link } from 'react-router-dom'

//formik & yup
import { Formik } from 'formik'
import * as Yup from 'yup'

//apollo
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

//material-ui
import { 
  Typography, FormControl, TextField, Button 
} from '@material-ui/core/'

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

    <Typography style={{ marginTop: 25, marginBottom: 25 }} variant='overline'>Create Game</Typography>

    <Link style={{ marginBottom: 25, textDecoration: 'none', width: '50%' }} to='/home'>
      <Button 
        style={{
          width: '100%'
        }}
        color='primary'
        variant='contained'
      >
        Back To Home
      </Button>
    </Link>
    {/* <Mutation
      onError={(error) => {
        alert(error)
      }}
      mutation={gql`
        mutation($item: NewItemInput!) {
          addItem (
            input: $item	
          ) {
              id
              title
              description
            }
        }  
      `}
    >
      {(createGame, { loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return ( */}
          <Formik
            initialValues={{
              selectOpponent: [],
              yourScore: '',
              opponentScore: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              values = {
                ...values,
                selectOpponent: values.selectOpponent.map(opponent => opponent.value),
              }
              // createGame({ variables: {
              //   insert key here: insert value here
              // } })
              setSubmitting(false)
            }}
            validationSchema={Yup.object().shape({
              selectOpponent: Yup.array()
                .of(
                  Yup.object().shape({
                    // insert key here: Yup.string().required(),
                  })
                ),
              yourScore: Yup.string()
                .required('required'),
              opponentScore: Yup.string()
                .required('required'),
            })}
          >
            {props => {
              const {
                handleSubmit,
                isSubmitting,                 
              } = props
              return (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    marginTop: 50,
                    width: '300px',
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >

                  <FormControl variant='outlined'>
                    <SelectOpponent 
                      style={{
                        marginTop: 50,
                      }}
                    />
                  </FormControl>

                  <div
                    style={{
                      marginTop: 50,
                      display: 'flex', 
                      justifyContent: 'space-between',
                    }}
                  >
                    <TextField
                      id='standard-number'
                      label='Your Score'
                      // value={}
                      // onChange={}
                      type='number'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{
                        width: '45%',
                      }}
                      variant='outlined'
                    />

                    <TextField
                      id='standard-number'
                      label='Opponent Score'
                      // value={}
                      // onChange={}
                      type='number'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{
                        width: '45%',
                      }}
                      variant='outlined'
                    />
                  </div>

                  <Link style={{ marginTop: 50, width: '75%', textDecoration: 'none' }} to='/home'>
                    <Button 
                      type='submit'
                      color='secondary'
                      disabled={isSubmitting} 
                      variant='contained' 
                      style={{
                        width: '100%',
                      }}
                    >
                      Submit Scores
                    </Button>
                  </Link>
          
                </form>
              )
            }}
          </Formik>
      {/* )}}
      </Mutation> */}
  </div>
)

export default CreateGamePage