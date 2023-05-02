// add middlewares here related to actions

const Actions = require('./actions-model');

    async function checkIfActionIdExists(req, res, next){
        try {
            const actionId = await Actions.get(req.params.id);
            if(actionId){
                req.actionId = actionId;
                next();
            } else {
                next({status : 404, message: `Action ID: ${req.params.id} not able to be located`})
            } 
        } catch (error) {
            next(error)
        }
    }

    async function checkIfNewActionDoneProperly (req, res, next) {
        const { description, notes} = req.body;
        if (description !== undefined && 
            typeof description === 'string' && 
            description.trim().length &&
            description.length < 129 && 
            notes !== undefined &&
            notes.trim().length){
                next()
            }
            else {
                res.status(400).json({
                    message: 'Please provide a name and a valid description for the Project'
                })
            }
    }

module.exports = { checkIfActionIdExists, checkIfNewActionDoneProperly } 
    

