import { useState } from 'react'

const Blog = ({ blog , handleLikes, removeButton, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '': 'none' }
  const viewButtonLabel = visible ? 'hide': 'view'

  const toggleVisibility = () => setVisible(!visible)

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) handleRemove(blog.id)
  }

  return (
    <div className='blog'>
      <div>
        {blog.title} {blog.author}
        <button className='viewButton' onClick={toggleVisibility}>{viewButtonLabel}</button>
      </div>
      <div style={showWhenVisible} className='togglableInfo'>
        <p>{blog.url}</p>
        <p>likes:{blog.likes} <button className='likeButton' onClick={() => handleLikes(blog.id)}>like</button></p>
        <p>{blog.user.name}</p>
        {removeButton && (<button onClick={remove}>remove</button>)}
      </div>
    </div>
  )
}

export default Blog