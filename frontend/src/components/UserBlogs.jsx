import axios from 'axios'
import React, { useEffect,useState } from 'react'
import Blog from './Blog'

const UserBlogs = () => {
  const [blogs,setBlogs] = useState()
  const id = localStorage.getItem("userId")

  const sendRequest = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/user/${id}`)
      .catch(err => console.log(err))
    const data = await res.data.blogs
    return data;
  }

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs))
  }, [])
  return (
        <div>
      {blogs && blogs.map((blog, index) => (
        <Blog
          key={index}
          isUser={true}
          id={blog._id}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          date={blog.updatedAt}
        />
      )
      )}
    </div>
  )
}

export default UserBlogs