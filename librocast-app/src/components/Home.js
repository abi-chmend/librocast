import { BrowserRouter } from 'react-router-dom';
import './App.css'
import CurrentRead from './CurrentRead.js';
import HomeGoals from './HomeGoals';
import Nav from './Nav';


function Home() {

  function addGoal() {
    let newGoal = document.createElement("div");

    let goal = document.getElementById("goal").value;

    let goalText = document.createElement("p");
    goalText.textContent = goal;

    newGoal.append(goalText);
  }

  function addRead() {
    let newRead = document.createElement("div");

    let read = document.getElementById("read");
    
    let readText = document.createElement("p");
    readText.textContent = read;

    newRead.append(readText);
  }


  return (
    
    <div id="home">
      
      <h1>Welcome back, Abigail</h1>

      <div id="readingGoals">
        <h1>Today's Reading Goals</h1>
        <hr></hr>
        <input type="text" id="goal"></input>
        <button id="addGoalBtn" onClick={addGoal}>
          Add Goal
        </button>
      </div>


      <div id="currentRead">
        <h1>Currently reading...</h1>
        <button id="addReadBtn" onClick={addRead}>
          Add current read
        </button>
        <input type="text" id="read"></input>
      </div>

      
    </div>
  )
}

export default Home; 