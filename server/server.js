require("dotenv").config();
// const cors = require('cors')
// const express = require('express')
// require('express-group-routes')
// var bodyParser = require('body-parser')
// const app = express()
// const port = 5000

// app.use(express.json())
// app.use(cors())

// const router = require('./src/routes');
// app.use('/api/v1',router)

const express = require("express");
const cors = require("cors");
const router = require("./src/routes");
const app = express();

// const port = process.env.PORT || 5000;

const http = require("http");
const { Server } = require("socket.io");

// code here
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// import here
require("./src/socket")(io);
const port = 5000;
app.use(cors());
app.use(express.json());
app.use("/api/v1/", router);
app.use("/uploads", express.static("uploads"));
server.listen(port, () => console.log(`Listening on port ${port}!`));
