const express = require("express");
const loggedin = require("../controllers/loggedin")
const logout = require("../controllers/logout")
const userDetailsController = require("../controllers/userDetails");

const router = express.Router();

router.get("/", loggedin, (req, res) => {
    if(req.user){
        res.render("index", {status: "loggedin", user: req.user});
    } else {
        res.render("index", {status: "no", user: {}});
    }
});


router.get("/profile", loggedin, (req, res) => {
    res.render("profile", {user: req.user});
})

router.get("/register", (req, res) => {
    res.sendFile("register.html", {root:"./public"});
})

router.get("/login", loggedin, (req, res) => {
    res.sendFile("login.html", {root:"./public/"});
})

router.get("/index", (req, res) => {
    res.sendFile("index.ejs", {root:"./views/"});
})

router.get("/logout", logout)

router.get('/user-details', loggedin, userDetailsController.getAllUserDetails);

//crud

router.get('/user-details/edit/:userId', loggedin, userDetailsController.getEditUserDetails);
router.post('/user-details/update/:userId', loggedin, userDetailsController.updateUserDetails);
router.get('/user-details/delete/:userId', loggedin, userDetailsController.deleteUserDetails);
//visualization
router.get('/visualize', loggedin, userDetailsController.getVisualizePage);



module.exports = router;
