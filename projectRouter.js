const express = require('express');
const router = express.Router();
const projects = require("./data/helpers/projectModel");
const actions = require("./data/helpers/actionModel")

router.get('/', (req, res, next) => {
    projects.get()
        .then(project => res.json(project))
        .catch(next)
})

router.get('/:id', validateProjectId(), (req, res, next) => {
    res.status(200).json(req.project)
})

router.get("/:id/actions", validateProjectId(), (req, res, next) => {
    projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.post("/", validateProject(), (req, res, next) => {
   projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

router.post("/:id/actions", validateProjectId(), validateAction(), (req, res, next) => {
    actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put("/:id", validateProjectId(), validateProject(), (req, res, next) => {
    projects.update(req.params.id, req.body)
        .then(() => {
            res.status(200).json({
                message: "Project is updated"
            })
        })
        .catch(next)
})

router.delete('/:id', validateProjectId(), (req, res, next) => {
    projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: "Project is deleted"
            })
        })
})

function validateProjectId() {
    return (req, res, next) => {
        projects.get(req.params.id)
            .then(project => {
                if(project) {
                    req.project = project
                    next()
                } else {
                    res.status(404).json({
                        message: "Project Id does not exist"
                    })
                }
            })
    }
}

function validateProject() {
    return(req, res, next) => {
  
      body = {
        name: req.body.name,
        description: req.body.description,
       
      };
  
      if(!req.body.name || !req.body.description) {
        return res.status(400).json({
          message: "Missing name and description input"
        })
      } else {
        req.text = body;
        next()
      }
    }
  }

function validateAction() {
    return(req, res, next) => {
        body = {
            description : req.body.description,
            notes : req.body.notes,
            project_id : req.params.id
        }

        if(!req.body.description || !req.body.notes) {
            return res.status(400).json({
                message : "Missing description and notes input"
            })
        } else {
            req.body = body
            next()
        }
    }
}


module.exports = router;