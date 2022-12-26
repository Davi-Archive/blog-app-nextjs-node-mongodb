import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'



const Blogs = () => {
  const sendRequest = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/`)
      .catch(err => console.log(err))
    const data = res.data;
    console.log(data)
    return data;
  }

  const [blogs, setBlogs] = useState()
  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs))

  }, [])
  return (
    <div>
      {blogs && blogs.map((blog, index) => (
        <Blog
          key={index}
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog.user._id}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          userName={blog.user.name}
          date={blog.updatedAt}
        />
      )
      )}
    </div>
  )
}

export default Blogs