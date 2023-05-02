// Write your "actions" router here!

const express = require('express');
const Actions = require('./actions-model')

const { checkIfActionIdExists, checkIfNewActionDoneProperly } = require('./actions-middlware')

const router = express.Router();

router.get('/', async(req, res, next) => {
    const data = await Actions.get()
    try {
        res.status(200).json(data)
    } catch (error) {
        next (error)
    }
})

router.get('/:id', checkIfActionIdExists, (req, res) => {
    res.json(req.actionId)
})

router.post('/', checkIfNewActionDoneProperly, async (req, res, next) => {
    const newPost = await Actions.insert(req.body)
    try {
        res.status(201).json(newPost)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', [ checkIfActionIdExists, checkIfNewActionDoneProperly] , async (req, res, next) => {
    const validated = await Actions.update(req.params.id, req.body)
    try {
        res.status(200).json(validated)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', checkIfActionIdExists, (req, res, next) => {
    Actions.remove(req.params.id)
    .then (() => {
        res.status(200).json()
    })
    .catch(error => next(error))
})

module.exports = router;
