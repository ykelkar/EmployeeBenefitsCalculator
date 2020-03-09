const express = require('express');
const router = express.Router();

const Employee = require('../models/employee');

//retrieving employees
router.get('/employees', (req, res, next)=> {
    Employee.find(function(err, employees) {
        if (err) {
            res.json({msg: "Failed to retrieve employee data: " + err});
        } else {
            res.json(employees);
        }
        
    })
});

//add employee
router.post('/employee', (req, res, next) => {
    let newEmployee = new Employee({
        name: req.body.name,
        dependents: req.body.dependents,
        costPaycheck: req.body.costPaycheck,
        costYear: req.body.costYear
    });
    newEmployee.save((err, employee) => {
        if (err) {
            res.json({msg: 'Failed to add employee: ' + err});
        } else {
            res.json(employee);
        }
    });
});

//delete employee
router.delete('/employee/:id', (req, res, next) => {
    Employee.remove({_id: req.params.id}, function(err, result) {
        if (err) {
            res.json({msg: 'Failed to delete employee: ' + err});
        } else {
            res.json(result);
        }
    })
});
module.exports = router;