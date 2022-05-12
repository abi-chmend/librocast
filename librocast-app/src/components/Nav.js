import {Link, BrowserRouter} from 'react-router-dom';
import './Nav.css'
import profileLogo from './librocast_logo.png';

function Nav() {
   return (
      <div id="nav">

         <BrowserRouter>

            <div id="goToProfile">


               <div>
               <img style={{float:"left"}} alt="Profile" src={profileLogo}></img>


               <div>
               <h3>Abigail Batinga</h3>
               <Link to="/profile" onClick={window.location.reload}>Go to profile</Link>
               </div>
               
               </div>
               
               
            </div>

            <br></br>

            <Link to="/home" onClick={window.location.reload}>Home</Link>
            <br></br>
            

            <Link to="/feed" onClick={window.location.reload}>Feed</Link>

            <br></br>
            <Link to="/explore" onClick={window.location.reload}>Explore</Link>

            <br></br>
            <Link to="/search" onClick={window.location.reload}>Search</Link>

            
         </BrowserRouter>
         

      </div>
   )
}
export default Nav;