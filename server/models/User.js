import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    firstname: {type:String, required:['Firstname is required']},
    lastname: {type:String, required:['Lastname is required']},
    email: {type:String, required:['Email is required']},
    password: {type:String, required:['Password is required']},
    categories: [
        {label:String, icon: String}
    ]
}, 
{timestamps: true} //provides created at and updated at fields
);

export default new mongoose.model('User', userSchema)