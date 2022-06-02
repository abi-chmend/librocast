# Week 10 Status Report

- Team report

  1. Goals from the last week

     - Fix failing tests
     - User authentication
     - Add more tests
     - Functionality (front and backend) to allow users to add books and view their library
     - Add additional functionalities for the final release
     - Add more tests for recently added functionalities
     - Effectively use trello and slack for our communication tool

  2. This week, our team finished our core features for the final release. We completed individual components and made sure that both the frontend and backend reacted correctly in response to each other.
  We also worked on fixing tests and doing our presentation/demo. 
  
  3. Success and issues: we successfully completed core features and have a function app. We still have some issues with tests that we were unable to figure out

- Contributions of individual team members

  - Abigail Batinga

    1. Goals from the last week:
      - add the feed page
      - have the ability to add posts on profile
 
  2. This week, I completed the ability to add posts and added the feed page. 


  - Justin Chao
    1. Goals from last week
      - Merge Firebase files (there's 3!)
      - Combine queries with CSV queries
      - Check if queries can be optimized better
    2. Firebase files got merged, added twitch functionality, bookshelf display functionality, post display functionality.
    3. Things are good
  - Tommy Chung

    1. Goals from the last week
     - Implement React component to read and write database in Firebase.
     - Add database to Firebase
     - Convert book data to Firebase

    2. In this week, I worked on debugging authentication feature. I fixed failing tests and started to work on implementing putting post data to database which is given from the frontend. 
    3. Goals: Implement backend for add post

  - Alyssa Allums

    1. Goals from the last week:

    - User search
    - Add search tests

    2. This week I added user search, added the ability to add and remove books from the bookshelf, and follow and unfollow users. 
    3. Success and issues: Overall we successfully finished the core features. One open issue is last minute changes causing tests to run forever.
    

  - Sarah Rashid

    1. Last week's goals:

    - Allow for adding posts
    - Allow for editing profile
    - Other profile views

    2. In this week, I have been working on the ui for adding posts. A user will be able to add a post about a book their reading with a caption and their progress through their profile page.
    3. Goals:
      - connect front end to backend for adding posts, make available in master
      - other profile views

  - Kihoon Lee
    1. Last week's goals:
       - Finalize the API endpoints so frontend team can finalize their part
       - Store the book data to database so it can be more accessible 
    2. For this week, I finalized the api endpoints so it can be easily used by frontend team. Additionally, I eventually stored all of book data to the database so we can directly request to the server regarding the book data rather than reading the local csv data.
    3. Everything looks good except for tests. All of our tests pass but the test runs forever, which is the reason our CI also fails. We could not figure out the problem in the given time.
