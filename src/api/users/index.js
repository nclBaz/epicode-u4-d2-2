// ******************************************** USERS RELATED ENDPOINTS *****************************

// *********************************************** USERS CRUD ***************************************

/*

1. CREATE --> POST http://localhost:3001/users/ (+ body)
2. READ --> GET http://localhost:3001/users/
3. READ (single user) --> GET http://localhost:3001/users/:userId
4. UPDATE (single user) --> PUT http://localhost:3001/users/:userId (+ body)
5. DELETE (single user) --> DELETE http://localhost:3001/users/:userId

*/
import express from "express" // 3RD PARTY MODULE
import fs from "fs" // CORE MODULE (package that doesn't need to be installed)
import { fileURLToPath } from "url" // CORE MODULE
import { dirname, join } from "path" // CORE MODULE
import uniqid from "uniqid" // 3RD PARTY MODULE

// ************************************** HOW TO GET users.json PATH ******************************

// Target --> D:\Epicode\2022\BE-MASTER-02\U4\epicode-u4-d2-2\src\api\users\users.json

// 1. Let's start from the current's file path --> D:\Epicode\2022\BE-MASTER-02\U4\epicode-u4-d2-2\src\api\users\index.js
// console.log("IMPORT META URL --> ", import.meta.url)
// console.log("PATH --> ", fileURLToPath(import.meta.url))

// 2. We can obtain the parent's folder path --> D:\Epicode\2022\BE-MASTER-02\U4\epicode-u4-d2-2\src\api\users
// console.log("DIRNAME --> ", dirname(fileURLToPath(import.meta.url)))

// 3. We can concatenate users folder path with "users.json" --> D:\Epicode\2022\BE-MASTER-02\U4\epicode-u4-d2-2\src\api\users\users.json
const usersJSONPath = join(
  // PLEASE DO NOT USE "+" TO CONCATENATE TWO PATHS TOGETHER. USE JOIN INSTEAD BECAUSE IT IS GOING TO TAKE CARE OF WHICH OS YOU ARE USING!!!!
  dirname(fileURLToPath(import.meta.url)),
  "users.json"
)

console.log("TARGET --> ", usersJSONPath)

// ************************************************************************************************

const usersRouter = express.Router()

// 1. CREATE --> POST http://localhost:3001/users/ (+ body)
usersRouter.post("/", (request, response) => {
  // 1. Read the request body to obtain new user's data
  console.log("REQUEST BODY: ", request.body) // Remember to add express.json() into the main server configuration!

  // 2. Add some server generated info (unique id, createdAt, ...)
  const newUser = { ...request.body, createdAt: new Date(), id: uniqid() }
  console.log("NEW USER: ", newUser)

  // 3. Read the content of the users.json file, obtaining an array
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath))

  // 4. Push the new user to the array
  usersArray.push(newUser)

  // 5. Write the array back on the file
  fs.writeFileSync(usersJSONPath, JSON.stringify(usersArray)) // We cannot pass an array to writeFile function

  // 6. Send back a proper response
  response.status(201).send({ id: newUser.id })
})

// 2. READ --> GET http://localhost:3001/users/
usersRouter.get("/", (request, response) => {
  // 1. Read the content of users.json file
  const fileContent = fs.readFileSync(usersJSONPath) // this gives us back a BUFFER OBJECT (which is machine language)
  console.log("FILE CONTENT: ", fileContent)

  // 2. Obtain an array from that file
  const users = JSON.parse(fileContent)

  // 3. Send back the array as a response
  response.send(users)
})

// 3. READ (single user) --> GET http://localhost:3001/users/:userId
usersRouter.get("/:userId", (request, response) => {
  response.send({ message: "Hello I am the GET SINGLE USER ENDPOINT!" })
})

// 4. UPDATE (single user) --> PUT http://localhost:3001/users/:userId (+ body)
usersRouter.put("/:userId", (request, response) => {
  response.send({ message: "Hello I am the PUT ENDPOINT!" })
})

// 5. DELETE (single user) --> DELETE http://localhost:3001/users/:userId
usersRouter.delete("/:userId", (request, response) => {
  response.send({ message: "Hello I am the DELETE ENDPOINT!" })
})

export default usersRouter // Please do not forget this!
