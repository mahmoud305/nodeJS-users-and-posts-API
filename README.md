# nodeJS-users-and-posts-API
nodeJS users and posts API using mysql sequelize 

## how to run : download the code open it with your editor (ex: VScode) open terminal then run (npm install) to download the modules file.

### the DataBase contain two tables which are :
#### -Users ( id , fristName, lastName,email , password ).
#### -Posts ( postid, created by = userid , title, content).
#### The Api Provides Endpoints for : 
 
  1. Add User.
  2. update user by id.
  3. delete user by id .
  4. create post by specific user .
  5. update post by id ( the owner of the post only can update it ).
  6. delete post by id (the owner of the post only can delete it ).
  7. get posts with their owner info.
  8. one Endpoint checks the query if the querykey is:
     - (id)==> get user by id with his posts (using include).
     - (searchkey) ==> Get all users that their fistName or lastName contain the search key.
     - otherwise, get all users with their posts (using include).

##### for any comment , feedback or question you can *contact with me at* __ma5027300@gmail.com__
