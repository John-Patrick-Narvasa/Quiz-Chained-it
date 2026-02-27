sample prompt data 1
{
  "description": "Generate a multiple-choice quiz about the basics of JavaScript.",
  "role": "JavaScript Tutor",
  "topics": "JavaScript, Web Development",
  "context": "This quiz is for beginners who have just started learning JavaScript.",
  "chunk_size": 5,
  "test_type": "Multiple Choice",
  "num_questions": 5,
  "difficulty": "Easy",
  "format": "JSON",
  "request": "Create a 5-question multiple-choice quiz."
}

{
  "description": "Generate a multiple-choice quiz about the basics of Java.",
  "role": "Java Tutor",
  "topics": "Java, OOP",
  "context": "This quiz is for beginners who have just started learning Java.",
  "chunk_size": 5,
  "test_type": "Multiple Choice",
  "num_questions": 5,
  "difficulty": "Easy",
  "format": "JSON",
  "request": "Create a 5-question multiple-choice quiz."
}

sample prompt data 2
{
  "description": "Create a short quiz on the history of the Roman Empire.",
  "role": "History Professor",
  "topics": "Ancient Rome, History",
  "context": "Focus on the period from the founding of Rome to the fall of the Western Roman Empire.",
  "chunk_size": 10,
  "test_type": "True/False",
  "num_questions": 10,
  "difficulty": "Medium",
  "format": "JSON",
  "request": "Generate a 10-question true/false quiz about Roman history."
}

sample quiz data 1
{
  "prompt_id": 1,
  "title": "JavaScript Basics Quiz",
  "description": "A simple quiz to test your knowledge of fundamental JavaScript concepts.",
  "questions": [
    {
      "question": "What keyword is used to declare a variable that cannot be reassigned?",
      "options": ["var", "let", "const", "static"],
      "answer": "const"
    },
    {
      "question": "Which of the following is NOT a primitive data type in JavaScript?",
      "options": ["String", "Number", "Object", "Boolean"],
      "answer": "Object"
    },
    {
      "question": "How do you write a single-line comment in JavaScript?",
      "options": ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */", "# This is a comment"],
      "answer": "// This is a comment"
    }
  ]
}

sample quiz data 2
{
  "prompt_id": 2,
  "title": "Advanced SQL Quiz",
  "description": "Test your knowledge of advanced SQL topics like window functions and CTEs.",
  "questions": [
    {
      "question": "What is a Common Table Expression (CTE)?",
      "options": [
        "A temporary named result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement.",
        "A special type of table that is stored in memory.",
        "A function that performs calculations across a set of table rows.",
        "A permanent table that is created from a query."
      ],
      "answer": "A temporary named result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement."
    },
    {
      "question": "Which window function is used to assign a unique rank to each row within a partition of a result set, with no gaps in ranking values?",
      "options": ["RANK()", "DENSE_RANK()", "ROW_NUMBER()", "NTILE()"],
      "answer": "DENSE_RANK()"
    }
  ]
}