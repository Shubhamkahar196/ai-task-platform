import express from 'express'
import User from '../models/user.models.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { registerValidation,loginValidation } from '../utils/schemaValidation.js'


// register controller
export const register = async(req,res)=>{
    try {
        const parsedData = registerValidation.safeParse(req.body);
        if(!parsedData.success){
            return res.status(401).json({
                success:false,
                message: "Invalid data"
            })
        }
// taking data
        const {name,email,password} = parsedData.data;
// finding user
const userExist = await User.findOne({email});
if(userExist){
    return res.status(400).json({
        message: "email is already register"
    })
}

// hashing password 
const hashedPassword = await bcrypt.hash(password,10);

const newUser = await User.create({
    name,
    email,
    password: hashedPassword
})
        
    //  generating token  
    const token = jwt.sign(
        {userId:newUser._id},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )

    // Send back the token and non-sensitive user data
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
    } catch (error) {
        console.log("User registered failed",error);
    }
}

// login 

export const login = async (req,res)=>{
    try {
        const parsedData = loginValidation.safeParse(req.body);
        if(!parsedData.success){
            return res.status
        }
    } catch (error) {
        console.log("Login failed",error);
    }
}