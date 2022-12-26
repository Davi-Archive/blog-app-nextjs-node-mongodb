import React from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    Avatar,
    CardContent,
    Typography,
    IconButton,
    Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const Blog = ({ id, title, description, image, userName, date, isUser }) => {
    const dateTransformed = new Date(date).toLocaleString('pt-BR')
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/myBlogs/${id}`)
    }
    const handleDelete = () => {
        deleteRequest().then(data => console.log(data))
            .then(() => navigate("/myBlogs"))
            .then(() => navigate("/blogs"))
    }
    const deleteRequest = async () => {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/blog/${id}`)
            .catch(err => console.log(err))
        const data = await res.data;
        return data;
    }
    return (
        <div>
            {""}
            <Card sx={{
                width: "40%",
                margin: 'auto',
                mt: 2,
                padding: 2,
                boxShadow: "5px 5px 10px #ccc",
                ":hover": {
                    boxShadow: "10px 10px 20px #ccc"
                }
            }}>
                {isUser && (
                    <Box display="flex">
                        <IconButton
                            sx={{ marginLeft: "auto" }}
                            onClick={handleEdit}
                        >
                            <EditIcon color="warning" />
                        </IconButton>
                        <IconButton
                            onClick={handleDelete}
                        ><DeleteForeverIcon color="error" />
                        </IconButton>
                    </Box>)

                }
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                            {userName ? userName.charAt(0) : ""}
                        </Avatar>
                    }
                    title={title}
                    subheader={dateTransformed}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt={title}
                />
                <br />
                <br />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Blog