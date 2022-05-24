import { db, admin } from "../firestore";
import { firestore } from "firebase-admin";
import results from "../data/csvParser";

// Add post
export const newPost = async (req, res) => {
  const { userID, book_id, contents } = req.params;
  // const book = results.filter((o) => {return o.id === book_id});
  //try{
      const result = await db.collection('posts').add({
          book_id : book_id,
          contents : contents,
          user_id : userID,
          timestamp: firestore.Timestamp.now()
          //book_title : book.title,
          //book_img : book.cover_link
     });
    res.send("Added document with ID: " + result.id);
 // } catch (err) {
      // alert(err)
   //   res.send("err: ");
  //}
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
    post.update({
      comments: {userID : contents}
    });
    res.send(userID + " likes " + post_id);
  }
};