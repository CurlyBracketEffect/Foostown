import React from 'react'

//apollo
import { Query } from "react-apollo"
import gql from "graphql-tag"

//material-ui
import { OutlinedInput, InputLabel, Select, MenuItem } from '@material-ui/core/'

const SelectOpponent = ({
  value,
  onChange,
}) => {

  return (
  <div>

    <div style={{ margin: '1rem 0', color: 'black', width: 300 }}>
      <InputLabel shrink>
        Select Opponent
      </InputLabel>
      <Query
        query={gql`
          {
            teams {
              id
              organization_id
              team_name
            }
          }    
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          return (
            <Select
              onChange={onChange}
              value={value}
              style={{width: '300px'}}
              name='team_id'
              input={
                <OutlinedInput />
              }
            >
              {
                data.teams.map(({ id, team_name }) => (    
                  <MenuItem key={id} value={parseInt(id)}>{team_name}</MenuItem>
                ))
              }
            </Select>
          )
        }}
      </Query>
    </div> 

  </div>
)}

export default SelectOpponent