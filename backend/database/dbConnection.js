import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'Learningone'
    }).then(() => {
        console.log('Successfully connected to database');
    }).catch(err=>{
        console.log(`Some errror occured while connection to database: ${err}`);
    });
};

//