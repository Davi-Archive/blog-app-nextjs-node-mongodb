import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Tabs,
  Tab
} from '@mui/material'
import { login,logout } from '../store'
import { Link } from 'react-router-dom'

const Header = () => {
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  return (
    <AppBar sx={{
      background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(98,98,255,1) 0%, rgba(0,212,255,1) 100%)',
    }}>
      <Toolbar>
        <Typography variant="h4"> BlogsApp </Typography>
        {isLoggedIn && <Box display="flex" marginLeft="auto">
          <Tabs
            textColor="inherit"
            value={value} onChange={(e, val) => setValue(val)}>
            <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
            <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
          </Tabs>
        </Box>}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && <> <Button
            LinkComponent={Link} to="/auth"
            variant='contained'
            sx={{ margin: 1, borderRadius: 10 }}
            color='warning'>Login
          </Button>
            <Button
              LinkComponent={Link} to="/auth"
              variant='contained'
              sx={{ margin: 1, borderRadius: 10 }}
              color='warning'>Signup
            </Button>
          </>}
          {isLoggedIn && <Button
            onClick={() =>dispatch(logout())}
            LinkComponent={Link} to="/auth"
            variant='contained'
            sx={{ margin: 1, borderRadius: 10 }}
            color='warning'>Logout
          </Button>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header