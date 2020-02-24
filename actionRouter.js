const express = require('express');
const router = express.Router();
const actions = require('./data/helpers/actionModel')


router.get('/', (req, res, next) => {
    actions.get()
    .then(action => res.json(action))
    .catch(next)
})

router.put("/:id", validateActionId(), (req, res, next) => {
    actions.update(req.params.id, req.body)
        .then(action => {
            res.status(202).json({
                message: "Action is updated"
            })
        })
        .catch(next)
})

router.delete("/:id", validateActionId(), (req, res, next) => {
    actions.remove(req.params.id)
        .then(action => {
            res.status(202).json({
                message: "Action is deleted"
            })
        })
        .catch(next)
})

function validateActionId(){
    return( req, res, next) => {
        actions.get(req.params.id)
            .then(action => {
                if(action) {
                    next()
                } else {
                    res.status(404).json({
                        message : "Action id is not found"
                    })
                }
            })
    }
}

module.exports = router;