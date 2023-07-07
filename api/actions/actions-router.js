// Write your "actions" router here!
const express = require('express')

const {
    validateActionId,
    validateAction,
    validateActionUpdate,
} = require('./actions-middlware')

const router = express.Router()
const Action = require('./actions-model')

router.get('/', (req, res, next) => {
    Action.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(next)    
})

router.get('/:id', validateActionId, (req, res, next) => {
    res.json(req.action)
    // console.log(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert({notes: req.notes, description: req.description, project_id: req.project_id})
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put('/:id', validateActionId, validateActionUpdate, (req, res, next) => {
    Action.update(req.params.id, {notes: req.notes, description: req.description, project_id: req.project_id, completed: req.completed})
    .then(()=>{
        return Action.get(req.params.id)
    })
    .then(action => {
        res.json(action)
    })
    .catch(next)
})

router.delete('/:id', validateActionId, (req, res, next) => {
    Action.remove(req.params.id)
    .then(result => {
        res.json(result)
    })
    .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        err: err.message
    })
})

module.exports = router