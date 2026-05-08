const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// genrate email 

const generateColdEmail = async (prompt) => {
  try {
   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    // Safety check: ensure the response exists
    if (!result.response) {
       throw new Error("No response received from Gemini");
    }

    return result.response.text();
  } catch (error) {
    // If you hit a rate limit, this message will tell you
    console.error("Gemini Error:", error.message);
    throw error;
  }
};

// edit email 

const editEmail = async (originalEmail, instruction) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are an email editor.

Original Email:
${originalEmail}

Instruction:
${instruction}

Rules:
- Modify the email based on instruction
- Keep it natural and human-like
- Do not add placeholders
- Keep it concise if asked

Output only final email.
`;

    const result = await model.generateContent(prompt);
    return result.response.text();

  } catch (error) {
    console.log("Edit Email Error:", error.message);
    throw error;
  }
};

module.exports = {generateColdEmail,editEmail};