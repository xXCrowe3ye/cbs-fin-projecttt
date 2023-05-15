const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const loggedin = async (req, res, next) => {

    console.log("Cookies: ", req.cookies);
    if(!req.cookies.userRegistered) return next();

    try {
        if(req.cookies.userRegistered) {
            const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
            const user = await prisma.user.findUnique({ where: { id: String(decoded.id) } });
            
            if(user) {
                req.user = user;
                req.user.status = "loggedin";
            } else {
                req.user = { status: "no" };
            }
        } else {
            req.user = { status: "no" };
        }
        next();
    } catch (err) {
        console.error("Error in loggedin middleware: ", err);
         if(err) return next();
        next();
    }
}

module.exports = loggedin;
