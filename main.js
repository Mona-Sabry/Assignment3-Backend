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