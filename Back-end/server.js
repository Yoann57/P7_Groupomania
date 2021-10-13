const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const postRoutes = require('./app/routes/post.routes');
// const commentRoutes = require('./app/routes/comment.routes');
const path = require('path');

const app = express();

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur le réseau social de Groupomania" });
});

const db = require("./app/models");

db.sequelize.sync();


app.use('/images', express.static(path.join(__dirname, 'images')));


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/post.routes')(app);
require('./app/routes/comment.routes')(app);


// app.use('/api/posts', postRoutes);
// app.use('/api/comment', commentRoutes);


// module.exports = app;


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});