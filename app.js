const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const app = express();
const bcrypt = require('bcrypt');

// Set EJS as templating engine with ejs-mate
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Route for home page
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/demo", (req,res)=>{
    res.render("demo");
})

app.post("/validate", (req,res)=>{
    alert("Incoming Otp...");
    
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
