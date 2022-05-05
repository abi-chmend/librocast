import next from './next_btn.png';
import { useState } from 'react';


function Onboard() {


  

  // setup state hooks for next button
  const [count, setCount] = useState(0);

  function nextClicked() {
    setCount(count+1);

    let question = document.getElementById("question");
    if (count == 0) {
      let midBtn = document.getElementById("mid");
      midBtn.style.backgroundColor = "#0F4B4E";

      let leftBtn = document.getElementById("left");
      leftBtn.style.backgroundColor = "#bbb";

      question.textContent = "What are your top 3 goals?";
      
    } else if (count == 1) {
      let midBtn = document.getElementById("mid");
      midBtn.style.backgroundColor = "#bbb";

      let rightBtn = document.getElementById("right");
      rightBtn.style.backgroundColor = "#0F4B4E";


      question.textContent = "What are your top 3 genres?";
    } else if (count == 2) {
      // navigate to home on final click
      window.location.href = "/home";
    } else {
      return;
    }

  }

  return (
          
  <div className='circlesContainer'>
        <p>You clicked {count} times</p>

          <h1 id="question">What is your name?</h1>
          <input type="text" id="uinfo" name="uinfo"></input>
          <div>
          <img id="nextBtn" src={next} onClick={nextClicked}></img>
          </div>
          <span id="left" className="dot"></span>
          <span id="mid" className="dot"></span>
          <span id="right" className="dot"></span>   
        </div>
  )
      
  }

export default Onboard;