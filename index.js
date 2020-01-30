const express = require('express');
const server = express();
server.use(express.json());

const projects = [];
let request = 0;

//log console

server.use((req, res, next) => {
  console.time('Time Request');
  console.log(`Last method: ${req.method}; Last URL: ${req.url}`)
  console.count('Resquest');
  next();

  console.timeEnd('Time Request');
});

//check project in array

function CheckProjectInArray(req, res, next) {
  if (!projects[req.params.index]) {
    return res.status(400).json({ error: 'Projects does not exist!' });
  }

  return next();
}

//check title project 

function CheckEditNameProject(req, res, next) {
  const { id } = req.params;
  const { title } = req.body;

  if (!req.body.title) {
    return res.status(400).json({ error: 'Title Incorrect!' });
  }

  req.title = title;

  return next();
}

//list all projects

server.get('/projects', (req, res) => {

  return res.json(projects);
});

//list id project

server.get('/projects/:index', CheckProjectInArray, (req, res) => {
  const { index } = req.params;

  return res.json(projects[index]);
});

//create new project

server.post('/projects', (req, res) => {
  projects.push({
    "id": req.body.id,
    "title": req.body.title,
    "task": []
  });

  return res.json({ projects });
});

//create new task

server.post('/projects/:index', CheckProjectInArray, (req, res) => {
  const { index } = req.params;
  const { task } = req.body;

  projects[index].task.push(task);

  return res.json({ projects });
});

//update project

server.put('/projects/:index', CheckProjectInArray, CheckEditNameProject, (req, res) => {
  const { index } = req.params;

  projects[index].title = req.title;

  return res.json({ projects });
});

//delete project

server.delete('/projects/:index', CheckProjectInArray, (req, res) => {
  const { index } = req.params;

  projects.splice(index, 1);

  return res.json({ message: 'Successfully deleted' });
});

server.listen(3000);