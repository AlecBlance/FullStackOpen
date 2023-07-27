import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])

  useEffect(() => {
    const userLogged = window.localStorage.getItem('userLogged')
    if (userLogged) {
      const user = JSON.parse(userLogged)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (data) => {
    try {
      const user = await loginService.login(data)
      window.localStorage.setItem(
        'userLogged', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setNotification(null)
    } catch ({response: { data }}) {
      setNotification({message: data.error, error: true})
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      {notification && <Notification info={notification}/>}
      <LoginForm login={ handleLogin }/>
    </div>
  )

  const handleCreateBlog = async (data) => {
    try {
      const newBlog = await blogService.create(data)
      setBlogs(blogs.concat(newBlog))
      setNotification({message: `a new blog ${data.title} by ${data.author} added`, error: false})
      setTimeout(() => setNotification(null), 3000)
    } catch ({response: { data }}) {
      setNotification({ message: data.error, error: true})
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userLogged')
  }

  const handleLikes = async (id) => {
    const likedBlog = await blogService.like(id)
    const newBlogs = blogs.map((blog) => id === blog.id ? likedBlog : blog)
    setBlogs(newBlogs)
  }

  const handleRemove = async (id) => {
    await blogService.remove(id)
    const newBlogs = blogs.filter((blog) => blog.id !== id)
    setBlogs(newBlogs)
  }
  
  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      {notification && <Notification info={notification}/>}
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='new note'>
        <BlogForm createBlog={ handleCreateBlog }/>
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            handleLikes={handleLikes} 
            removeButton={blog.user.username === user.username}
            handleRemove={handleRemove}
          />
        )
      }
    </div>
  )

  return (
    <div>
      {user && blogsList()}
      {!user && loginForm()}
    </div>
  )
}

export default App