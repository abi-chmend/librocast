import logo from './librocast_logo.png';
import { Link } from 'react-router-dom';

function Auth() {
  return (
    <div>

      <div className="authBox">

        <div className='authItems'>
          <h1>Librocast</h1>
          <img src={logo} alt="lightbulb logo"/>
        </div>

        <div className="loginItems">
          <h2>Login</h2>
          <p>Username</p>
          <input type="text" id="uname" name="uname"></input>

          <p>Password</p>
          <input type="text" id="pass" name="pass"></input>


          <div id='loginBtn'>
          
          <Link to="/onboard">
          <button>Log in</button>
          </Link>
          
          </div>
          
        </div>
      </div>


    </div>
  )}

export default Auth;