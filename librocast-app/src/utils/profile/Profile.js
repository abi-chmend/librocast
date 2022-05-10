import React from "react";
import "./profile.css"
import { getAuth } from "firebase/auth";
import {useState, useEffect} from 'react'
import {collection, query, where, onSnapshot} from "firebase/firestore"
import {db} from 'librocast-app/src/backend/src/firebase'
//import Nav from "./components/Nav"

// User function will receive user properties (username, bio, followers, following, books read)
export default function Profile(){

  return (
    <>
    {/* <Nav/> */}
      <div className="profileWrapper">
          {getProfileInfo}
      </div>
    </>
  );
}


function getProfileInfo() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user !== null) {
    const userID = user.uid;

    // store matching user profile
    const [userProfile, setUserProfile] = useState([])

    useEffect(() => {
      const taskColRef = query(collection(db, 'profile'), where("__name__", "==", userID))
      onSnapshot(taskColRef, (snapshot) => {
          setUserProfile(snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
          })))
      })
    },[])

    // store matching user posts
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
      const taskColRef = query(collection(db, 'posts'), where("user_id", "==", userID))
      onSnapshot(taskColRef, (snapshot) => {
          setUserPosts(snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
          })))
      })
    },[])

    return (
        <div className="profileInfo">
          <h1>{user.displayName}</h1>
          <p>Avid reader of fantasy novels</p>
            {userProfile.map((profile) => (
                <DisplayProfile
                    id={profile.id}
                    bookshelf={profile.data.bookshelf}
                    followers={profile.data.followers}
                    following={profile.data.following}
                    achievements={profile.data.goals_progress}
                    picture={profile.data.picture}
                />
            ))}
            <div className="posts"
                {userPosts.map((post) => (
                    <DisplayPost
                        book_title={post.data.book_title}
                        contents={post.data.contents}
                        date={post.data.dates}
                        likes={post.data.likes}
                    />
                ))}
            />

        </div>
    );
  } else {
    return (
        <div className="profileInfo">
          <p>You ain't logged in pardner!</p>
        </div>
    );
  }
}
function DisplayProfile(props) {
    return (
        <div className="profile">
            <DisplayPicture picture={props.picture}/>
            <DisplayMetrics
                bookshelf={props.bookshelf}
                followers={props.followers}
                following={props.following}
            />
            <DisplayBookshelf bookshelf={props.bookshelf}/>
        </div>

    );
}
function DisplayPicture(props) {
  return (
      <div className="profilePic">
        <img
            src={props.picture}
            width="130"
            height="130"
            alt=""
        />
      </div>
  );
}
function DisplayMetrics(props) {
  const numFollowers = props.followers.length
  const numFollowing = props.following.length
  const booksRead = props.bookshelf.size
  return (
      <div className="followers">
        <h1>{numFollowers}&emsp;{numFollowing}&emsp;{booksRead}</h1>
        <p>Followers&emsp;Following&emsp;Books read</p>
      </div>
  );
}

function DisplayPost(props){
  return (
    <div className="post">
    </div>
  );
}

function DisplayBookshelf(props){

  return (
    <div className="bookshelf">
        {props.bookshelf.forEach((unknown, bookID) => (
            <div className="book"/>
        ))}
    </div>
  );
}
