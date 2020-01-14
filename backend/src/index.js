const express = require("express");
const cors = require("cors");
const app = express();
const router = require('./routes/router')
require('./database');

// Settings
app.use(cors());
router(app)

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

// Server initialization
const startServer = () => {
    app.listen(3000);
    console.log("Listening on port: 3000");
};

startServer();