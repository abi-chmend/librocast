import { db, admin } from "../firestore";
import { firestore } from "firebase-admin";
import results from "../data/csvParser";

// Add post
export const newPost = async (req, res) => {
  const { userID, book_url, contents } = req.params;
  // const book = results.filter((o) => {return o.id === book_id});
  var book = book_url;
  book = book.slice(5);
  try{
      const result = await db.collection('posts').add({
          book_url : book,
          contents : contents,
          user_id : userID,
          timestamp: firestore.Timestamp.now()
     });
    res.send("Added document with ID: " + result.id);
  } catch (err) {
    res.send("err: ");
  }
};

// Likes post
export const addLikes = async (req, res) => {
  const { userID, post_id } = req.params;
  let post = await db.collection("posts").doc(post_id).get();
  if (!post.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else {
    post = await db.collection("posts").doc(post_id);
    post.update({
      likes: FieldValue.increment(1)
    });
    res.send(userID + " likes " + post_id);
  }
};

// Add comments
export const addComments = async (req, res) => {
  const { userID, post_id, contents } = req.params;
  let post = await db.collection("posts").doc(post_id).get();
  if (!post.exists) {
    res.send("post_id: " + post_id + " does not exist");
  } else {
    post = await db.collection("posts").doc(post_id);
    post.set({comments : {[userID] : contents}} , {merge: true});
    res.send(userID + " likes " + post_id);
  }
};

// Read posts
export const readPosts = async (req, res) => {
  const { userID } = req.params;

  const postRef = db.collection('posts');

  const snapshot = await postRef.where('user_id', '==', userID).get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    res.json([]);
    return;
  }

  snapshot.forEach(doc => {
    console.log(doc.contents, '=>', doc.data());
  });
  res.send(doc);
};