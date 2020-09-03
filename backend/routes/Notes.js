const express = require('express');

const router = express.Router();

const Note = require('../models/Note');

router.get ('/' , async (req ,res) =>         
{
    try {
        const posts = await Note.find();        
        res.json(posts);                        
    }
    catch(err) {                                    
        res.json({message:err});
    }
});


router.get('/:postId', async (req,res) =>       
{
    try{
   const post = await Note.findById(req.params.postId);    
        res.json(post);                                    
}
    catch(err){
        res.json({message:err})
    }

})


    router.delete('/:postId' , async (req,res) =>
    {
        try{
        const removePost = await Note.remove ({_id: req.params.postId}) 
        res.json(removePost);
        }
        catch(err)
        {
            res.json ({message: err});
        }
    });


    router.put ('/:postId', async (req,res) =>
    {
        try{
            const updatedTitle = await Note.updateOne({_id:req.params.postId},  
                { $set: {notes: req.body.notes }}       
                );
                res.json(updatedTitle);
        }
        catch(err)
        {
            res.json({message:err})
        }
    });




router.post ('/',async (req,res) => {
    const post = new Note ({
        notes: req.body.notes,          
    });
    try{
   const savedPost = await post.save()
    res.json(savedPost);
    }
    catch(err)
    {
        res.json({message: err});
    }
});






module.exports = router;