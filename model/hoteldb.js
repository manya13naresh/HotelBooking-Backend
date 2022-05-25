const {DataTypes} = require('sequelize');
const db=require('../dbconfig');

const hotel = db.define('hoteldb',{
    id:{
        type:DataTypes.INTEGER,
        notEmpty:true,   
        primaryKey:true,
        autoIncrement:true,
    },
    hotelname:{
        type:DataTypes.STRING,
        notEmpty:true,

    },
    location:{
        type:DataTypes.STRING,
        notEmpty:true,
    },
    rating:{
        type:DataTypes.DOUBLE,
        notEmpty:true,

    },
     singlebed:{
        type:DataTypes.INTEGER,
        notEmpty:true,

    },
    doublebed:{
        type:DataTypes.INTEGER,
        notEmpty:true,

    },
    deluxe:{
        type:DataTypes.INTEGER,
        notEmpty:true,

    },
    image:{
        type:DataTypes.STRING,
      notEmpty:true,

    }
   
});
module.exports=hotel;