// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')

const { checkIfProjectValid, checkIfNewProjectDoneProperly } = require('./projects-middleware')

const router = express.Router();

router.get('/', async(req, res, next) => {
    const data = await Projects.get()
    try {
        res.status(200).json(data)
    } catch (error) {
        next (error)
    }
})

router.get('/:id', checkIfProjectValid, (req, res) => {
    res.json(req.project)
})

router.post('/', checkIfNewProjectDoneProperly , async (req, res, next) => {
    const newPost = await Projects.insert(req.body)
    try {
        res.status(201).json(newPost)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', checkIfProjectValid, checkIfNewProjectDoneProperly, async (req, res, next) => {
    const validated = await Projects.update(req.params.id, req.body)
    try {
        res.status(200).json(validated)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', checkIfProjectValid, (req, res, next) => {
    Projects.remove(req.params.id)
    .then (() => {
        res.status(200).json()
    })
    .catch(error => next(error))
})

router.get('/:id/actions', checkIfProjectValid, async (req, res, next) => {
    const actionArray = await Projects.getProjectActions(req.params.id)
    try {
        res.status(200).json(actionArray)
    } catch (error){
        next(error)
    }
})
module.exports = router;