import { db } from '../configs/db.js';

// CRUD operations for quizzes

// Create a new prompt and quiz (under prompt)
export const createPrompt = async (req, res) => {
    const { description, role, topics, context, chunk_size, test_type, num_questions, difficulty, format, request } = req.body;
    
    // can have no context, but all other fields are required
    if (!description || !role || !topics || !chunk_size || !test_type || !num_questions || !difficulty || !format || !request) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await db.query(
            'INSERT INTO prompts (description, role, topics, context, chunk_size, test_type, num_questions, difficulty, format, request) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [description, role, topics, context || null, chunk_size, test_type, num_questions, difficulty, format, request]
        );
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating prompt:', error);
        res.status(500).json({ error: 'Failed to create prompt' });
    }
}

export const createQuiz = async (req, res) => {
    const { prompt_id, title, description, questions } = req.body;

    if (!prompt_id || !title || !questions) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await db.query(
            'INSERT INTO quizzes (prompt_id, title, description, questions) VALUES ($1, $2, $3, $4) RETURNING *',
            [prompt_id, title, description || null, questions]
        );
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Failed to create quiz' });
    }
}

// Get all quizzes and prompts
export const getAllPrompts = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM prompts');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching prompts:', error);
        res.status(500).json({ error: 'Failed to fetch prompts' });
    }
}

export const getAllQuizzes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM quizzes');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
}

// Get a quiz or prompt by ID
export const getPromptById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM prompts WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Prompt not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching prompt:', error);
        res.status(500).json({ error: 'Failed to fetch prompt' });
    }
}

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


// Update a prompt and quiz by ID
export const updatePrompt = async (req, res) => {
    const { id } = req.params;
    const { description, role, topics, context, chunk_size, test_type, num_questions, difficulty, format, request } = req.body;

    try {
        const result = await db.query(
            'UPDATE prompts SET description = $1, role = $2, topics = $3, context = $4, chunk_size = $5, test_type = $6, num_questions = $7, difficulty = $8, format = $9, request = $10 WHERE id = $11 RETURNING *',
            [description || null, role || null, topics || null, context || null, chunk_size || null, test_type || null, num_questions || null, difficulty || null, format || null, request || null, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Prompt not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating prompt:', error);
        res.status(500).json({ error: 'Failed to update prompt' });
    }
}

export const updateQuiz = async (req, res) => {
    const { id } = req.params;
    const { title, description, questions } = req.body;
    try {       
        const result = await db.query(
            'UPDATE quizzes SET title = $1, description = $2, questions = $3 WHERE id = $4 RETURNING *',
            [title || null, description || null, questions || null, id]
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


// Delete a prompt by ID
export const deletePrompt = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM prompts WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Prompt not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting prompt:', error);
        res.status(500).json({ error: 'Failed to delete prompt' });
    }
}

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