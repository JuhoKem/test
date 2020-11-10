import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [visible, setVisible] = useState(false)

  const blogId = blog.id

  const updateBlog = () => {
    //console.log('BUTTONBLOG ID:----->', blogId);
    const changedBlog = { ...blog, likes: blog.likes + 1}
    //console.log('CHNAGEDBLOG: ---->', changedBlog);

    blogService
      .update(blogId, changedBlog)
      .then(returnedBlog => {
        setBlogs(returnedBlog)
      })
  }

  // tapahtumakäsittelijä poistolle
  const removeBlog = () => {

    if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)) { 
      blogService
      .remove(blogId)
  
      setBlogs(blogs.filter(b => b.id !== blogId))  // päivittää blog-tilan poiston jälkeen, eli poistaa tilasta poistettu blogi
    }

  }

  // inline tyyli css
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  return(
    <div style={blogStyle} >
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        < button onClick={() => setVisible(true)}> Show </button>
      </div>
      <div style={showWhenVisible} className='blog' >
        <div>{blog.title} < button onClick={() => setVisible(false)}> Hide </button></div>  
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={updateBlog}> like </button></div>
        <div>{blog.author}</div>
        <button onClick={removeBlog}> remove </button>
      </div>
    </div>
  )
}
export default Blog
