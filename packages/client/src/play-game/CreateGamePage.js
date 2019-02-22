import React from 'react';

//router
import { Link } from 'react-router-dom';

//formik & yup
import { Formik } from 'formik';
import * as Yup from 'yup';

//material-ui
import { FormControl, TextField, Button } from '@material-ui/core/'

//components
import SelectOpponent from "./SelectOpponent";

const CreateGamePage = () => (
  <div
    style={{
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h1>Create Game Page</h1>
    <Link to="/home"><button>Back To Home</button></Link>

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
        };
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
        } = props;
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

            <FormControl>
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
                id="standard-number"
                label="Your Score"
                // value={}
                // onChange={}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{
                  width: '45%',
                }}
              />

              <TextField
                id="standard-number"
                label="Opponent Score"
                // value={}
                // onChange={}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{
                  width: '45%',
                }}
              />
            </div>

             <Button 
                type="submit"
                // color="primary"
                disabled={isSubmitting} 
                variant="contained" 
                style={{
                  marginTop: 50,
                  width: '75%',
                }}
              >
                Submit Scores
              </Button>
     
          </form>
        );
      }}
    </Formik>
  </div>
);

export default CreateGamePage;