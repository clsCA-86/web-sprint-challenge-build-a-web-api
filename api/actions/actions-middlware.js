// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next) {
    try{
        const action = await Action.get(req.params.id)
        if(!action){
            res.status(404).json({
                message: 'not found'
            })
        } else {
            req.action = action
            next()
        }
    }
    catch(err){
        res.status(500).json({
            message:'problem finding user'
        })
    }
}

function validateAction(req,res,next){
    const {notes, description, project_id} = req.body
    // const {id} = req.params
    if(!notes || !description || !project_id){
        res.status(400).json({
            message:'missing required text field'
        })
    } else {
        req.notes = notes.trim()
        req.description = description.trim()
        req.project_id = project_id
        next()
    }
}

function validateActionUpdate(req,res,next){
    const {notes, description, project_id, completed} = req.body
    // const {id} = req.params
    if(
        !notes ||
        !description ||
        !project_id || 
        completed === undefined){
        res.status(400).json({
            message:'missing required text field'
        })
    } else {
        req.notes = notes.trim()
        req.description = description.trim()
        req.project_id = project_id
        req.completed = completed
        next()
    }
}

module.exports = {
    validateActionId,
    validateAction,
    validateActionUpdate
}