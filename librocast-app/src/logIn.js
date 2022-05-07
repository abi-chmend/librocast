import { useState } from 'react'
import { useLogIn } from './useLogIn'
import { Link, useNavigate } from "react-router-dom";


export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, login } = useLogIn()
  const history = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email,password)
    history('/login')
  }
  
  return (
    <div className='flex-container'>
      <div className='login-container'>
        <h1>Welcome</h1>
        <form className="form-container" onSubmit={handleSubmit}>
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
          <label> Password </label>
          <input
            required
            type="password"
            value={password}
          />
         </div>
         
          <button className=" button button-primary form-margin">Log In</button>
          {error && <p>{error}</p>}
        </form>
        <p>Don't have an account? <Link to ="/signup">Sign Up</Link></p>
      </div>
    </div>
  )
}