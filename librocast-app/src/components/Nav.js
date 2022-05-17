import { Link, BrowserRouter } from 'react-router-dom';
import './Nav.css'
import profileLogo from './librocast_logo.png';
import {useAuthContext} from "../useAuthContext";
import {getAuth} from "firebase/auth";

function Nav() {
   const auth = getAuth();

   return (
       <div id="nav">
          <div id="goToProfile">
             <div>
                <img style={{float:"left"}} src={profileLogo}></img>
                <div>
                   <h3>LIBROCAST</h3>
                   <Link to="/profile">Go to profile</Link>
                </div>
             </div>
          </div>

          <br></br>

          <Link to="/home">Home</Link>

          <br></br>

          <Link to="/feed">Feed</Link>

          <br></br>

          <Link to="/explore">Explore</Link>

          <br></br>

          <Link to="/search">Search</Link>

          <br></br>
          <a href ='#' onClick={() => {
             auth.signOut().then((res) => {
                window.location.href = '/login'
             })}
          }>Log Out</a>

       </div>
   )
}
export default Nav;