import { db } from '../configs/db.js';


// CRUD operations for prompts

// create prompt
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

// get all prompts
export const getAllPrompts = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM prompts');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching prompts:', error);
        res.status(500).json({ error: 'Failed to fetch prompts' });
    }
}

// get prompt by id
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


// update prompt
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

// delete prompt
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
