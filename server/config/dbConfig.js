const  mongoose = require("mongoose")
require("dotenv").config()
const dns = require("dns")

dns.setServers([
    '1.1.1.1',
   '8.8.8.8'
])

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB CONNECTION SUCCESS : ${conn.connection.name}`)
        
    } catch (error) {
        console.log(`DB CONNECTION FAILD`,error.message)
    }
}

module.exports = connectDB