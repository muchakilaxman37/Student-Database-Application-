const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Student = require("./models/Student");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));


// HOME PAGE
app.get("/", async (req, res) => {
    const students = await Student.find();
    res.render("index", { students });
});


// ADD FORM
app.get("/add", (req, res) => {
    res.render("add");
});


// INSERT
app.post("/add", async (req, res) => {
    await Student.create(req.body);
    res.redirect("/");
});


// EDIT FORM
app.get("/edit/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.render("edit", { student });
});


// UPDATE
app.put("/edit/:id", async (req, res) => {
    await Student.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    res.redirect("/");
});


// DELETE
app.delete("/delete/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/");
});


app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});