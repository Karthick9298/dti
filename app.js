// const express = require("express");
// const path = require("path");
// const engine = require("ejs-mate");
// const app = express();
// const bcrypt = require('bcrypt');
// const mongoose = require("mongoose");

// const OTP  = require("./models/Otp/js");

// // Set EJS as templating engine with ejs-mate
// app.use(express.urlencoded({ extended: true }));
// app.engine("ejs", engine);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // Serve static files from the public directory
// app.use(express.static(path.join(__dirname, "public")));


// await mongoose.connect("mongodb://127.0.0.1:27017/otpApp", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("✅ Connected to MongoDB"))
// .catch((err) => console.error("❌ MongoDB connection error:", err));


// // Route for home page
// app.get("/", (req, res) => {
//     res.render("index");
// });


// const otp = "";// ❌ Error: Assignment to constant variable
// app.get("/demo", async (req,res)=>{
//     let {phoneNumber, otp, ipAddress} = req.body;
//     const otpHash = await bcrypt.hash(otp, 10);
//     otp = new OTP({
//         phoneNumber,otp: otpHash, ipAddress
//     })
//     res.render("demo");
// })

// app.post("/validate", async (req,res)=>{
//     let savedOtp = await otp.save();
//     console.log("Saved otp");
//     res.render("agree");    
// })

// app.get("/accept-otp", (req,res)=>{

// })

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const OTP  = require("./models/Otp.js");

// Set EJS as templating engine with ejs-mate
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the public directory
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))


mongoose.connect("mongodb://127.0.0.1:27017/otpApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


// Route for home page
app.get("/", (req, res) => {
    res.render("index");
});

// let otp;
// app.get("/demo", (req,res)=>{
//     res.render("demo");
// })

// app.post("/validate", async (req,res)=>{
//     let {phoneNumber, otp, ipAddress} = req.body;
//     let otpHash = await bcrypt.hash(otp,10);
//     otp = new OTP({
//         phoneNumber,otp: otpHash, ipAddress
//     })
//     res.render("agree");    
// })

// app.get("/accept-otp", async (req,res)=>{
//     let saved  = await otp.save();
//     console.log(saved);
//     res.send("Otp saved successfully ");
// })

let otp; // ✅ Declare it with 'let'

app.get("/demo", (req,res)=>{
    res.render("demo");
})

app.post("/validate", async (req,res)=>{
    let {phoneNumber, otp: rawOtp, ipAddress} = req.body; // 🛑 Avoid naming conflict
    let otpHash = await bcrypt.hash(rawOtp,10);

    otp = new OTP({
        phoneNumber,
        otp: otpHash,
        ipAddress
    });

    res.render("agree");    
})

app.get("/accept-otp", async (req,res)=>{
    let saved = await otp.save(); // ✅ Now otp is the correct object
    console.log(saved);
    res.render("dashboard");
})



// Start the server
app.listen(3000, () => {
    console.log(`server is running on port 3000`);
});