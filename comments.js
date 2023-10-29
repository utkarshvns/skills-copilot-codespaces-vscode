// Create web server application using Node.js that returns the comments
// for a specific post in a JSON format. You should use the following
// endpoint: /posts/:postId/comments

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/posts/:postId/comments', (req, res) => {
  fs.readFile('posts.json', (err, data) => {
    if (err) throw err;
    const posts = JSON.parse(data);
    const post = posts.find((post) => post.id === parseInt(req.params.postId));
    if (!post) {
      res.status(404).send('Post not found');
    } else {
      res.json(post.comments);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
