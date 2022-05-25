const {DataTypes} = require('sequelize');
const db=require('../dbconfig');

const user= db.define('user',{
    username:{
        type:DataTypes.STRING,
        notEmpty:true,   
    },
    email:{
        type:DataTypes.STRING,
        notEmpty:true,   

    },
    password:{
        type:DataTypes.STRING,
        notEmpty:true,   
    },


});
module.exports=user;