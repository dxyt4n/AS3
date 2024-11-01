const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Tạo sinh viên mới
router.post("/", async (req, res) => {
    try {
        const { name, studentCode, isActive } = req.body;
        const student = new Student({ fullName: name, studentCode, isActive });
        await student.save();
        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: student
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Lấy tất cả sinh viên
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json({ success: true, data: students });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Lấy sinh viên theo ID
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        res.json({ success: true, data: student });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Cập nhật sinh viên theo ID
router.put("/:id", async (req, res) => {
    try {
        const { name, isActive } = req.body;
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { fullName: name, isActive },
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        res.json({
            success: true,
            message: "Student updated successfully",
            data: student
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Xóa sinh viên theo ID
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        res.json({ success: true, message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
