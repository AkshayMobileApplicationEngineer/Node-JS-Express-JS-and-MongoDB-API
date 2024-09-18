const mongoose = require('mongoose');

// Define the Student schema table name
const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone :{
        type:String,
        maxlenght:[12,'Please no can not  be more than 12'],

    },
    regd_no:String,
    gender:String,
    address:String
});

// Create a model from the schema
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
