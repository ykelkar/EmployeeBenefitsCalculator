const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    dependents: {
        type: []
    },
    costPaycheck: {
        type: Number
    },
    costYear: {
        type: Number
    }
});

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema);