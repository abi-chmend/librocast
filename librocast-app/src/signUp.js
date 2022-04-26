import { useState } from 'react'
import {useSignUp} from './useSignUp'
import {Link} from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { error, signup } = useSignUp()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email,password,displayName)
  }
  
  return (
    <div>
      <div className='login-container'>
        <h1>Account Information</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-margin">
          <label> Name </label>
          <input
            required
            type="name"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </div>
       
        <div className="form-margin">
          <label> Email Address </label>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        
        <div className="form-margin">
        <label>Password</label>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div> 
      
        <div className="form-margin">
          <button className="button button-primary" type="submit">sign up</button>
        </div>
          
        <p>Already have an account? <Link to ="/login">Log In</Link></p>
        {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  )
}