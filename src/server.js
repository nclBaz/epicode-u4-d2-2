//const express = require("express") <-- OLD SYNTAX (we don't want to use old stuff)
import express from "express" // NEW SYNTAX (you can use this only if type:"module" is added on package.json)

const server = express()
const port = 3002

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
