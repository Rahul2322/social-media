const mongoose = require('mongoose');

exports.dbConnection = ()=>{
    console.log(process.env.MONGO_URL,'MONGO_URL')
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
    const connection = mongoose.connection;
    connection.once('open',()=>{
        console.log("Connections are successfull")
    })

    connection.on("error",()=>{
        console.log("Something Went Wrong")
    })
}

