import React from 'react'

//apollo
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

//material-ui
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core/'

const AvailableSpots = ({ value, onChange }) => {
  return (
    <div>
      <div style={{ margin: '1rem 0', color: 'black', width: 300 }}>
        <Query
          query={gql`
            query {
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
            if (error) {
              console.log(error)
              throw error
            }
            return (
              <div>
                {data.teams.map((team) => (
                  <h2 style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    display: 'flex', 
                    justifyContent: 'center', 
                    fontSize: '16px',
                    border: '1px solid #BCBCBC',
                    padding: '16px',
                    borderRadius: '4px',
                  }}>Available Spots: &nbsp;
                    <div style={{
                      color: 'black',
                      textDecoration: 'underline',
                      textDecorationColor: 'green',
                      fontSize: '16px',
                    }}
                    >
                     {team.id}
                    </div>
                  </h2>
                ))}
              </div>
            )
          }}
        </Query>
      </div>
    </div>
  )
}

export default AvailableSpots