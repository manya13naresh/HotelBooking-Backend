const Sequelize=require('sequelize');

const db=new Sequelize('hotelbooking','admin','Manya1301',{
    host:'database-1.czagcrnlfmqg.us-west-2.rds.amazonaws.com',
    dialect:'mysql',
    define:{
        timestamps:false,
        freezeTableName:true
    }
});

module.exports=db;