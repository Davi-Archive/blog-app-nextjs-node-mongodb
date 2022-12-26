import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login, logout } from '../store'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    name: '', email: '', password: ''
  })
  const [isSignup, setIsSignup] = useState()
  let data;
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const sendRequest = async (type = "login") => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    }).catch(err => console.log(err))

    const data = await res.data
    return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(login()))
        .then(() => navigate("/blogs"))
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(login()))
        .then(() => navigate("/blogs"))
    }

    sendRequest()
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display="flex"
          maxWidth={400}
          flexDirection={'column'}
          alignItems='center'
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && <TextField
            name="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="Name"
            margin="normal" />
          }    <TextField
            name="email"
            value={inputs.email}
            onChange={handleChange}
            type={'email'}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            value={inputs.password}
            onChange={handleChange}
            type={'password'} placeholder="Password" margin="normal" />
          <Button type="submit" variant="contained" sx={{ marginTop: 3, borderRadius: 3 }}>Submit</Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth