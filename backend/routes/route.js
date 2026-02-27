import express from 'express';
import { createPrompt, getAllPrompts, getPromptById, updatePrompt, deletePrompt } from '../controllers/prompt_controllers.js'; 
import { createQuiz, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz } from '../controllers/quiz_controllers.js';

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

export default router;