import './App.css'
import dune from './dune.png';


function Home() {
  function addGoal() {
    let newGoal = document.createElement("div");

    let goal = document.getElementById("goal").value;

    let goalText = document.createElement("p");
    goalText.textContent = "1. " + goal;

    newGoal.appendChild(goalText);

    let goalContainer = document.getElementById("readingGoals");

    goalContainer.appendChild(newGoal);
  }

  function addRead() {
    let newRead = document.createElement("div");

    let read = document.getElementById("read").value;
    let author = document.getElementById("author").value;
    let currentPage = document.getElementById("pages").value;
    
    let readText = document.createElement("p");
    readText.textContent = "Title: " + read;

    let authorText = document.createElement("p");
    authorText.textContent = "Author: " + author;

    let pageText = document.createElement("p");
    pageText.textContent = "Current page progress: " + currentPage + "/800";


    // SAMPLE DATA for now
    let bookImg = document.createElement("img");
    bookImg.src = "https://images-na.ssl-images-amazon.com/images/I/81ym3QUd3KL.jpg"
    bookImg.style.width = "100px";
    bookImg.style.height = "200px";

    newRead.appendChild(bookImg);
    newRead.appendChild(readText);
    newRead.appendChild(authorText);
    newRead.appendChild(pageText);

    let readsContainer = document.getElementById("readsContainer");

    newRead.style.margin = "40px";

    readsContainer.appendChild(newRead);
  }


  return (
    <div id="App">

      <h1>Welcome back, Name!</h1>
      

      <div id="readingGoals">
        <h1>Today's Reading Goals</h1>
        <hr></hr>

        <h3>Enter your goal</h3>
        <input type="text" id="goal"></input>
        
        <button id="addGoalBtn" onClick={addGoal}>
          Add Goal
        </button>

        <div id="goalsContainer">
          <h3>Goals:</h3>
        </div>
      </div>


      <div id="currentRead">
        <h1>Currently reading...</h1>

        <h3>Enter your current read</h3>


        <div>
          <h3>Title: </h3>
          <input type="text" id="read"></input>
        </div>
        

        <div>
          <h3>Author: </h3>
          <input type="text" id="author"></input>
        </div>


        <div>
          <h3>Current Page: </h3>
          <input type="text" id="pages"></input>
        </div>



        <button id="addReadBtn" onClick={addRead}>
          Add current read
        </button>


        


        <div id="readsContainer">
          <h3>Current Read:</h3>
        </div>
      </div>

      
    </div>
  )
}

export default Home; 
