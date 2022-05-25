const express =require('express');
const user=require('../model/user');
const admindb=require('../model/admindb');
const place =require('../model/locationdb');
const hotel = require('../model/hoteldb');
const admin=require('../router/admin-route') 
const app=express();

const bodyparser=require('body-parser');
const bcrypt = require('bcrypt');
app.use(bodyparser.json()) 
app.use(bodyparser.urlencoded({ extended: true }))
const cors = require('cors')
app.use(cors());

const jwt= require('jsonwebtoken')
require('dotenv').config()
const authtoken=require('../authtoken')
const refreshtoken=require('../refreshtoken')
const passport=require('passport');
require('../passport');


app.use('/admin', admin) 

app.get('/',async(req,res)=>{
    res.send("welcome to VACAYHOME")
})
app.post('/token',passport.authenticate('refresh',{session:false}),async(req,res)=>{
    refreshTokenFromHeader = req.headers.authorization.split(' ')[1];
    const userFound = {id:req.user.sub}
    const jwtToken = authtoken.generateJwt(userFound)
    console.log(req.user.sub)
    res.status(201).json({ jwtToken: jwtToken })


})
app.post('/register', async(req,res) => {

    const {username, email, password} = req.body;

    const checkemail = (await user.findOne({ where: {email: email} }))? true:false;

    if(checkemail) {
        res.status(404).send({ "message": "User Exists" });
       // res.status(404).send("User exists !")
    }
    
    else { 
        const hidepassword = await bcrypt.hash(password, 5);
        const UserData = await user.create({username:username, 
            email:email, password:hidepassword});
            res.status(200).send({ "message": "Registered successfully" });
        //res.status(200).send("Registered successfully...");
    } 

})
 app.post('/login', async(req,res) => { 
    const {email, password}= req.body;
    const user1 = await user.findOne({where: {email: email}});
    if(user1!=null) {
        bcrypt.compare(password, user1.password).then(ValidUser => {
            if(ValidUser){
            const jwtToken = authtoken.generateJwt(user1)
            const refreshToken = refreshtoken.generateRefreshtoken(user1)

             return res.status(200).send({ jwtToken: jwtToken,refreshToken:refreshToken })
            }
            else
                console.log('User not found !')
            
        })
    }
}) 

/* app.get('/location',passport.authenticate('token',{session:false}),async(req,res)=>{
    const {date,duration,location} = req.body;
    const checklocation= (await place.findOne({ where: {location:location} }))? true:false;
    if(checklocation){
        res.status(404).send("Location Selected !") 
    }
    else
    res.status(404).send('Enter valid location !')    
}) */

app.get('/hotel/:location',passport.authenticate('token',{session:false}),async(req,res)=>{
     
    const checkhotel = (await hotel.findOne({where:{location:req.params.location}}));
    if(checkhotel!=null){
        const disp = await hotel.findAll({where:{location:req.params.location}});
        res.send(disp);
    }
})

app.listen(9000,()=>{
    console.log('Server running in port-9000')
})