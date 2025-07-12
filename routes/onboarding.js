const express = require('express');
const Question = require('../models/Question');
const dotenv = require('dotenv');
const { userAuth } = require('../middleware/auth'); 
const router = express.Router();

dotenv.config();


//get all questions
router.get('/questions', userAuth, async (req, res) => {
    try {
        const questions = await Question.find();
        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: 'No questions found' });
        }
        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// get a specific question by id
router.get('/questions/:id', userAuth, async (req, res) => {
    const questionId = req.params.id;
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ question });
    } catch (error) {
        console.error('Error fetching question:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// get question by order(question number)
router.get('/questions/order/:order', userAuth,  async (req, res) => {
    const order = parseInt(req.params.order, 10);
    if (isNaN(order)) {
        return res.status(400).json({ message: 'Invalid order number' });
    }
    try {
        const question = await Question.findOne({ order });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ question });
    } catch (error) {
        console.error('Error fetching question by order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;