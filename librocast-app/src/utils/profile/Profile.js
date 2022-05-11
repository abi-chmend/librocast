import React from "react";
import "./profile.css"
import { getAuth } from "firebase/auth";
import {useState, useEffect} from 'react'
import {collection, query, where, onSnapshot} from "firebase/firestore"
import {db} from '../../utils/firebase.js'
//import Nav from "./components/Nav"

// User function will receive user properties (username, bio, followers, following, books read)
export default function Profile(){

  return (
    <>
    {/* <Nav/> */}
      <div className="profileWrapper">
          <ProfileInfo/>
      </div>
    </>
  );
}

function ProfileInfo() {
    const auth = getAuth();
    const user = auth.currentUser;

    // store matching user profile
    const [userProfile, setUserProfile] = useState([])

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        const userID = user.uid;
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
        const auth = getAuth();
        const user = auth.currentUser;
        const userID = user.uid;
        const taskColRef = query(collection(db, 'posts'), where("user_id", "==", userID))
        onSnapshot(taskColRef, (snapshot) => {
            setUserPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    },[])


    if (user !== null) {
         return (
         <div className="profileInfo">
             {userProfile.map((profile) => (
                 <DisplayProfile
                     id={profile.id}
                     displayName={profile.data.displayName}
                     bookshelf={profile.data.bookshelf}
                     followers={profile.data.followers}
                     following={profile.data.following}
                     achievements={profile.data.goals}
                     picture={profile.data.picture}
                 />
             ))}

             <div className="postDisplay">
                 <h2>Posts</h2>
                 {userPosts.map((post) => (
                     <DisplayPost
                         book_title={post.data.book_title}
                         contents={post.data.contents}
                         date={post.data.dates}
                         likes={post.data.likes}
                     />
                 ))}
             </div>
         </div>
         );


    } else {
        return (
            <p>You ain't logged in pardner!</p>
        );
    }
}
function DisplayProfile(props) {
    return (
        <div className="profile">
            <h1>{props.displayName}</h1>
            <p>Avid reader of fantasy novels</p>
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
    const booksRead = props.bookshelf.length
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
            <div className="postInfo">
                <h4>{props.book_title}</h4>
                <h4>{props.contents}</h4>
            </div>
            <img
                src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1423848167l/22294935.jpg"
                width="130"
                height="180"
                alt=""
            />
        </div>
    );
}

function DisplayBookshelf(props){

    return (
        <div className="bookshelf">
            <h2>Bookshelf</h2>
            {props.bookshelf.map((item, index) => (
                <div className="book">
                    <img
                        src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1423848167l/22294935.jpg"
                        width="115"
                        height="160"
                        alt=""
                    />
                    <h4>{item.book_title}</h4>
                </div>
            ))}
        </div>
    );
}