import express from 'express';
import  { createPrompt, createQuiz, getAllPrompts, getAllQuizzes, getPromptById, getQuizById, updatePrompt, deletePrompt, updateQuiz, deleteQuiz } from '../controllers/controller.js';

const router = express.Router();

router.post('/prompts', createPrompt);
router.post('/quizzes', createQuiz);

router.get('/prompts', getAllPrompts);
router.get('/quizzes', getAllQuizzes);

router.get('/prompts/:id', getPromptById);
router.get('/quizzes/:id', getQuizById);

router.put('/prompts/:id', updatePrompt);
router.delete('/prompts/:id', deletePrompt);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);

// router.put('/prompts/:id', updatePrompt);
// router.delete('/prompts/:id', deletePrompt);

export default router;