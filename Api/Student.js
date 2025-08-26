const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Narendra Kumar", age: 22, state: 'Uttar Pradesh'},
  { id: 2, name: 'Nipender Singh', age: 21 , state: 'Uttar Pradesh'},
  { id: 3, name: 'Nishant Kumar Tomar', age: 23 , state: 'Uttar Pradesh'}
];

// GET Students
app.get('/api/students', (req, res) => {
  res.json({ students });
});

// POST Student
app.post('/api/students', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json({ message: "Student added", students });
});

// PUT Student
app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  let student = students.find(s => s.id === id);
  if (student) {
    student.name = updatedData.name || student.name;
    student.age = updatedData.age || student.age;
    student.state = updatedData.state || student.state;
    res.json({ message: "Student updated", student });
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// DELETE Student
app.delete('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted", students });
});

// Export app instead of listen (for Vercel)
module.exports = app;
