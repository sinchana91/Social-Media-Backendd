const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");

const app = express();

require('dotenv').config()
// console.log("SECRET_KEY:", process.env.SECRET_KEY);

mongoose.connect("mongodb://localhost:27017/social_media", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("connected to mongo yeahh");
});

mongoose.connection.on("error", (err) => {
    console.log("error", err);
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({
        message: "Server is Alive"
    });
});

app.use('/user', userRoute);  //user is the path
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server is running on", PORT);
    console.log("http://localhost:" + PORT);
});
