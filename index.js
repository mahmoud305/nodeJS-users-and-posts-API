/**
 * author : Mahmoud Abo-Hgr .
 * Group : Friday 10-->4 
 * Assignment 5
 * Backend Node.js
 */

const express = require('express');
const userRouter = require('./Modules/Users/Routes/user.Routes');
const postRouter = require('./Modules/Posts/Routes/post.Routes');
const { createTables } = require('./SQL.Config/SQLconfig');
const app = express();
const port = 4200
app.use(express.json());
const www = process.env.WWW || './';
app.use(express.static(www));
console.log(`serving ${www}`);
// app.get('*', (req, res) => {
//     res.send(`index.html`);
// });
app.use(userRouter);
app.use(postRouter)
createTables();

app.use(express.urlencoded({extended:false}));// to be able to print on console ;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
