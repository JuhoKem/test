import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

// käynnistys nps start OSA5/bloglist-frontend-kansiossa

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({title: '', author: '', url:''}) // määritellään uusi blogiobjekti
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) // sisältää onnistuneesti kirjautuneen käyttäjän tiedot ja token
  const [errorMessage, setErrorMessage] = useState(null)

  // By using this Hook, you tell React that your component needs to do something after render
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // tämä on tehty, jotta selain muistaisi kirjautumisen, eikä logouttaisi sivun päivityksen yhteydessä
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // uuden blogin lisäys
  const addBlog = (event) => {
    //event.preventDefault()  <-- tämä kommentteihin, jos haluaa, että input tyhjenee
    console.log('New Blog:', newBlog);

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })

  }

  // uloskirjautumisen tapahtumakäsittelijä --> pyyhitään "local storage" tokenista
  const logoutHandle = () => {
    window.localStorage.clear()
  }

  // kontrolloitu tapahtumakäsittelijä inputille
  const handleBlogChange = (event) => {
    event.preventDefault()

    // näin saadaan päivitettyä useampi arvo objektissa. Notaatio ...newBlog ensin kopioi muut arvot ja sitten asettaa uudet arvot
    // event.target.name <-- viittaa input name-kenttään. Näin se osaa asettaa oikean arvoin oikeaan paikkaan
    setNewBlog({
        ...newBlog,
        [event.target.name]: event.target.value
    })
  }
// ********************************************************************************
  // onChange vastaa siitä, että input-kentän arvo päivittyy tilaan esim. user-tilaan
  const loginForm = () => (
    
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        Username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      Password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit"> Login </button>

    </form>
  )
  
  // HUOM! input-kentissä luodaan uusi objekti. ...newBlog-notaatio tarkoittaa, että se kopioi ensin kaikki objektin
  // olemassa olevat tiedot ja sitten ylikirjoittaa pilkun jälkeen tulevan key-value parin.
  // Jos ...newBlog ei ole, häviää objektin kaikki muut kentätä
  const blogForm = () => (
    <form>
      <h2> Blogs </h2>
      <p> {user.name} logged in <button onClick={logoutHandle}> Logout </button> </p>

      <h2>Create new blog</h2>
      
      Title: <input 
              type='text' 
              name="title"
              onChange={handleBlogChange} 
            /> <br/>

      Author: <input 
              type='text' 
              name="author"
              onChange={handleBlogChange}
            /> <br/>

      URL: <input 
              type='text' 
              name="url"
              onChange={handleBlogChange}
            /> <br/>
            

      <button onClick={addBlog}> Create </button> <br/> <br/>

      {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}

    </form>
  )
// ************************************************************************************
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username, password,
      })

      // tallentaa local storageen sisääkirjautuneen käyttäjän tiedot, kuten token, käyttäjätunnus, nimi jne..
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage("moi")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    
    }
  }

  return (
    <div>
      
      { user === null ? loginForm() : blogForm() }
    </div>
  )
}

export default App


/*
      <form onSubmit={handleLogin}>
        <div>
          Username
            <input type="text" value={username} name="Username" 
            onChange={({ target }) => setUsername(target.value)}
            /> 
        </div>
        <div>
          Password
            <input type="password" value={password} name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit"> Login </button>
      </form>
*/

// 5.1 - 5.3


/*

  const blogForm = () => (
    <div>
      <form onSubmit={logoutHandle}>
      <h2> Blogs </h2>
      <p> {user.name} logged in <button type="submit"> Logout </button> </p>
      </form>
<form onSubmit={addBlog}>
      <h2>Create new blog</h2>
      
      Title: <input 
              type='text' 
              value={newBlog.author} 
              onChange={event => setNewBlog({ ...newBlog, author: event.target.value})} 
            /> <br/>

      Author: <input 
              type='text' 
              value={newBlog.title} 
              onChange={event => setNewBlog({ ...newBlog, title: event.target.value})}
            /> <br/>

      URL: <input 
              type='text' 
              value={newBlog.url} 
              onChange={event => setNewBlog({ ...newBlog, url: event.target.value})}
            /> <br/>
            

      <button type="submit"> Create </button> <br/> <br/>

      <h3>Author is: {newBlog.author}</h3>
      <h3>Title is: {newBlog.title}</h3>
      <h3>URL is: {newBlog.url}</h3>
      <h3>JSON is: {JSON.stringify(newBlog)}</h3>
      
      {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}

    </form></div>
  )

*/