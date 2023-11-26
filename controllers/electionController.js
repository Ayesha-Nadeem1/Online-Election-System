const Election = require('../models/election');
const cookieParser = require('cookie-parser');
const {getUser}=require('../utils/auth')

async function createElection(req, res) {
    try {
        const { electionName, startDate, endDate, province, city, region,electionType,description } = req.body;
        console.log(electionName, startDate, endDate, province, city, region,electionType,description)
        const token = req.cookies.uid;

        const User  = getUser(token);
        const userId = User._id; // Accessing the _id field

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
        setTimeout(() => {
            res.redirect("/admin/election");
        }, 100);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const getAllElection = async () => {
    try {
        // Fetch data from MongoDB (using Mongoose or other methods)
        const elections = await Election.find({}).populate('CreatedBy', 'UserName');  // Example query, adjust as needed
        return elections; // Return the fetched data
    } catch (err) {
        throw new Error(err.message); // Handle any errors and throw them for handling in the route handler
    }
};

async function getAllElec(req,res)
{
    try{
        const user = await Election.find();
        res.json(user);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
async function updateElection(req, res) {
    try {
      const {
        electionName, // This might be different from 'name' in your Election model
        startDate,
        endDate,
        province,
        city,
        region,
        electionType,
        description
      } = req.body;
  
      const { id } = req.params;
  
      // Assuming 'electionName' maps to 'name' in the Election model
      const updateElection = await Election.findByIdAndUpdate(id, {
        Name: electionName,
        StartDate:startDate,
        EndDate:endDate,
        Province:province,
        City:city,
        Region:region,
        ElectionType:electionType,
        Description:description
      }, { new: true });
      
      res.json(updateElection);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
async function deleteElection(req,res){
    try{
        const { id }=req.params;
        const deleteElection = await Election.findByIdAndDelete(id,req.body,{new:true});
        res.json(deleteElection);
    }
    catch(err){
        res.status(500).json({  error:err.message});
    }
}
module.exports = {
    createElection,getAllElection,updateElection,deleteElection,getAllElec,
};
