import React from 'react'

//apollo
// import { Query } from "react-apollo"
// import gql from "graphql-tag"

//material-ui
import { InputLabel, Select, MenuItem } from '@material-ui/core/'

const SelectOpponent = () => (
  <div>

    <div style={{ margin: '1rem 0', color: 'black', width: 300 }}>
      <InputLabel shrink htmlFor='age-label-placeholder'>
        Select Opponent
      </InputLabel>
      <Select
        style={{width: '300px'}}
        name='Select Opponent'
      >
        <MenuItem value=''>Player 1</MenuItem>
        <MenuItem value=''>Player 2</MenuItem>
        <MenuItem value=''>Player 3</MenuItem>
      </Select>
    </div>

  {/* 
    <Query
      // query={gql`
      //   {
      //     tags {
      //       id
      //       title
      //     }
      //   }    
      // `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>

        const opponents = data.tags.map(({ id, title }) => (
            {value: id, label: title}
        ))
    
        return (
        
        )
      }}
    </Query>
    */}
     
  </div>
)

export default SelectOpponent