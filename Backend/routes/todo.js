const router = require('express').Router();
const {User,Todo} = require('../db/index')

router.post('/addTask', async (req,res)=>{
    try {
        const {title,description,id} = req.body;

        const existingUser = await User.findById(id);

        if(existingUser){
            const todo = new Todo({title,description,user:existingUser });
            await todo.save().then(() => res.status(200).json({todo}));
            existingUser.todo.push(todo);
            existingUser.save();
        }
    } catch (error) {
        console.log(error);
    }
})

router.put('/updateTask/:id', async (req,res)=>{
    try {
        const {title,description,username} = req.body;

        const existingUser = await User.findOne({username});

        if(existingUser){
            const todo = await Todo.findByIdAndUpdate(req.params.id,{title,description});
            todo.save().then(()=> {res.status(200).json({message:"Task Updated"})})
        }
    } catch (error) {
        console.log(error);
    }
})
router.delete('/deleteTask/:id', async (req,res)=>{
    try { 
        const {id} = req.body;

        const existingUser = await User.findByIdAndUpdate(id,{$pull:{todo: req.params.id}});

        if(existingUser){
            const todo = await Todo.findByIdAndDelete(req.params.id)
             .then(()=> {res.status(200).json({message:"Task Finished"})})
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/getTasks/:id', async (req,res)=> {
    const todo = await Todo.find({user:req.params.id});
    if(todo.length !== 0){
        res.status(200).json({ todo:todo });
    }
    else{
        res.status(200).json({msg:"No Todo"})
    }
})

module.exports = router;