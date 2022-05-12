import {Link, BrowserRouter} from 'react-router-dom';
import './Nav.css'
import profileLogo from './librocast_logo.png';
import {useAuthContext} from "../useAuthContext";

function Nav() {
   const { dispatch } = useAuthContext()

   return (
      <div id="nav">

         <BrowserRouter>

            <div id="goToProfile">
               <div>
               <img style={{float:"left"}} alt="Profile" src={profileLogo}></img>
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



         </BrowserRouter>
         

      </div>
   )
}
//             <br></br>
//             <a href = "#" onClick={() => {
//                dispatch({ type: 'LOGOUT'})
//                window.location.href = '/login'
//             }}>Log Out</a>
export default Nav;