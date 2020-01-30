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

function CheckProjectInArray(req, res, next) {
  if (!projects[req.params.index]) {
    return res.status(400).json({ error: 'Projects does not exist!' });
  }

  return next();
}

server.get('/projects', (req, res) => {
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

server.put('/projects/:index', CheckProjectInArray, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  projects[index] = title;

  return res.json(projects);
});

server.delete('/projects/:index', CheckProjectInArray, (req, res) => {
  const { index } = req.params;

  projects.splice(index, 1);

  return res.json(projects);
});

server.listen(3000);