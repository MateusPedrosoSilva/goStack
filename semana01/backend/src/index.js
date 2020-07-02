const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());

// Simu DB
const projects = [];

// Middlewares
function logRequests(req, res, next) {
    const { method, url } = req;

    const logLabel = `[${method.toUpperCase()} ${url}]`;

    console.time(logLabel);

    next();

    console.timeEnd(logLabel);
}

function validateProjectId(req, res, next){
    const { id } = req.params;

    if(!isUuid(id)){
        return res.status(400).json({
            error: "Invalid project ID"
        });
    }

    return next();

}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

//Routes
app.get('/projects', (req, res) => {
    const { title } = req.query;

    const result = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

    return res.status(200).json(result);
});

app.post('/projects', (req, res) => {
    const { title, owner } = req.body;
    // console.log(title);
    // console.log(owner);

    const project = { id: uuid(), title, owner };

    projects.push(project);

    return res.status(201).json(project);
});

app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title, owner } = req.body;
    // console.log(id);
    // console.log(title);
    // console.log(owner);

    const projectIndex = projects.findIndex(project => project.id == id);
    if(projectIndex < 0){
        return res.status(400).json({
            error: 'not found'
        });
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;

    return res.status(201).json(project);
});

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0){
        return res.status(400).json({
            error: 'project not found'
        });
    }

    projects.slice(projectIndex, 1);

    return res.status(204).send();
});

app.listen(3333, () => {
    console.log('🐺 Server running just fine on port 3333');
});