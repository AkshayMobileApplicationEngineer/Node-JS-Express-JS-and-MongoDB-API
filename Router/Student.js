const express = require('express');
const router = express.Router();
const Student = require('../Model/Student');

/**
 * Add student API
 * Method: POST
 */
router.post('/addStudent', async (req, res, next) => {
    console.log("Add Student API");
    console.log(req.body);

    try {
        const student = await Student.findOne({ phone: req.body.phone });
        if (student) {
            return res.status(400).json({
                success: false,
                message: "Student already exists"
            });
        }

        const newStudent = await Student.create(req.body);
        return res.json({
            success: true,
            message: "Student added successfully",
            Student: newStudent
        });
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});


/**
 * Get all Student Data
 * Method : GET
 */

router.get('/addStudent', async(req, res,next) => {
  console.log("Get All Student API");
  
    try {
        const  student = await Student.find();
        res.json({
            success:true,
            total:student.length,
            message:"Student Data Fetched Successfully",
            student:student
        });

    } catch (error) {
        next(error);
    }

});

/***
 * Get Single  Student Data
 * Method:GET
 */


const mongoose = require('mongoose');

router.get('/SingleStudent/:id', async (req, res, next) => {
    console.log("Get Single Student API");
    
    try {
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Student ID"
            });
        }

        // Find the student by ID
        const student = await Student.findById(req.params.id);

        // If student is not found, return 404
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });
        }

        // If student is found, return the data
        res.json({
            success: true,
            message: "Student Data Fetched Successfully",
            student: student
        });

    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
});

/**
 * Update a single data
 * method :PUT

 */
router.put('/UpdateStudent/:id', async (req, res, next) => {
    console.log("Update Student API");

    try {
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Student ID"
            });
        }

        // Find the student by ID
        const student = await Student.findById(req.params.id);
        
        // If student is not found, return 404
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });
        }

        // Update the student details
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,        // Return the updated student document
            runValidators: true // Ensure that the validation rules in the schema are respected
        });

        // Return the updated student data
        res.json({
            success: true,
            message: "Student Updated Successfully",
            student: updatedStudent
        });

    } catch (error) {
        next(error);
    }
});

/***
 * Delete  a single data
 * Method  :DELETE
 */
router.delete('/DeleteStudent/:id', async (req, res, next) => {
    console.log("Delete Student API");

    try {
        // Find and delete the student by ID
        const student = await Student.findByIdAndDelete(req.params.id);

        // If student is not found, return 404
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });
        }

        // Return success message with the deleted student data
        res.json({
            success: true,
            message: "Student Deleted Successfully",
            student: student
        });

    } catch (error) {
        next(error);
    }
});


module.exports = router;
