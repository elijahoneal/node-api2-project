// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')
const router = express.Router();


router.get('', (req, res)=>{
    Posts.find()
    .then( posts => res.status(200).json(posts) )
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The posts information could not be retrieved" })
    })

})

router.get('/:id', async (req, res) => {
    const { id } = req.params
  await  Posts.findById(id)
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

router.post('/', async (req,res)  => {
    const post = req.body
    console.log(post)
    if(!post.title || !post.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
      await  Posts.insert(post)
        .then( post => res.status(201).json(post) )
        .catch( err => {
            console.log(err)
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        } )
    }
    
})

router.put('/:id', async (req,res) => {
    const { id } = req.params
    const body = req.body
    if(!id){
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    } else if(!body.title || !body.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
      await  Posts.update(id, body)
        .then( updated => res.status(200).json(updated) )
        .catch( err => {
            console.log(err)
            res.status(500).json({ message: "The post information could not be modified" })
        } )
    }
    
})

router.delete('/:id', async (req,res) => {
    const { id } = req.params
   await Posts.remove(id)
    .then((deleted) => {
        if(!id){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(deleted)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The post could not be removed" })
    })
})

router.get('/:id/comments', async (req,res) => {
    
    const { id } = req.params
   await Posts.findPostComments(id)
    .then( comments => {
        if(comments){
            res.status(200).json(comments)
            
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
    } )
    .catch( err => {
        console.log(err)
        res.status(500).json({ message: "The comments information could not be retrieved" })
    })
})

module.exports = router;