import React from "react";
import "./profile.css"
import { getAuth } from "firebase/auth";
import {GetUserProfile, GetUserPosts} from '../backend/Query'

// User function will receive user properties (username, bio, followers, following, books read)
export default function Profile(){
  return (
    <>
    <div className="Profile">
      <div className="profileWrapper">
          <ProfileInfo/>
          <AddPost/>
      </div>
      
    </div>
    </>
  );
}

function ProfileInfo() {

    const auth = getAuth();
    const user = auth.currentUser;


    if (user !== null) {
        const userProfile = GetUserProfile(user.uid)
        const userPosts = GetUserPosts(user.uid)
         return (
         <div className="flex-child">
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
            <div>You ain't logged in pardner!</div>
        );
    }
}
function DisplayProfile(props) {
    return (
      <>
        <div className="profileInfo-container">
          <DisplayPicture picture={props.picture}/>
            <h1>{props.displayName}</h1>
            <DisplayMetrics
                bookshelf={props.bookshelf}
                followers={props.followers}
                following={props.following}
            />
        </div>
        <DisplayBookshelf bookshelf={props.bookshelf}/>
      </>
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
        <div className="flex-child">
            <h1>{numFollowers}&emsp;&emsp;{numFollowing}&emsp;&emsp;{booksRead}</h1>
            <p>Followers&emsp;Following&emsp;Books read</p>
        </div>
    );
}

function DisplayPost(props){
    return (
      <>
        <div className="post">
          <h3>Your post:</h3>
            <div className="postInfo">
                <h4>Book: {props.book_title}</h4>
                <h7>{props.contents}</h7>
            </div>
            <div className="bookImage"> 
            <img
                src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1423848167l/22294935.jpg"
                width="130"
                height="180"
                alt=""
            />
            </div>
          </div>
        </>
    );
}

function DisplayBookshelf(props){
    return (
        <div className="bookshelf">
            <h2>Bookshelf</h2>
            {props.bookshelf.map((book, index) => (
                <div className="book">
                    <img
                        src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1423848167l/22294935.jpg"
                        width="115"
                        height="160"
                        alt=""
                    />
                    <h7>{book.book_title}</h7>
                </div>
            ))}
        </div>
    );
}

function AddPost(props) {
    return (
        <div className="addPost">

            <h1>Add new post here</h1>

            <form>
                <p>Enter image here</p>
                <input type="file" id="image-input" accept="image/jpeg, image/png, image/jpg"
                 onClick={selectImage}></input>
                <div id="img-container"></div>


                <p>Enter caption here</p>
                <input type="text" id="caption"></input>

                <button id="submit-btn" onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

function onSubmit() {
    // on submit send post request for post information
    
}

function selectImage() {
    const image_input = document.querySelector("#image-input");
    image_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.querySelector("#img-container").style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
    });

}
