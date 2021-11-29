const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// create connection
const mydb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

//connect
mydb.connect((err) => {
  if (err) throw err;
  console.log("mysql connected");
});

//Create Db
app.get("/createDb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  mydb.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("database created");
  });
});

//Create Table in DB
app.get("/createPostTable", (req, res) => {
  let sql =
    "CREATE TABLE Posts (id int Auto_increment primary key,title varchar(255),body varchar(255))";
  mydb.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created");
  });
});

//Add Post in DB
app.get("/addPost", (req, res) => {
  let Post = { title: "Post One", body: "This is body" };
  let sql = "INSERT INTO Posts set ?";
  mydb.query(sql, Post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post added");
  });
});

//Get Post from DB
app.get("/getPosts", (req, res) => {
  let sql = "SELECT * from Posts";
  mydb.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post fetched..");
  });
});

//Get Post from DB with id
app.get("/getPosts/:id", (req, res) => {
  let sql = `SELECT * from Posts where id = ${req.params.id}`;
  mydb.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post fetched..");
  });
});

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to base application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
