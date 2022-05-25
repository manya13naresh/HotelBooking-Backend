const {DataTypes} = require('sequelize');
const db=require('../dbconfig');

const place = db.define('locationdb',{
    id:{
        type:DataTypes.STRING,
        notEmpty:true,   
        primaryKey:true,
        autoIncrement:true,
    },
    location:{
        type:DataTypes.INTEGER,
        notEmpty:true,

    }
});
module.exports=place;