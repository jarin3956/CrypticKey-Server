require('dotenv').config();
const {connect} = require('mongoose');

const connectDB = () => {
    connect(process.env.MONGO_URL).then(() => {
        console.log("MongoDB Connected");
    }).catch((er) => {
        console.error(er.message);
    })
}

module.exports = connectDB