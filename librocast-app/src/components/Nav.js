import { Link, BrowserRouter } from 'react-router-dom';
import './Nav.css'
import profileLogo from './librocast_logo.png';

function Nav() {
   return (
      <div id="nav">
         <div id="goToProfile">
            <div>
               <img style={{float:"left"}} src={profileLogo}></img>
               <div>
                  <h3>Abigail Batinga</h3>
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

      </div>
   )
}
export default Nav;