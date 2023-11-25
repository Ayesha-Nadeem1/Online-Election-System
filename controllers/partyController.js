const Party = require('../models/party');

const { getUser } = require('../utils/auth')

async function createParty(req, res) {
    try {
        const { partyName, partySign } = req.body;
        const token = req.cookies.uid;
        const decoded = getUser(token);
        const userId = decoded.user_id;
        const newParty = new Party({
            Name: partyName,
            Sign: partySign,
            CreatedBy: userId
        });

        // Save the new user to the database
        await newParty.save();
             setTimeout(() => {
            res.redirect("/admin/party");
        }, 100);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getAllParties = async () => {
    try {
        // Fetch data from MongoDB (using Mongoose or other methods)
        const parties = await Party.find({}); // Example query, adjust as needed
        return parties; // Return the fetched data
    } catch (err) {
        throw new Error(err.message); // Handle any errors and throw them for handling in the route handler
    }
};
async function deleteParty(req,res){
    try{
        const { id }=req.params;
        const deleteParty = await Party.findByIdAndDelete(id,req.body,{new:true});
        res.json(deleteParty);
    }
    catch(err){
        res.status(500).json({  error:err.message});
    }
}

async function updateParty(req, res) {
    try {
      const {
        partyName, // This might be different from 'name' in your Election model
        partySign   
      } = req.body;
  
      const { id } = req.params;
  
      // Assuming 'electionName' maps to 'name' in the Election model
      const updateParty = await Party.findByIdAndUpdate(id, {
        Name: partyName,
        Sign:partySign,
       
      }, { new: true });
      
      res.json(updateParty);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async function getAllParty(req,res)
{
    try{
        const user = await Party.find();
        res.json(user);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
module.exports = {
    createParty,getAllParties,deleteParty,updateParty,getAllParty,
};
