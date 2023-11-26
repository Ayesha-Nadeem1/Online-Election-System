const Candidate = require('../models/candidate');

const { getUser } = require('../utils/auth')

async function createCandidate(req, res) {
    try {
        const { firstName, lastName, dob, cnic,phoneNumber,province, city, region, address } = req.body;
        const token = req.cookies.uid;

        const User  = getUser(token);
        const userId = User._id; // Accessing the _id field

        const newCandidate = new Candidate({
            FirstName:firstName,
            LastName:lastName,
            DOB:dob,
            CNIC:cnic,
            PhoneNumber:phoneNumber,
            Province:province,
            City:city,
            Region:region,
            Address:address,
            CreatedBy:userId       
        });
        // Save the new user to the database
        await newCandidate.save();
        // setTimeout(() => {
        //     res.redirect("/admin/election");
        // }, 1000);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getAllCandidate = async () => {
    try {
        // Fetch data from MongoDB (using Mongoose or other methods)
        const candidates = await Candidate.find({}).populate('CreatedBy', 'UserName'); // Example query, adjust as needed
        return candidates; // Return the fetched data
    } catch (err) {
        throw new Error(err.message); // Handle any errors and throw them for handling in the route handler
    }
};
async function getAllCandidatesJSON(req,res)
{
    try{
        const Candidates = await Candidate.find();
        res.json(Candidates);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
async function updateCandidate(req, res) {
    try {
      const {
        firstName, // This might be different from 'name' in your Election model
        lastName,
        dob,
        cnic,
        phoneNumber,
        province,
        city,
        region,
        address,
      } = req.body;
  
      const { id } = req.params;
  
      // Assuming 'electionName' maps to 'name' in the Election model
      const updateCandidate = await Candidate.findByIdAndUpdate(id, {
        Name: firstName,
        StartDate:lastName,
        DOB:dob,
        CNIC:cnic,
        PhoneNumber:phoneNumber,
        Province:province,
        City:city,
        Region:region,
        Address:address
        }, { new: true });
      
      res.json(updateCandidate);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
async function deleteCandidate(req,res){
    try{
        const { id }=req.params;
        const deleteCandidate = await Candidate.findByIdAndDelete(id,req.body,{new:true});
        res.json(deleteCandidate);
    }
    catch(err){
        res.status(500).json({  error:err.message});
    }
}
module.exports = {
    createCandidate,getAllCandidate,deleteCandidate,updateCandidate,getAllCandidatesJSON,
};
