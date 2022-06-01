import './feed.css';
import { getAuth } from "firebase/auth";
import {GetUserProfile, GetUserPosts} from '../backend/Query';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import axios from 'axios';

export default function Feed() {
  return (
    <div className="userFeed">
      <h1>See what's new</h1>

      <div id="posts">
      <h1>Friend Feed</h1>
      <UserPosts/>
      </div>
      
    </div>
  )
}

function UserPosts() {
  const auth = getAuth();
  const user = auth.currentUser;


  if (user !== null){
    const userPosts = GetUserPosts(user.uid)

    return (
      <div className="postDisplay">
                 {userPosts.map((post) => (
                     <DisplayPost
                        //  book_title={post.data.book_title}
                         imageURL={post.data.book_url}
                         contents={post.data.contents}
                         date={post.data.timestamp}

                
                     />
                 ))}
      </div>
    )
  }
}

function DisplayPost(props){
  // getPosts();
  return (
    <>
      <div className="post">
        <h3>Your post:</h3>
          <div className="postInfo">
              <h4>Book: "wakanda forever"</h4>
              <h6>{props.contents}</h6>
          </div>
          <div className="bookImage"> 
          <img
              src={props.imageURL}
              width="130"
              height="180"
              alt=""
          />
          </div>
        </div>
      </>
  );
}

function FeedUpdates() {
  return (
    <div className="updates">

    </div>
  )
}

function FriendFeed() {

  return (
    <div className="friendFeed">
      
    </div>
  )

}