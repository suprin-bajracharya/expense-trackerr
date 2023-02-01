import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js";


const categories = [
    {label: 'Travel', icon: 'user' },
    {label: 'Shopping', icon: 'user'},
    {label: 'Media', icon: 'user'},
    {label: 'Entertainment', icon: 'user'},
    {label: 'Fuel', icon: 'user'},
    {label: 'Bills', icon: 'user'},
]

const hashPassword = (password)=>{
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const register = async (req, res) => {
    
    const {
        email, password, firstname, lastname,
        
    } = req.body
    const userExists = await User.findOne({email})
    if(userExists) return res.status(406).json({message: "User Already Exists."})    

    const hashedPassword = hashPassword(password)
    const user = await User( 
        {
            email, 
            password: hashedPassword, 
            firstname, 
            lastname, 
            categories
        })
    user.save()

    return res.status(201).json({message:"User is created."})
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(406).json({message: "User Does Not Exists."})
    
    const matched = await bcrypt.compare(password, user .password)
    if(!matched) return res.status(406).json({message: "Username or Password Incorrect."})

    //create JWT Token
    const payload = {
        username: email, 
        id: user._id
    }
    console.log("auth_api: "+process.env.JWT_SECRET)
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.json({message: "log in successful.", token, user})

}