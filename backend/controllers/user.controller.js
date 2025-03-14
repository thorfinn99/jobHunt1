import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"

//register functionality
export const register = async (req,res)=> {
    try {
        console.log(req.body);
        const {fullName, email, phoneNumber, password, role} = req.body;
        if(!fullName || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: 'User already exist with this email',
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullName, 
            email, 
            phoneNumber, 
            password:hashedPassword, 
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        })
        return res.status(201).json({
            message:"Account Created Successfully",
            success: true,
            
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

// login functionality
export const login = async (req,res)=> {
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        };
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Incorrect Email Or Password",
                success:false
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({
                message:"Incorrect Email Or Password",
                success:false
            })
        }
        if(role != user.role){
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false
            })
        };
        const tokenData = {
            userId:user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'})
        console.log("Generated Token:", token);

        user = {
            id:user._id,
            fullName:user.fullName, 
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, path: '/', secure: true ,sameSite:'none'}).json({
            message:`Welcome back ${user.fullName}`,
            user,
            credentials: 'include',
            success:true
        })
 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

// logout Functionality
export const logout = async (req,res)=> {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged oUt Succesfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}
// update Profile
export const updateProfile = async (req,res)=> {
    try {
        const {fullName, email, phoneNumber, bio, skills} = req.body;
        const userId = req.id;
        let user = await User.findById(userId)
        let file;
        if(req.file){
            file = req.file
            const fileUri = getDataUri(file)
            let cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw"
            })
    
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
            
        }
        
        let skillsArray;
        if(skills){
         skillsArray = skills.split(",")
        }
        console.log('Data Recived in Backend',req.body);

        if(!user){
            return res.status(400).json({
                message:"User Not Found",
                success: false
            })
        }
        if(fullName) user.fullName = fullName
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "profile updated succesfully",
            user,
            success:true
        })

    } catch (error) {
        console.log(error);  
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}
