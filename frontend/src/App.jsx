import React from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Auth from "./components/Auth"
import Header from "./components/Header"
import Blogs from "./components/Blogs"
import UserBlogs from "./components/UserBlogs"
import BlogDetail from "./components/BlogDetail"
import AddBlog from "./components/AddBlog"
import { Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {login} from './store'

function App() {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispath(login())
    }else{
      navigate("/auth")
    }
  },[dispath])
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>

      <main>
        <Box sx={{ marginTop: 9 }}>

          <Routes>
            {!isLoggedIn ? <Route path="/auth" element={<Auth />} /> :
              <>
                <Route path="/auth" element={<Auth />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/myBlogs" element={<UserBlogs />} />
                <Route path="/myBlogs/:id" element={<BlogDetail />} />
                <Route path="/blogs/add" element={<AddBlog />} />
              </>
            }
          </Routes>
        </Box>
      </main>
    </React.Fragment>
  )
}

export default App
