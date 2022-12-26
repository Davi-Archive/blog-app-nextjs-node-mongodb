import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState()
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: ''
  })
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest().then(data => console.log(data)).then(()=>navigate("/myBlogs"))
  }
  const id = useParams().id
  const fetchDetails = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/${id}`)
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }
  useEffect(() => {
    fetchDetails().then(data => {
      setBlog(data)
      setInputs({
        title: data.title,
        description: data.description,
        image: data.image
      })
    })
  }, [id])


  const sendRequest = async () => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description,
      image: inputs.image
    }).catch(err => console.log(err))
    const data = await res.data
    return data;
  }
  return (
    <>
      {inputs && (
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
              Edit your Blog
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
      )}
    </>
  )
}

export default BlogDetail