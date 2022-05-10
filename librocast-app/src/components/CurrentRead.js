import './App.css'
import dune from './dune.png';

function CurrentRead(props) {
  return (
    <div id="currentRead">

      <div id="addBtn">
        <button>Add current read</button>
      </div>
      


      <h1>Currently reading...</h1>

      <div id="book">
        <img src={dune} />
      </div>


     
      <div id="bookDesc">
        <h1>Dune</h1>

        <h2>Frank Herbert</h2>

        <h2>Started: date</h2>
      </div>


    </div>
  )
}

export default CurrentRead; 