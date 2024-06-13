const express = require('express');
const cors = require("cors");
const router = require('./routes');
const connectDB = require('./config');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api' , router);

const PORT = process.env.PORT || 8080;

connectDB()
.then(() => {
    console.log("Database connected");
    app.listen(PORT , () => {
        console.log(`server is listen on port ${PORT}`)
    })
})
