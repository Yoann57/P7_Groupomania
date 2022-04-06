const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const helmet = require('helmet');
const app = express();
require('dotenv').config();

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur le réseau social de Groupomania"
  });
});

const db = require("./app/models");

db.sequelize.sync();

app.use('/images', express.static(path.join(__dirname, 'app/images')));
console.log(__dirname);

app.use(helmet());

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/post.routes')(app);
require('./app/routes/comment.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});