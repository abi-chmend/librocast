import './App.css'
import {GetUserProfile} from '../backend/Query'

function Home() {
  const userProfile = GetUserProfile()
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