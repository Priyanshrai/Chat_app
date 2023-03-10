const express = require("express");
const app = express();
const fs=require("fs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

app.get("/",(req, res, next)=>{
    fs.readFile('username.txt', (err, data)=>{
        if(err){
            console.log(err)
            data= "No Chat Exists"
        }
        res.send(
            `${data} <form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')"
            method="post">
            <input id='message' type="text" name="message" placeholder="message">
            <input type="hidden" name="username" id="username">
            <button type="submit">send</button>
            </form>`)
    });
   
});

app.post("/", (req, res, next) => {
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.txt",`${req.body.username} : ${req.body.message}`, {flag: 'a'}, (err)=>
    err ? console.log(err) : res.redirect('/')
    );
  });


app.get("/login", (req, res, next) => {
  res.send(`<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="POST">
    <input id="username" type="text" name"title">
    <button type="submit">add</button>
    </form>`);
});






app.listen(3000);
