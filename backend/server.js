const dotenv = require('dotenv'); //always at top
dotenv.config({ path: './config.env' })//path to hidden data always at top
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const path = require('path');




app.use(express.json());
app.use(cookieParser());
//variable hidden such as passwords connection
const PORT = process.env.PORT;

require('./db/connection')// adding db connectio









app.use(require('./router/authentications')) //route files authentications files
app.use(require('./router/musics'))//give foods data





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});