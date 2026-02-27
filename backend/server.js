import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import {db} from './configs/db.js';
import route from './routes/route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// for testing only, can be commented out later
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
app.get('/', (req, res) => {
    res.send('Hello, Brother!');
    console.log('Hello, Brother!');
});
app.get('/test', (req, res) => {
    res.send('Hello, Testing 123!');
    console.log('Hello, Testing 123!');
});

// testing api (can be deleted later)
app.use('/api', route);


// prompt form and created quizzes api
async function initDB() {
    try {
        await db.query( `
            CREATE TABLE IF NOT EXISTS prompts (
                id SERIAL PRIMARY KEY,
                description TEXT NOT NULL,
                role VARCHAR(255) NOT NULL,
                topics VARCHAR(255) NOT NULL,
                context TEXT,
                chunk_size INTEGER NOT NULL,
                test_type VARCHAR(255) NOT NULL,
                num_questions INTEGER NOT NULL,
                difficulty VARCHAR(255) NOT NULL,
                format VARCHAR(255) NOT NULL,
                request VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
          CREATE TABLE IF NOT EXISTS quizzes (
            id SERIAL PRIMARY KEY,
            prompt_id INTEGER REFERENCES prompts(id),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            questions JSONB NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );  
        `);
        console.log('Connected to database');
    }
    catch (error) {
        console.error('Error connecting to database: ', error);
    }
}

initDB().then(() => {
    console.log('Connected to the Database successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
});
