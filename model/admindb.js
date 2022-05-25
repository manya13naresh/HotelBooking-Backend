const {DataTypes} = require('sequelize');
const db=require('../dbconfig');

const admin = db.define('admindb',{
    
    email:{
        type:DataTypes.STRING,
        notEmpty:true,   

    },
    password:{
        type:DataTypes.STRING,
        notEmpty:true,   
    },


});
module.exports=admin;