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

function CheckProjectList(req, res, next) {
  if (!req.params.projects) {
    return res.status(400).json({ error: 'Projects list is empty!' });
  }

  return next();
}

function CheckProjectInArray(req, res, next) {
  if (!projects[req.params.index]) {
    return res.status(400).json({ error: 'Projects does not exist!' });
  }

  return next();
}

server.get('/projects', (req, res) => {
  //console.log("Funcionando");

  return res.json(projects);
})

server.get('/projects/:index', CheckProjectInArray, (req, res) => {
  const { index } = req.params;

  return res.json(projects[index]);
})

server.post('/projects', (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const { task } = req.body;

  projects.push(id);
  projects.push(title);
  projects.push(task);

  return res.json(projects);
});

server.listen(3000);