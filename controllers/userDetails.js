const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllUserDetails = async (req, res) => {
    const userDetails = await prisma.userDetails.findMany();
    res.render('userDetails', { userDetails: userDetails });
};

exports.getEditUserDetails = async (req, res) => {
    const userId = req.params.userId;
    const userDetails = await prisma.userDetails.findUnique({ where: { userId: userId } });
    res.render('editUserDetails', { userDetails: userDetails }); // 'editUserDetails' is your EJS template for editing user details
};

exports.updateUserDetails = async (req, res) => {
    const userId = req.params.userId;
    const updateData = req.body;
    await prisma.userDetails.update({ where: { userId: userId }, data: updateData });
    res.redirect('/userDetails');
};

exports.deleteUserDetails = async (req, res) => {
    const userId = req.params.userId;
    await prisma.userDetails.delete({ where: { userId: userId } });
    res.redirect('/userDetails');
};

// In userDetailsController.js
exports.getVisualizePage = async (req, res) => {
    const userDetails = await prisma.userDetails.findMany();
    
    // Transform the data for the charts
    const cityCounts = {};
    const regionCounts = {};
    const countryCounts = {};
    const genderCounts = {};
    const civilStatusCounts = {};

    userDetails.forEach(details => {
        cityCounts[details.city] = (cityCounts[details.city] || 0) + 1;
        regionCounts[details.region] = (regionCounts[details.region] || 0) + 1;
        countryCounts[details.country] = (countryCounts[details.country] || 0) + 1;
        genderCounts[details.gender] = (genderCounts[details.gender] || 0) + 1;
        civilStatusCounts[details.civilStatus] = (civilStatusCounts[details.civilStatus] || 0) + 1;
    });

    res.render('visualize', {
        cityCounts,
        regionCounts,
        countryCounts,
        genderCounts,
        civilStatusCounts,
    });
};
