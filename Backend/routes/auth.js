const router = require('express').Router();
const bcrypt = require('bcryptjs')
const {User} = require('../db/index')



router.post('/signup', async (req,res) => {
    
    try{
        const {username,password} = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const userData = new User({username,password: hashpassword})
        await userData.save().then(() =>
         res.status(200).json({
            msg:"SignUp Successful!!"
        }))
    }
    catch(error){
        res.status(200).json({
            msg:"User already exists!!"
        })
    }
})


router.post('/signin', async (req,res) => {
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(200).json({
                msg:"Please register"
            })
        }
        const isPassword = bcrypt.compareSync(req.body.password,user.password);
        if(!isPassword){
            return res.status(200).json({
                msg:"Incorrect password"
            })
        }
        const {password,...others} = user._doc;
        res.status(200).json({
            others
        })

    }
    catch(error){
        return res.status(200).json({
            Msg:"Incorrect Credentials!!"
        })
    }
})

module.exports = router;