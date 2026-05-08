const bcrypt = require("bcryptjs")
const User = require("../models/authModel")
const sendEmail = require("../utils/sendEmail")
require("dotenv").config()
const jwt = require('jsonwebtoken')
const { json } = require("express")



const registerUser = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body
        // check all feilds 
        if (!name || !phone || !email || !password) {
            return res.status(400).json({
                message: "Pleaase Fill All Details"
            })
        }
        // check phone 
        const cleanedPhone = phone.replace(/\D/g, "");

if (cleanedPhone.length < 10 || cleanedPhone.length > 12) {
    return res.status(400).json({
        message: "Please enter valid phone number"
    });
}
        // check password length 

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }
        // check emain formate


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        // check if user is all ready exists 


        const userExist = await User.findOne({
            $or: [{ email }, { phone }]
        });
        if (userExist) {
            return res.status(400).json({
                message: "User All Ready Exist"
            })
        }
        // hash password 
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        //   create otp 
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        // create user 

        const user = await User.create({
            name: name,
            phone: phone,
            email: email,
            password: hashedPassword,
            otp: otp,
            otpExpiry: otpExpiry,
        })
        if (!user) {
            return res.status(400).json({
                message: "User Not Register!"
            })

        }

        // otp sending 
        try {
            await sendEmail(
                email,
                "Your OTP for AI Cold Mail Generator",
                `Your OTP code is ${otp}. It is valid for 10 minutes only`
            );
        } catch (error) {
            console.log({ message: 'Error Sending Otp' })
        }

        // sending response 
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isVerified :user.isVerified,
            token: genrateToken(user._id)
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "Please Fill All Details"
            })
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User Not Found"
            })

        }
        if (user && await bcrypt.compareSync(password, user.password)) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isVerified :user.isVerified,
                token: genrateToken(user._id)

            })
        } else {
            res.status(401).json({
                message: "Invalid Credentials"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

// login with otp 
const loginWithotp = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        // generate otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        await sendEmail(
            email,
            "Your OTP for AI Cold Mail Generator",
            `Your OTP code is ${otp}. It is valid for 10 minutes only`
        );

        return res.status(200).json({               
                // _id: user._id,
                // name: user.name,
                // email: user.email,
                // token: genrateToken(user._id),
                message: "Otp sent sucessfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


const verifyUser = async (req, res) => {
    try {
        const { email, otp } = req.body
        // check feilds 
        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and otp is required"
            })
        }
        const userExist = await User.findOne({ email })

        if (!userExist) {
            return res.status(400).json({
                message: "User Not Found"
            })
        }
        // verify otp 
        if (userExist.otp !== otp) {
            return res.status(400).json({
                message: "Invalid otp"
            })
        }
        //  expired OTP
        if (userExist.otpExpiry < Date.now()) {
            return res.status(400).json({
                message: "OTP expired"
            })
        }
        //  verify user
        userExist.isVerified = true;
        userExist.otp = null;
        userExist.otpExpiry = null;

        await userExist.save();

        return res.status(200).json({
              _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
            isVerified: userExist.isVerified,
            token: genrateToken(userExist._id),
            message: "User verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const genrateToken = (id) => {

    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
    return token
}


module.exports = { loginUser, registerUser, verifyUser, loginWithotp }