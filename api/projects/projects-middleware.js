// add middlewares here related to projects
const Projects = require('./projects-model');

async function checkIfProjectValid(req, res, next){
    try {
        const project = await Projects.get(req.params.id);

        if(project){
            req.project = project;
            next();
        } else {
            next({status : 404, message: `Project with id ${req.params.id} not able to be located`})
        } 
    } catch (error) {
        next(error)
    }
}

async function checkIfNewProjectDoneProperly (req, res, next) {
    const { name, description, completed} = req.body;
    if (name !== undefined && 
        typeof name === 'string' && 
        name.trim().length &&
        description !== undefined &&
        description.trim().length && 
        completed !== undefined){
            next()
        }
        else {
            res.status(400).json({
                message: 'Please provide a name and a valid description for the Project'
            })
        }
}



module.exports = { checkIfProjectValid , checkIfNewProjectDoneProperly }

