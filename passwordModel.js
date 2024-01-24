const mongoose =  require('mongoose');

const passwordSchema = new mongoose.Schema({
    name:{type: String,required:true},
    password:{type: String,required:true},
    createdAt: { type : Date , default:Date.now }
})

const passwordModel = mongoose.model('password',passwordSchema);
module.exports=passwordModel;