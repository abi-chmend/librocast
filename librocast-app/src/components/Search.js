import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {getAuth} from "firebase/auth";

import defaultProfile from './librocast_logo.png';

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
const FOLLOW_URL = "/api/follow/";
const UNFOLLOW_URL = "/api/unfollow/";

//const NUM_PAGE_RESULTS = 5;

export default function Search() {
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
  const [results, setResults] = useState([]);

  const auth = getAuth();

  // eslint-disable-next-line
  React.useEffect(processQuery, [searchString, searchType, auth.currentUser.uid]);

  function processQuery() {
    axios.get(LIB_URL + auth.currentUser.uid)
      .then((res) => {
        return res.data;
      })
      .then ((userInfo) => {
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
              setResults(appendBookResults(res.data, data));
            })
            .catch((err) => {
              console.log(err);
            });

        } else if (searchType === "user") {
          let data = {};
          for (let key of ["following"]) {
            data[key] = [];
            for (let entry of userInfo[key]["arrayValue"]["values"]) {
              data[key].push(entry.stringValue);
            }
          }

          axios.get(USER_URL + searchString)
            .then((res) => {
              setResults(appendUserResults(res.data, data));
            })
            .catch((err) => {
              console.log(err);
            });
        }


    })

  }

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
        res.push(<UserSearchResult key={entry[0]} targetID={entry[0]} targetData={entry[1]} followingData={param}/>);
      }
    }
    return res;

  }

  return (
    <div id={"resultsContainer"}>
      {results}
    </div>
  );
}

function UserSearchResult({targetID, targetData, followingData}) {
  const followButton = <button type={"button"} onClick={followUser}>Follow</button>
  const unfollowButton = <button type={"button"} onClick={unfollowUser}>Unfollow</button>

  const auth = getAuth();
  const userID = auth.currentUser.uid;
  const [button, setButton] = useState(getButtons());

  function getButtons() {
    if (targetID === userID) {
      return <p>Its you!</p>

    }
    if (followingData["following"]?.includes(targetID)) {
      return unfollowButton;
    } else {
      return followButton;
    }
  }

  function followUser() {
    axios.post(FOLLOW_URL + userID + "/" + targetID, {
      userID: userID,
      targetUserID: targetID
    })
      .then((res) => {
        setButton(unfollowButton);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  function unfollowUser() {
    axios.delete(UNFOLLOW_URL + userID + "/" + targetID, {
      userID: userID,
      targetUserID: targetID
    })
      .then((res) => {
        setButton(followButton);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id={"userSearchResult"}>
      <Link to={"/search/profile=" + targetID} className={"profileLink"}>
        <img alt="profile" src={targetData["picture"]["stringValue"] === "default" ? defaultProfile: targetData["picture"]["stringValue"]}/>
        <h2>{targetData["displayName"]["stringValue"]}</h2>
      </Link>
      {button}
    </div>
  )
}


function BookSearchResult({bookID, title, author, cover, userData}) {
  const addTBRButton = <button type={"button"} onClick={() => addBook(ADD_TBR_URL, "to_be_read", removeTBRButton)}>Add To be Read</button>;
  const removeTBRButton = <button type={"button"} onClick={() => removeBook(REMOVE_TBR_URL, "to_be_read", addTBRButton)}> Remove To be Read</button>;
  const addReadingButton =  <button type={"button"} onClick={() => addBook(ADD_READING_URL, "bookshelf", removeReadingButton)}>Add Reading</button>;
  const removeReadingButton =  <button type={"button"} onClick={() => removeBook(REMOVE_READING_URL, "bookshelf", addReadingButton)}>Remove Reading</button>;
  const addReadButton = <button type={"button"} onClick={() => addBook(ADD_READ_URL, "read", removeReadButton)}>Add Read</button>;
  const removeReadButton = <button type={"button"} onClick={() => removeBook(REMOVE_READ_URL, "read", addReadButton)}>Remove Read</button>;

  const auth = getAuth();
  const userID = auth.currentUser.uid;
  const [buttons, setButtons] = useState(getButtons());

  function getButtons() {
    let ret = {};
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


