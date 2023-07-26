import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      
      window.localStorage.setItem(
        'userLogged', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')
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
      <form onSubmit={handleLogin}>
        <div>
          username 
          <input 
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password 
          <input 
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const handleBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      setNotification({message: `a new blog ${title} by ${author} added`, error: false})
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
  
  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      {notification && <Notification info={notification}/>}
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <h1>create new</h1>
      <form onSubmit={handleBlog}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
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