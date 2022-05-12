import logo from './components/librocast_logo.png';
import { useState } from 'react'
import {useSignUp} from './useSignUp'
import {Link} from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [pictureURL, setPictureURL] = useState('')
  const { error, signup } = useSignUp()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email,password,displayName, pictureURL)
  }
  
  return (
    <div>
      <div className='authBox'>

      <div className='authItems'>
      <h1>Librocast</h1>
      <img src={logo} alt="lightbulb logo"/>
        <form onSubmit={handleSubmit}>
        <div className="loginItems">
        <h2>Registration</h2>
          <p> Name </p>
          <input
            required
            type="name"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
          <p> Email Address </p>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        
          <p>Password</p>
            <input
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <p>Profile Picture URL</p>
            <input
                required
                type="pictureURL"
                onChange={(e) => setPictureURL(e.target.value)}
                value={pictureURL}
            />
        <div id="loginBtn">
          <button type="submit">Sign up</button>
        </div>
        </div> 

        <p>Already have an account? <Link to ="/login">Log In</Link></p>
        {error && <p>{error}</p>}
        </form>
        </div>
      </div>
    </div>
  )
}