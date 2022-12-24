const express = require('express')
const cors=require("cors");
require("dotenv").config();
const connect=require("./src/config/db");
const userRoute = require('./src/users/user.router');
const ticketRoute = require('./src/ticket/ticket.router');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use("/users", userRoute);
app.use("/tickets",ticketRoute);
app.get('/', (req, res) => res.send('hello mock15'));

const PORT=process.env.PORT || 8080;
app.listen(PORT, async() => {
    await connect();
    console.log(`server started on port ${PORT} mock 15`)
})