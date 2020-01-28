import React from 'react'

//apollo
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

//material-ui
import { OutlinedInput, InputLabel, Select, MenuItem } from '@material-ui/core/'

import { GET_VIEWER_TEAMS } from 'gql/queries'

const SelectOpponent = ({ value, onChange }) => {
  return (
    <div>
      <div style={{ margin: '1rem 0', color: 'black', width: 300 }}>
        <InputLabel shrink>Select Opponent</InputLabel>
        <Query query={GET_VIEWER_TEAMS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) {
              console.log(error)
              throw error
            }
            return (
              <Select
                onChange={onChange}
                value={value}
                style={{ width: '300px' }}
                name="team_id"
                input={<OutlinedInput />}
              >
                {/* {console.log(data.viewer)} */}
                {data.viewer.teams.map(team => (
                  <MenuItem key={team.id} value={parseInt(team.id)}>
                    {team.team_name}
                  </MenuItem>
                ))}
              </Select>
            )
          }}
        </Query>
      </div>
    </div>
  )
}

export default SelectOpponent
