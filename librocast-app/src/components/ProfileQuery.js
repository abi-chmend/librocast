import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom'
import "./profileQuery.css"
import {GetUserProfile, GetUserPosts} from '../backend/Query'

// User function will receive user properties (username, bio, followers, following, books read)
export default function ProfileQuery(){
    return (
        <>
            <div className="ProfileQuery">
                <div className="profileQueryWrapper">
                    <ProfileInfo/>
                </div>
            </div>
        </>
    );
}

function ProfileInfo() {
    let {id} = useParams();
    const userProfile = GetUserProfile(id)
    const userPosts = GetUserPosts(id)

    return (
        <div className="flex-child">
            {userProfile.length > 0 ?
                userProfile.map((profile) => (
                <DisplayProfile
                    id={profile.id}
                    displayName={profile.data.displayName}
                    bookshelf={profile.data.bookshelf}
                    followers={profile.data.followers}
                    following={profile.data.following}
                    achievements={profile.data.goals}
                    picture={profile.data.picture}
                />
                )) :
            <div>No users found matching {id}</div>}

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