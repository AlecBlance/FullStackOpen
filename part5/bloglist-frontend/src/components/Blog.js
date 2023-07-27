import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = {display: visible ? '': 'none'}
  const viewButtonLabel = visible ? 'hide': 'view'

  const toggleVisibility = () => setVisible(!visible)
  const handleLikes = async () => {
    const {likes} = await blogService.like(blog.id)
    setLikes(likes)
  }

  return (
    <div className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{viewButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes:{likes} <button onClick={handleLikes}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog