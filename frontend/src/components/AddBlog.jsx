import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }

const AddBlog = () => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: ''
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest().then((data) => console.log(data))
      .then(() => navigate("/blogs"))
      .then(() => navigate("/myBlogs"))
  }

  const sendRequest = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/add`, {
      title: inputs.title,
      description: inputs.description,
      image: inputs.image,
      user: localStorage.getItem("userId")
    }).catch(err => console.log(err))
    const data = await res.data
    return data

  }
  return (
    <form onSubmit={handleSubmit}>
      <Box
        border={3}
        borderColor="green"
        borderRadius={10}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin={'auto'}
        marginTop={10}
        display="flex"
        flexDirection={'column'}
        width={"80%"}
      >
        <Typography
          fontWeight={'bold'}
          padding={3}
          color="gray"
          variant="h2"
          textAlign={'center'}
        >
          Post Your Blog
        </Typography>
        <InputLabel
          sx={labelStyles}
        >Title</InputLabel>
        <TextField
          onChange={handleChange}
          value={inputs.title}
          name="title"
          margin="normal"
          variant="outlined" />
        <InputLabel
          sx={labelStyles}
        >Description</InputLabel>
        <TextField
          onChange={handleChange}
          value={inputs.description}
          name="description"
          margin="normal" variant="outlined" />
        <InputLabel
          sx={labelStyles}
        >ImageURL</InputLabel>
        <TextField
          onChange={handleChange}
          value={inputs.image}
          name="image"
          margin="normal" variant="outlined" />
        <Button
          sx={{ mt: 2, borderRadius: 4 }}
          variant="contained"
          color="warning"
          type="submit"
        >Submit</Button>
      </Box>
    </form>
  )
}

export default AddBlog