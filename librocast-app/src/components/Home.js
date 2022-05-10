import { BrowserRouter } from 'react-router-dom';
import './App.css'
import CurrentRead from './CurrentRead.js';
import HomeGoals from './HomeGoals';
import Nav from './Nav';


function Home() {

  function addGoal() {
    console.log("hi");
  }

  function addRead() {
    console.log("hi");
  }

  return (
    
    <div id="home">
      
      <h1>Welcome back, Abigail</h1>

      <div id="readingGoals">
        <h1>Today's Reading Goals</h1>
        <hr></hr>
        <input type="text"></input>
        <button id="addGoalBtn" onClick={addGoal}>
          Add Goal
        </button>
      </div>


      <div id="currentRead">
        <h1>Currently reading...</h1>
        <button id="addReadBtn" onClick={addRead}>
          Add current read
        </button>
      </div>

      
    </div>
  )
}

export default Home; 