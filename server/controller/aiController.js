const {generateColdEmail, editEmail} = require("../utils/geminiApi");
const Email = require("../models/emailModel");
// const emailModel = require("../models/emailModel");

const generateEmail = async (req, res) => {

    try {
        const { from, to, purpose, tone, instructions } = req.body;
        if (!from || !to || !purpose || !tone ) {
            return res.status(400).json({
                message: "Please Fill All Details"
            })
        }
        const prompt = `
        Write a professional cold email.

Details:
- From: ${from}
- To: ${to}
- Purpose: ${purpose}
- Tone: ${tone || "professional"}
-instructions ${instructions}

Instructions:

- Make it personalized and human-like
- Clearly explain the purpose
- Add a strong opening line (hook)
- End with a polite call-to-action

Output format:
Subject:
Email:
`;

        const email = await generateColdEmail(prompt);

            // save to DB
    const savedEmail = await Email.create({
      user: req.user?._id, 
      to :to,
      purpose : purpose,
      tone : tone,
      from :from,
      instructions : instructions,
      content: email,
      type: "generated"
    });

        return res.json({
            success: true,
            email
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};



const allGenratedemails = async (req, res) => {
    try {
        const emails = await Email.find({
            user: req.params.user
        });

        if (emails.length === 0) {

            return res.status(400).json({
                message: "No generated Emails!"
            });

        }

        res.status(200).json(emails);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const singleEmail = async(req,res)=>{
    try {
        const singleEmail = await Email.findById(req.params.id)
        if(!singleEmail){
            res.status(400).json({
                message : "No email found!"
            })
        }
        res.status(200).json(singleEmail)
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}
const DeleteEmail = async(req,res)=>{
    try {
        const deleteSingleEmail = await Email.findByIdAndDelete(req.params.id)
        if(!deleteSingleEmail){
            res.status(400).json({
                message : "No email found!"
            })
        }
        res.status(200).json({
            message : "Email Deleted",
             id: req.params.id
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}


module.exports = { generateEmail,allGenratedemails,singleEmail,DeleteEmail };