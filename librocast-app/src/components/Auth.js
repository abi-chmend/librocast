import logo from './librocast_logo.png';
import { useState } from 'react'
import { useLogIn } from '../useLogIn'
import { Link, useNavigate } from "react-router-dom";

function Auth(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, login } = useLogIn()
    const history = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email,password)
    history('/login')

    /**
    // if user successfully logged in, update the username of the current logged-in user
    if (error == null) {
      props.changeUser(e)
    }*/
  }

    return (
    <div>

    <div className="authBox">

    <div className='authItems'>
    <h1>Librocast</h1>
    <img src={logo} alt="lightbulb logo"/>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="loginItems">
        <h2>Login</h2>
        <p>Email</p>
        {/*<input type="text" id="uname" name="uname"></input>*/}
        <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
        />
        <p>Password</p>
        {/*<input type="text" id="pass" name="pass"></input>*/}
        <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
        />

        <div id='loginBtn'>

          <button type="submit">Log in</button>
          {error && <p>{error}</p>}
        </div>
        <p>Don't have an account? <Link to ="/signup">Sign Up</Link></p>
      </div>
    </form>
    </div>
    </div>
    );
}

export default Auth;