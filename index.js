const express = require('express');
const server = express();
server.use(express.json());

const projects = [];

server.use((req, res, next) => {
  console.time('Time Request');
  console.log(`Last method: ${req.method}; Last URL: ${req.url}`)

  next();

  console.timeEnd('Time Request');
});

function CheckProject(req, res, next) {
  if (!req.projects) {
    return res.status(400).json({ error: 'Projects does not exist!' });
  }

  return next();
}

server.get('/projects', CheckProject, (req, res) => {
  //console.log("Funcionando");

  return res.json(projects);
})

server.listen(3000);