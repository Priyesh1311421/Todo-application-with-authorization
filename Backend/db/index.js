const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:Shivesh12@cluster0.2zajxvl.mongodb.net/Todo-auth');


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    todo:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Todo'
    }]
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    title:{
        type:String,
        required:true
    },
    description:String,
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
});


const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}