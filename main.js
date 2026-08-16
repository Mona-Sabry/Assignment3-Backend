// //1. What is the Node.js Event Loop?
// The Event Loop is a mechanism in Node.js that allows it to handle asynchronous operations by continuously checking the call stack and processing callbacks from different queues, enabling non-blocking I/O.

// //2. What is Libuv and What Role Does It Play in Node.js?
// Libuv is a C library used by Node.js that provides the Event Loop and handles asynchronous operations such as file system access, DNS lookup, networking, and the thread pool.

// //3. How Does Node.js Handle Asynchronous Operations Under the Hood?
// Node.js executes synchronous code first. When it encounters asynchronous operations, it delegates them to the OS or libuv. Once these operations complete, their callbacks are placed into appropriate queues. The Event Loop processes these queues and executes callbacks when the call stack is empty. process.nextTick runs before Promise microtasks, and microtasks run before moving to the next Event Loop phase.

// //4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js?
// Call Stack: Executes synchronous JavaScript code.
// Event Queue (Callback Queue): Stores callbacks waiting to be executed after asynchronous operations complete.
// Event Loop: Checks if the Call Stack is empty and moves callbacks from queues to

// //5. What is the Node.js Thread Pool and How to Set the Thread Pool Size?
// Node.js uses the libuv thread pool to handle certain asynchronous operations such as file system operations, cryptography, compression, and DNS lookup. The default size is 4 threads, and it can be changed using the UV_THREADPOOL_SIZE environment variable.
// we can set the thread pool size by $env:UV_THREADPOOL_SIZE = 8 node app.js

// //6. How Does Node.js Handle Blocking and Non-Blocking Code Execution?
// Node.js executes JavaScript on a single thread. Non-blocking operations are delegated to the OS or libuv, allowing the Event Loop to continue processing other tasks. Blocking operations stop the Event Loop and prevent other requests from being handled.

//Part2: Simple CRUD Operations Using Express.js:

const express = require("express");
const fs = require("node:fs");
const app = express();
const port = 3000;
app.use(express.json());
const users = JSON.parse(fs.readFileSync("users.json","utf-8"));

//1. Create an API that adds a new user to your users storedina JSON file.(ensure that the email of the new user doesn’t exist before)
// URL:POST/user
app.post("/user",(req,res)=>{
const {username , age , email} = req.body;
const newUser = {
    id: users.length + 1,
    username :username,
    age: age,
    email:email
}
if(users.find(user=>user.email ===email)){
    return res.status(400).json({message:"Email is already exist"});  
}
users.push(newUser);
fs.writeFileSync("users.json",JSON.stringify(users,null,2));
res.status(201).json({message:"User added successfully"});
});

//2. Create an API that updates an existing user's name,age,or email by their ID.The user ID should be retrieved from the params.
// URL:PATCH/user/:id
app.patch("/user/:id",(req,res)=>{
const id = req.params.id;
const {username , age , email} = req.body;
const user = users.find(user=>user.id==id);
if(!user){
   return res.status(400).json({message:"user not found"});
}
 if (username !== undefined) {
        user.username = username;
    }

    if (age !== undefined) {
        user.age = age;
    }

    if (email !== undefined) {
        user.email = email;
    }
   
    fs.writeFileSync("users.json",JSON.stringify(users,null,2));
  res.json({message:"User updated successfully"});
});

//3. Create an API that deletes a User by ID.The user id should be retrieved from either the request body or optional params.
//URL:DELETE/user{/:id}
app.delete("/user/:id", (req,res)=>{
const id = req.params.id;
if(!id){
  return res.status(400).json({message:"User id not found"});
}
const userIndex = users.findIndex((user)=>user.id==id);
if(userIndex === -1){
    return res.status(404).json({message:"user not found"});
}
else{
    users.splice(userIndex, 1);
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    res.json({message:"User deleted successfully"});
}
});

//4. Create an API that gets a user by their name.The name will be provided as aquery parameter.
// URL:GET/user/getByName
app.get("/user/getByName", (req,res,next)=>{
const name = req.query.username;
if(!name){
   return res.status(400).json({message:"User name not found"});
}
const user = users.find(user=>user.username === name);
if(!user){
    return res.json({message:"User not found"});
}
    res.json(user);

});

// 5. Create an API that gets all users from the JSON file.
// URL:GET/user
app.get("/user", (req, res) => {
  res.json(users);
});

//6. Create an API that filter users by minimum age.
// URL:GET/user/filter
app.get("/user/filter", (req, res) => {
    const minAge = Number(req.query.minAge);

    if (isNaN(minAge)) {
        return res.status(400).json({
            message: "minAge must be a number"
        });
    }

    const filteredUsers = users.filter(
        user => user.age >= minAge
    );

    res.json(filteredUsers);
});

//7. Create an API that gets User by ID.
//URL:GET/user/:id
app.get("/user/:id", (req,res)=>{
const id = req.params.id;

const user = users.find((user)=>user.id==id);
if(!user){
    return res.status(400).json({message:"User not found"});  
}

    res.json(user);

});

app.all("/*dummy", (req, res) => {
  res.status(404).json({ message: "Not found handler" });
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
