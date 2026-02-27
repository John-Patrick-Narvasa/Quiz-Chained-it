import { db } from '../configs/db.js';

// CRUD operations for quizzes

// create quiz
export const createQuiz = async (req, res) => {
    const { prompt_id, title, description, questions } = req.body;

    if (!prompt_id || !title || !questions) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await db.query(
            'INSERT INTO quizzes (prompt_id, title, description, questions) VALUES ($1, $2, $3, $4) RETURNING *',
            [prompt_id, title, description || null, JSON.stringify(questions)]
        );
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Failed to create quiz' });
    }
}

// get all quizzes
export const getAllQuizzes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM quizzes');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
}

// get quiz by id
export const getQuizById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM quizzes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ error: 'Failed to fetch quiz' });
    }
}

// update quiz
export const updateQuiz = async (req, res) => {
    const { id } = req.params;
    const { title, description, questions } = req.body;
    try {       
    const result = await db.query(
        `UPDATE quizzes 
        SET title = COALESCE($1, title), 
            description = COALESCE($2, description), 
            questions = COALESCE($3, questions) 
        WHERE id = $4 RETURNING *`,
        [title || null, description || null, questions ? JSON.stringify(questions) : null, id]
    );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({ error: 'Failed to update quiz' });
    }
}

// delete quiz
export const deleteQuiz = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM quizzes WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ error: 'Failed to delete quiz' });
    }
}