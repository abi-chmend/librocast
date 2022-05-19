import './App.css'
import {GetUserProfile} from '../backend/Query'
import {getAuth} from "firebase/auth";

function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
      const userProfile = GetUserProfile(user.uid)
      return (
          <div id="App">
              {userProfile.map((profile) => (
                  <DisplayHome
                      displayName={profile.data.displayName}
                      goals={profile.data.goals}
                      currentBook={profile.data.book_reading}/>
              ))}
          </div>
      )
  } else {
      return (
         <div>You ain't logged in pardner!</div>
      );
  }

}

function DisplayHome(props) {
    return(
        <div className="homeWrapper">
            <h1>Welcome Back, {props.displayName}</h1>
            <div id="readingGoals">
                {props.goals.map((goal, index) => (
                    <p>Goal: {goal["goal_id"]} Progress: {goal["progress"]}</p>
                ))}
            </div>

            <div id="currentRead">
                <h2>Currently Reading: {props.currentBook}</h2>
            </div>
        </div>
    );
}

export default Home; 