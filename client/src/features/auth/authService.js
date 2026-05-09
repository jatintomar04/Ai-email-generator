import axios from 'axios'


const register = async(formData) => {

   const response = await axios.post(`https://ai-email-generator-53ei.onrender.com/api/auth/register`, formData);
   localStorage.setItem("user", JSON.stringify(response.data));
  
   return response.data
}


const login = async(formData) => {
  
   console.log(formData)
   const response = await axios.post(`https://ai-email-generator-53ei.onrender.com/api/auth/login`, formData);
   localStorage.setItem("user", JSON.stringify(response.data));
   console.log(response.data)
   return response.data
}


const loginwithEmail = async(email) => {
  
   console.log(email)
   const response = await axios.post(`https://ai-email-generator-53ei.onrender.com/api/auth/login/otp`, email);
   console.log(response.data)
   return response.data
}

const verifyOtp = async(formData) => {
  
   console.log(formData)
   const response = await axios.post(`https://ai-email-generator-53ei.onrender.com/api/auth/verify-otp`, formData);
   localStorage.setItem("user", JSON.stringify(response.data));
   return response.data
}
const authService = {register , login , verifyOtp, loginwithEmail};

export default authService;