import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import doctorModel from '../models/doctorModel.js'
import { v2 as cloudinary } from 'cloudinary'

const JWT_SECRET = process.env.JWT_SECRET || 'iloveyou'

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({
                success: false,
                message: "Missing details."
            });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter a valid email."
            });
        }

        if (password.length < 6) {
            return res.json({
                success: false,
                message: "Choose a stronger password."
            });
        }

        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.json({
                success: false,
                message: "Email already exists."
            });
        }

        if (!imageFile) {
            return res.json({
                success: false,
                message: "Doctor image is required."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const imageUrl = imageUpload.secure_url;

        let parsedAddress;
        try {
            parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
        } catch (err) {
            return res.json({
                success: false,
                message: "Invalid address format."
            });
        }

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: parsedAddress,
            date: new Date()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        return res.json({
            success: true,
            message: "Doctor added successfully."
        });

    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: error.message
        });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                success: false,
                message: "Provide all detalis."
            })
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                email + password
                , JWT_SECRET)

            return res.json({
                success: true,
                token: token
            })
        } else {
            return res.json({
                success: false,
                message: 'Invalid Credentials.'
            })
        }
    } catch (error) {
        console.error(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const allDoctors = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({
            success: true,
            doctors
        })
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: error.message
        });
    }
}

export { addDoctor, loginAdmin, allDoctors };
