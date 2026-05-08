const express = require("express")
const { generateEmail, allGenratedemails, singleEmail, DeleteEmail } = require("../controller/aiController")
const protect = require("../middleware/authMiddleware")
const router = express.Router()



router.post("/generate",protect,generateEmail)
router.get("/generated/:user",protect,allGenratedemails)
router.get("/single/:id",protect,singleEmail)
router.delete("/delete/:id",protect,DeleteEmail)



module.exports = router