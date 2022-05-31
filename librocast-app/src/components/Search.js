import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {collection, query, onSnapshot, where} from "firebase/firestore"
import axios from 'axios'
import {getAuth} from "firebase/auth";

import './Search.css'

const BOOK_URL = "/api/searchBook/";
const USER_URL = "/api/searchUser/";
const LIB_URL = "/api/getUserByID/";
const ADD_TBR_URL = "/api/addBook/to-be-read/";
const REMOVE_TBR_URL = "/api/removeBook/to-be-read/";
const ADD_READING_URL = "/api/addBook/in-progress/";
const REMOVE_READING_URL = "/api/removeBook/in-progress/";
const ADD_READ_URL = "/api/addBook/completed/";
const REMOVE_READ_URL = "/api/removeBook/completed/";
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
  const [userData, setUserData] = useState({});

  const auth = getAuth();

  //React.useEffect(getUserData, [auth.currentUser.uid]);

  // React.useEffect(() => {getUserData().then(r => );}, []);

  // eslint-disable-next-line
  React.useEffect(processQuery, [searchString, searchType, auth.currentUser.uid]);

  // async function getUserData(keys) {
  //   // let ret = {
  //   //   "to_be_read": [],
  //   //   "reading": [],
  //   //   "read": [],
  //   //   "following": []
  //   // };
  //   let ret = {};
  //   await axios.get(LIB_URL + auth.currentUser.uid)
  //     .then((res) => {
  //       for (let key of keys) {
  //         ret[key] = res.data[key];
  //       }
  //       //setUserData(ret);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   return ret;
  // }

  function processQuery() {
    // TODO: fetch query response
    // TODO: case-user
    // TODO: case-book
    axios.get(LIB_URL + auth.currentUser.uid)
      .then((res) => {
        setUserData(res.data);
        return res.data;
        //setUserData(ret);
      })
      .then ((userInfo) => {
        console.log(userInfo);
        if (searchType === "book") {
          let data = {};
          for (let key of ["bookshelf", "to_be_read", "read"]) {
            data[key] = [];
            for (let id of userInfo[key]["arrayValue"]["values"]) {
              data[key].push(id.stringValue);
            }
          }

          axios.get(BOOK_URL + searchString)
            .then((res) => {
              setResponse(res.data);
              setResults(appendBookResults(res.data, data));
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (searchType === "user") {
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


    })

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

  function appendBookResults(data, param) {
    let res = [];
    if (data.length === 0) {
      res.push(<p>No results</p>)
    } else {
      for (let entry of data) {
        res.push(
          <BookSearchResult key={entry["id"]} bookID={entry["id"]} title={entry["title"]} author={entry["author"]} cover={entry["cover_link"]} userData={param}/>
        );
      }
    }
    return res;
  }

  function appendUserResults(data, param) {
    let res = [];
    if (data.length === 0) {
      res.push(<p>No results</p>)
    } else {
      for (let entry of data) {
        res.push(<UserSearchResult key={entry[0]} userData={entry[1]} followingData={param}/>);
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

function UserSearchResult({userData, followingData}) {
  return (
    <div id={"userSearchResult"}>
      <img alt="profile" src={userData["picture"]["stringValue"]}/>
      <h2>{userData["displayName"]["stringValue"]}</h2>
    </div>
  )
}


function BookSearchResult({bookID, title, author, cover, userData}) {
  const addTBRButton = <button type={"button"} onClick={() => addBook(ADD_TBR_URL, "to_be_read", removeTBRButton)}>Add To be Read</button>;
  const removeTBRButton = <button type={"button"} onClick={() => removeBook(REMOVE_TBR_URL, "to_be_read", addTBRButton)}> Remove To be Read</button>;
  const addReadingButton =  <button type={"button"} onClick={() => addBook(ADD_READING_URL, "bookshelf", removeReadingButton)}>Reading</button>;
  const removeReadingButton =  <button type={"button"} onClick={() => removeBook(REMOVE_READING_URL, "bookshelf", addReadingButton)}>Reading</button>;
  const addReadButton = <button type={"button"} onClick={() => addBook(ADD_READ_URL, "read", removeReadButton)}>Read</button>;
  const removeReadButton = <button type={"button"} onClick={() => removeBook(REMOVE_READ_URL, "read", addReadButton)}>Read</button>;

  // const [id, setId] = useState(bookID);
  const auth = getAuth();
  const userID = auth.currentUser.uid;
  const [buttons, setButtons] = useState(getButtons());

  function getButtons() {
    let ret = {};
    //console.log(userData);
    if (userData["to_be_read"]?.includes(bookID)) {
      ret["to_be_read"] = removeTBRButton;
    } else {
      ret["to_be_read"] = addTBRButton;
    }

    if (userData["bookshelf"]?.includes(bookID)) {
      ret["bookshelf"] = removeReadingButton;
    } else {
      ret["bookshelf"] = addReadingButton;
    }

    if (userData["read"]?.includes(bookID)) {
      ret["read"] = removeReadButton;
    } else {
      ret["read"] = addReadButton;
    }

    // if (userData["to_be_read"].hasOwnProperty(bookID)) {
    //   ret["to_be_read"] = removeTBRButton;
    // } else {
    //   ret["to_be_read"] = addTBRButton;
    // }
    // if (userData["bookshelf"].hasOwnProperty(bookID)) {
    //   ret["bookshelf"] = removeReadingButton;
    // } else {
    //   ret["bookshelf"] = addReadingButton;
    // }
    // if (userData["read"].hasOwnProperty(bookID)) {
    //   ret["read"] = addReadButton;
    // } else {
    //   ret["read"] = removeReadButton;
    // }
    return ret;
  }

  function addBook(URL, key, button) {
    axios.post(URL + userID + "/" + bookID, {
      userID: userID,
      bookID: bookID
    })
      .then((res) => {
        setButtons(prevButton => ({...prevButton, [key]:button}));
      })
      .catch((err) => {
        console.log(err);
      });

  }

  function removeBook(URL, key, button) {
    axios.delete(URL + userID + "/" + bookID, {
      userID: userID,
      bookID: bookID
    })
      .then((res) => {
        setButtons(prevButton => ({...prevButton, [key]:button}));
      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (
    <div id={"bookSearchResult"}>
      <h3>{title}</h3>
      <img src={cover} alt={"Book cover"}/>
      <h4>{author}</h4>
      {Object.values(buttons)}
    </div>
  )
}


