const Sequelize=require('sequelize');

const db=new Sequelize('hotelbooking','root','Manya@1301',{
    host:'localhost',
    dialect:'mysql',
    define:{
        timestamps:false,
        freezeTableName:true
    }
});

module.exports=db;