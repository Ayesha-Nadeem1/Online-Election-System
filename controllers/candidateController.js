const Candidate = require('../models/election');
const cookieParser = require('cookie-parser');

const {getUser}=require('../utils/auth')

async function createElection(req, res) {
    try {
        const { electionName, startDate, endDate, province, city, region,electionType,description } = req.body;
        console.log(electionName, startDate, endDate, province, city, region,electionType,description)
        const token = req.cookies.uid;

          const decoded=getUser(token);
          const userId = decoded.user_id;

        const newElection = new Election({
            Name: electionName,
            StartDate: startDate,
            EndDate: endDate,
            Province: province,
            City: city,
            Region: region,
            CreatedBy:userId,
            ElectionType: electionType,
            Description:description
        });

        // Save the new user to the database
        await newElection.save();
        // setTimeout(() => {
        //     res.redirect("/admin/election");
        // }, 1000);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}