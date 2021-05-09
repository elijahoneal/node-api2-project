// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')
const router = express.Router()

router.get('/api/posts', (req, res)=>{
    Posts.find()
    .then( posts => res.status(200).json(posts) )
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The posts information could not be retrieved" })
    })

})

router.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    Posts.findById(id)
    .then( post => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
    } )
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The post information could not be retrieved" })
    })
})

router.post('/api/posts', (req,res) => {
    const body = req.body
    Posts.insert(body)
    .then( newPost => {
        if( !body.title || !body.contents ){
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            res.status(201).json(newPost)
        }
    } )
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    })
})

router.put('/api/posts/:id', (req,res) => {
    const { id } = req.params
    const body = req.body
    Posts.update(id , body)
    .then( updatedPost => {
        if(!id) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else if(!body.title || !body.contents) {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            res.status(200).json(updatedPost)
        }
    } )
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The post information could not be modified" })
    })
})

router.delete('/api/posts/:id', (req,res) => {
    const { id } = req.params
    Posts.remove(id)
    .then(() => {
        if(!id){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The post could not be removed" })
    })
})

router.get('/api/posts/:id/comments', (req,res) => {
    const { id } = req.params
    Posts.findPostComments(id)
    .then( comments => {
        if(!id){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(comments)
        }
    } )
    .catch( err => {
        console.log(err)
        res.status(500).json({ message: "The comments information could not be retrieved" })
    })
})

module.exports = router;