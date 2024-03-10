// Create web server
// 1. Import Express
// 2. Create an instance of an Express web server
// 3. Define a route handler
// 4. Listen on a port

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// 2. Create an instance of an Express web server
const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// 3. Define a route handler
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  // Send back a status of 201
  res.status(201).send(comments);
});

// 4. Listen on a port
app.listen(4001, () => {
  console.log('Listening on 4001');
});