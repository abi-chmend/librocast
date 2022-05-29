import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {collection, query, onSnapshot, where} from "firebase/firestore"
import axios from 'axios'
import {getAuth} from "firebase/auth";

import './Search.css'

const BOOK_URL = "/api/searchBook/";
const USER_URL = "/api/searchUser/";
//const USER_URL = "";
//const NUM_PAGE_RESULTS = 5;

export default function Search() {
  //const [query, setQuery] = useState("");
  const url = new URLSearchParams(window.location.search);

  //check for properly formatted url
  if (url.has("type") && url.has("string")) {
    const type = url.get("type");
    const string = url.get("string");
    // TODO: filter out unnecessary params
    return (
      <div>
        <SearchBar type={type} string={string}/>
        <QueryResults searchType={type} searchString={string}/>
      </div>
    );
  } else if (window.location.search !== "") {
    window.location = window.location.pathname;
  } else {
    return (
      <div>
        <SearchBar type={"book"} string={""}/>
      </div>
    );
  }

}

function SearchBar({type, string}) {
  const [searchInput, setSearchInput] = useState(string);
  const [searchType, setSearchType] = useState(type);
  //const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: make sure searchInput is empty or not white space
    let url = new URLSearchParams();
    url.append("type", searchType.toString());
    url.append("string", searchInput.toString());
    window.location.href = "?" + url.toString();
  }

  function handleChange(e) {
    setSearchInput(e.target.value);
    // TODO:if searchInput is empty or white space make search button grey
  }

  function updateType(e) {
    setSearchType(e.target.value);
  }

  return (
    //<label htmlFor="site-search">Search the site</label>
    <form className={"searchBar"} onSubmit={handleSubmit}>

      <select className={"searchType"} name="type" value={searchType.toString()} onChange={updateType}>
        <option value="book">Books</option>
        <option value="user">Users</option>
      </select>
      <input className={"searchInput"} type="search" placeholder="search" value={searchInput} onChange={handleChange}/>
      <input className={"searchButton"} type="Submit" Value="Search"/>
    </form>
  );
}

function QueryResults({searchType, searchString}) {
  const [response, setResponse] = useState([]);
  const [results, setResults] = useState([]);
  //const [responseLength, setResponseLength] = useState(0);
  //const [index, setIndex] = useState(0);
  const [showing, setShowing] = useState([]);

  React.useEffect(processQuery, [searchString, searchType]);


  function processQuery() {
    // TODO: fetch query response
    // TODO: case-user
    // TODO: case-book
    if (searchType === "book") {
      //TODO: fetch books
      //set response state

      axios.get(BOOK_URL + searchString)
        .then((res) => {
            setResponse(res.data);
            setResults(appendBookResults(res.data));
            console.log(res.data);
          })
        .catch((err) => {
          console.log(err);
        });
    } else if (searchType === "user") {
      //TODO: fetch users
      //set response state

      axios.get(USER_URL + searchString)
        .then((res) => {
          setResponse(res.data);
          setResults(appendUserResults(res.data));
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // function appendResults() {
  //   let count;
  //   let res = [];
  //   res.push(results);
  //   if (index + NUM_PAGE_RESULTS <= response.length) {
  //     count = NUM_PAGE_RESULTS;
  //   } else {
  //     count = response.length - index;
  //   }
  //   for (let i = 0; i < count; i++) {
  //     let entry = response[i];
  //     res.push(
  //       <BookSearchResult bookID={entry["id"]} title={entry["title"]} author={entry["author"]} cover={entry["cover_link"]}/>
  //     );
  //   }
  //   setIndex(index + count);
  //   setResults(res);
  // }

  function appendBookResults(data) {
    let res = [];
    if (data.length === 0) {
      res.push(<p>No results</p>)
    } else {
      for (let entry of data) {
        res.push(
          <BookSearchResult key={entry["id"]} bookID={entry["id"]} title={entry["title"]} author={entry["author"]} cover={entry["cover_link"]}/>
        );
      }
    }
    return res;
  }

  function appendUserResults(data) {
    let res = [];
    if (data.length === 0) {
      res.push(<p>No results</p>)
    } else {
      for (let entry of data) {
        res.push(<UserSearchResult key={entry[0]} userData={entry[1]}/>);
      }
    }
    return res;

  }


  // function appendResults(data) {
  //   let res = [];
  //   let index;
  //   results.length + NUM_PAGE_RESULTS < data.length ? index = NUM_PAGE_RESULTS : index = results.length;
  //   for (let i = results.length; i < index; i++) {
  //     let entry = data[i];
  //     res.push(
  //       <BookSearchResult key={entry["id"]} bookID={entry["id"]} title={entry["title"]} author={entry["author"]} cover={entry["cover_link"]}/>
  //     );
  //   }
  //   return results.concat(res);
  // }

  // function incrementResults(data) {
  //   let count;
  //   if (index + NUM_PAGE_RESULTS <= data.length) {
  //     count = NUM_PAGE_RESULTS;
  //   } else {
  //     count = data.length - index;
  //   }
  //   setShowing(results.slice(index+count));
  //   setIndex(index+count);
  // }

  // function handleClick() {
  //   setResults(appendResults(response));
  // }

  return (
    //<button type={"button"} onClick={handleClick}>More</button>
    <div id={"resultsContainer"}>
      {results}
    </div>
  );
}

function UserSearchResult({userData}) {
  return (
    <div id={"userSearchResult"}>
      <img alt="profile" src={userData["picture"]["stringValue"]}/>
      <h2>{userData["displayName"]["stringValue"]}</h2>
    </div>
  )
}


function BookSearchResult({bookID, title, author, cover}) {
  const addButton = <button type={"button"} onClick={addToLibrary}>Add Book</button>;
  const moveButton = <button type={"button"} onClick={addToLibrary}>Add Book</button>;
  const addTBRButton = <button type={"button"} onClick={addTBR}>To be Read</button>;
  const addReadingButton =  <button type={"button"} onClick={addReading}>Reading</button>;
  const addReadButton = <button type={"button"} onClick={addRead}>Read</button>;

  const [id, setId] = useState(bookID);
  const auth = getAuth();
  const user = auth.currentUser;
  const [buttons, setButtons] = useState(<button type={"button"} onClick={addToLibrary}>Add Book</button>);



  function addToLibrary() {
    //TODO: add book to users library
    setButtons(<div>{addTBRButton}{addReadingButton}{addReadButton}</div>)

  }

  function addTBR() {
    setButtons(<p>This feature is a work in progress. You will be able to add books soon.</p>);
  }
  function addReading() {
    setButtons(<p>This feature is a work in progress. You will be able to add books soon.</p>);

  }
  function addRead() {
    setButtons(<p>This feature is a work in progress. You will be able to add books soon.</p>);
  }


  return (
    <div id={"bookSearchResult"}>
      <h3>{title}</h3>
      <img src={cover} alt={"Book cover"}/>
      <h4>{author}</h4>
      {buttons}
    </div>
  )
}


