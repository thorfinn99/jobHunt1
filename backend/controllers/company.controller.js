import {Company} from "../models/company.model.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req,res)=> {
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        }
        let company = await Company.findOne({name:companyName})
        if(company){
            return res.status(409).json({
                message:"Company already Registered",
                success:false
            })
        }
         company = await Company.create({
            name: companyName,
            userId: req.id
         })
         return res.status(201).json({
            message: "Company Registered Succesfully",
            success: "true",
            company
         })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: `${error.message}`,
            success: false
        });
    }
}

export const getCompany = async (req,res)=> {
    try {
        const userId = req.id;
        const companies = await Company.find({userId})
        if(!companies){
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

export const getCompanyById = async (req,res)=> {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(404).json({
                message: "company not found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success: "true"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

 export const updateCompany = async (req,res) => {
    try {
        const { name, description, website, location } = req.body;
        let logo;
        if(req.file){
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updateData = {name, description, website, location}
        if(logo){
            updateData.logo = logo
        }
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true } )

        if(!company) {
            return res.status(404).json({
                message: "company not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company information updated",
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
 }
