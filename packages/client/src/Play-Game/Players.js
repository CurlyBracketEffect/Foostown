import React from 'react'
import UsersAndStats from './UsersAndStats'

import { makeStyles } from '@material-ui/styles'
import { unstable_Box as Box } from '@material-ui/core/Box'
import {
  List,
  ListSubheader} from '@material-ui/core/'

const useStyles = makeStyles(
  {

  }
)

const Players = () => {
  const classes = useStyles
  return (
    <Box>
    <ListSubheader
    className={classes.subHeader}
    component='div'
  >
    Players
  </ListSubheader>
  <List className={classes.homePageList}>

    <UsersAndStats />
    {/* <Divider style={{ background: '#00aa25', height: "0.5px" }}/> */}

  </List>
  </Box>
  )
}


export default Players