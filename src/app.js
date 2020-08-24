const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  const { title } = request.query;
  const results = title
   ? repositories .filter(project => project.title.includes(title))
   : repositories ;

  return response.json(results);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs} = request.body;
  const project = { id: uuid(), 
                              title, 
                              url,
                              techs,
                              likes: 0,
                            };

  repositories .push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const { title, url, techs } = request.body;

  const projectIndex = repositories.findIndex ( project => project.id == id);
  
  if (projectIndex < 0){
    return response.status(400).json({error: 'Repository not found.'})
  }

  const project = {
    id,
    title,
    url,
    techs,
    likes: repositories[projectIndex].likes,
  };

  repositories[projectIndex] = project;

  return response.json(project);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  const {id} = request.params;
  const {  title, url, tech } = request.body;

  const projectIndex = repositories.findIndex ( project => project.id == id);
  
  if (projectIndex < 0){
    return response.status(400).json({error: 'Repository not found.'})
  }
  repositories.splice(projectIndex, 1);
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;
  const projectIndex = repositories.findIndex ( project => project.id == id);

  if (projectIndex < 0){
    return response.status(400).json({error: 'Repository not found.'})
  }
  repositories[projectIndex].likes++;

  return response.json( repositories[projectIndex]);

});

module.exports = app;
