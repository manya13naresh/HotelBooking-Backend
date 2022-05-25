const express =require('express');
const admin = express.Router();
const user= require('../model/user')
const admindb=require('../model/admindb');
const place=require('../model/locationdb');
const hotel =require('../model/hoteldb');

const bodyparser=require('body-parser');
const bcrypt = require('bcrypt');
admin.use(bodyparser.json()) 
admin.use(bodyparser.urlencoded({ extended: true }));
const cors = require('cors')
admin.use(cors());

const authtoken=require('../authtoken')
const refreshtoken=require('../refreshtoken')
const jwt= require('jsonwebtoken')
require('dotenv').config()
const passport=require('passport');
require('../passport');

admin.post('/adminlogin', async(req,res) => { 
    const {email,password}= req.body;
    const admin1 = await admindb.findOne({where: {email:email,password:password}});
    if(admin1) 
    {
        const jwtToken = authtoken.generateJwt(admin1)
        const refreshToken = refreshtoken.generateRefreshtoken(admin1)
        return res.status(200).send({ jwtToken: jwtToken,refreshToken:refreshToken })
        // res.status(200).send('Valid Admin!')    
    }
      else
        res.status(404).send('Admin not found !')        
})
 admin.post('/adminaddLocation',passport.authenticate('token',{session:false}),async(req,res)=>{
    const {location,hotelname,rating,image,singlebed,doublebed,deluxe} = req.body;
    const checklocation= (await place.findOne({ where: {location:location} }))? true:false;
    if(checklocation){
         const checkhotel = (await hotel.findOne({ where: {hotelname: hotelname} }))? true:false;
         if(checkhotel) {
        res.status(404).send("Hotel exists !")
              }

            else {
                    
                     const addhotel = await hotel.create({location:location,hotelname:hotelname,rating:rating,
            image:image, singlebed:singlebed,doublebed:doublebed,deluxe:deluxe});
        res.status(200).send("Hotel Added successfully...");    
                            }


        
    }
    else{
           
            res.status(404).send("No location found");

    }
}) 
admin.get('/gethotels',passport.authenticate('token',{session:false}), async (req, res) => {

  const gethotels = await hotel.findAll();
  if (gethotels != null)
      res.status(200).send(gethotels)
  else
      res.status(404).error(err)

})
admin.get('/deletelocation/:hotelname',passport.authenticate('token',{session:false}),async(req,res)=>{
  const checkhotel = await hotel.findOne({ where: { hotelname: req.params.hotelname } });
  

  if (checkhotel != null ) {
      const deletehotel = await hotel.destroy({ where: { hotelname: req.params.hotelname } })
     // res.status(200).send("Hotel removed successfully...");
     res.status(200).send({ "message": "Hotel removed successfully... with hotelname: " +req.params.hotelname });
  }
  else {
      res.status(404).send("Your credentials are wrong")
  }

})
module.exports=admin; 