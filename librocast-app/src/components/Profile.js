import React, {useState} from 'react'
import "./profile.css"
import { getAuth } from "firebase/auth";
import {GetUserProfile, GetUserPosts} from '../backend/Query'
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import axios from 'axios'

// this keeps track of input image file
var file = null;
var profileF = null;
const BOOK_URL = "/api/getBookByID/";

// User function will receive user properties (username, bio, followers, following, books read)
export default function Profile(){

  return (
    <>
    <div className="Profile">
      <div className="profileWrapper">
          <ProfileInfo/>
          <AddPost/>
          <EditProfile/>
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
        // console.log(user.uid)
        // console.log(userPosts.toString())
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
                     bio={profile.data.bio}
                 />
             ))}

             <div className="postDisplay">
                 {userPosts.map((post) => (
                     <DisplayPost
                         imageURL={post.data.book_url}
                         contents={post.data.contents}
                         date={post.data.timestamp}
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
            <div className="displayName">
                <h1>{props.displayName}</h1>
            </div>
            <DisplayMetrics
                bookshelf={props.bookshelf}
                followers={props.followers}
                following={props.following}
                bio={props.bio}
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
    const bio = props.bio
    return (
        <div className="flex-child">
            <h1>{numFollowers}&emsp;&emsp;{numFollowing}&emsp;&emsp;{booksRead}</h1>
            <p>Followers&emsp;Following&emsp;Books read</p>
            <h5>{bio}</h5>
        </div>
    );
}

function DisplayPost(props){
    // getPosts();
    return (
      <>
        <div className="post">
          <h3>Your post:</h3>

            <div className="bookImage"> 
            <img
                src={props.imageURL}
                width="130"
                height="180"
                alt=""
            />
            </div>
                <div className="postInfo">
                    <h7>{props.contents}</h7>
                </div>
            </div>
        </>
    );
}

function getPosts() {
    // Get post from database and display in DisplayPost component
    let postDiv = document.getElementsByClassName("post");
    const auth = getAuth();
    const user = auth.currentUser;

    // axios.get("/api/readPosts/" + user.uid )
    //     .then(function(response) {
    //         console.log(response);
    //     }).catch(function (err) {
    //         //console.error(err);
    //     });
    
    // get post image, and caption
    let postImg = document.createElement("img");

    let postCaption = document.createElement("p");


    let newPost = document.createElement("div");

    newPost.appendChild(postImg);
    newPost.appendChild(postCaption);
}


function DisplayBookshelf(props){

        const [bookshelf, setBookshelf] = useState([]);

        React.useEffect(()=>{
            let books = []
            let promises = []
            props.bookshelf.forEach((bookID) => (
                promises.push(axios.get(BOOK_URL + bookID)
                    .then((res) => {
                        books.push(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    }))
            ))

            Promise.all(promises).then(() => {
                setBookshelf(books);
            })

        }, [props.bookshelf])



    return (
        <div className="bookshelf">
            <h2>Bookshelf</h2>
            {bookshelf.map((book, index) => (
                <div className="book">
                    <img
                        src={book.data.imageURL.stringValue}
                        width="115"
                        height="160"
                        alt=""
                    />
                    <h5>{book.data.title.stringValue}</h5>
                </div>
            ))}
        </div>
    );
}

function AddPost(props) {
    return (
        <div className="addPost">

            <h2>Add new post here</h2>

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

function EditProfile(props) {
    return (
        <div className="addPost">
            <h2>Edit Profile</h2>
            <form>
                <p>Enter new profile picture here</p>
                <input type="file" id="profile-input" accept="image/jpeg, image/png, image/jpg"
                 onClick={selectImagePrf}></input>
                <div id="prf-container"></div>
                <button id="submit-btn" onClick={onSubmitPfp}>Submit Profile Picture</button>

                <p>Enter new bio here</p>
                <input type="text" id="bio"></input>

                <button id="submit-btn" onClick={onSubmitBio}>Submit New Bio</button>
            </form>
        </div>
    )
}

// on submit for editing send profile request to edit profile picture
const onSubmitPfp = (e) => {
    // prevent refresh for debugging
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    const storage = getStorage();
    const storageRef = ref(storage, profileF.name);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, profileF).then((snapshot) => {
        // get URL for uploaded file 
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            // request server to post
            axios.post("api/editProfilePicture/" + user.uid + "/&url=" + encodeURIComponent(downloadURL));
        });
    }).catch((err) => {
      console.error(err);    
    });
}

// on submit for editing send profile request to edit bio
const onSubmitBio = (e) => {
    const auth = getAuth();
    const user = auth.currentUser;
    let bio = document.getElementById("bio").value;
    axios.post("api/editBio/" + user.uid + "/" + bio);
}

// on submit send post request for post information
const onSubmit = (e) => {
    e.preventDefault();

    // this might be redundant...
    const auth = getAuth();
    const user = auth.currentUser;

    const storage = getStorage();
    const storageRef = ref(storage, file.name);

    let caption = document.getElementById("caption").value;
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        // get URL for uploaded file 
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            // request server to post
            axios.post("api/newPost/" + user.uid + "/&url=" + encodeURIComponent(downloadURL) + "/" + caption);
        });
    }).catch((err) => {
      console.error(err);    
    });
}

function showPost(imgSrc, caption) {
    let postDiv = document.querySelector(".post");

    let postImg = document.createElement("img");
    postImg.src = imgSrc;

    let postCaption = document.createElement("p");
    postCaption.textContent = caption

    let newPost = document.createElement("div");

    newPost.appendChild(postImg);
    newPost.appendChild(postCaption);

    postDiv.appendChild(newPost);
}

function selectImage() {
    const image_input = document.querySelector("#image-input");
    image_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.querySelector("#img-container").style.backgroundImage = `url(${uploaded_image})`;
    });
    file = this.files[0];

    // read file into image container
    reader.readAsDataURL(file);
    });
}

function selectImagePrf() {
    const image_input = document.querySelector("#profile-input");
    image_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.querySelector("#prf-container").style.backgroundImage = `url(${uploaded_image})`;
    });
    profileF = this.files[0];

    // read file into image container
    reader.readAsDataURL(profileF);
    });
}
