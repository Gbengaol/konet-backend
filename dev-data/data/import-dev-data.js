const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB Connection Successful'));

//READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

//IMPORT DATA INTO DB (Run command below to do this)
            // node dev-data/data/import-dev-data.js --import 
const importData = async () => {
    try{
        await User.create(users, { validateBeforeSave: false })
        console.log('Data successfully loaded!')
    } catch(err){
        console.log(err)
    }
    process.exit()
}

//DELETE ALL DATA FROM DATABASE (Run command below to do this)
            // node dev-data/data/import-dev-data.js --delete 
const deleteData = async () => {
    try{
        await User.deleteMany()
        console.log('Data successfully deleted!');
    } catch(err){
        console.log(err)
    }
    process.exit()
}

if(process.argv[2] === '--import'){
    importData();
} else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv); // An array of arguments of running node process