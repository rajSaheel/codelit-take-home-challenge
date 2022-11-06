const express = require('express');
const { TeamMember } = require('./model');

const app = express();

app.use(express.json())

app.get('/team', async (req, res, next) => {
  const team = await TeamMember.findAll();
  return res.json(team);
});

app.post('/team',async(req,res,next)=>{
  try{
    const newMember= await TeamMember.create({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      title:req.body.title,
      story:req.body.story,
      favoriteColor:req.body.color,
      photoUrl:req.body.photo
    });
  }catch(e){console.log("Please fill all the required inputs");}
  const team = await TeamMember.findAll();
  res.send(team);
})

module.exports = app;