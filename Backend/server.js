const http = require("http");
const app = require("./app");
const server = http.createServer(app);
require('./database/db')
require('dotenv').config()
const port = process.env.PORT || 8888;

server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
})
