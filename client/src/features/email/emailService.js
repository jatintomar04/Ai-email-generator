import axios from "axios";

const API_URL = "https://ai-email-generator-53ei.onrender.com/api.email";

// generate email
const generateEmail = async (formData, token) => {
    console.log(token)

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(
        `${API_URL}/generate`,
        formData,
        config
    );

    return response.data;
};

// get all email
const AllEmails = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(
        `${API_URL}/generated/${id}`,
        config
    );

    return response.data;
};
//  single email
const singleEmail = async (id, token) => {
   
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(
        `${API_URL}/single/${id}`,
        config
    );

    return response.data;
};

const deleteEmail = async (id, token) => {
    console.log(id,token)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(
        `${API_URL}/delete/${id}`,
        config
    );

    return response.data;
};

const emailService = {
    generateEmail,
    deleteEmail,
    AllEmails,
    singleEmail
};

export default emailService;