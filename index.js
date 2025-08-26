const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // JSON body ko parse karne ke liye

let students = [
  { id: 1, name: "Narendra Kumar", age: 22, state: 'Uttar Pradesh'},
  { id: 2, name: 'Nipender Singh', age: 21 , state: 'Uttar Pradesh'},
  { id: 3, name: 'Nishant Kumar Tomar', age: 23 , state: 'Uttar Pradesh'}
];

// GET Students
app.get('/students', (req, res) => {
  res.json({ students });
});

// POST Student (Add new)
app.post('/students', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json({ message: "Student added", students });
});

// PUT Student (Update by ID)
app.put('/students/:id', (req, res) => {
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

// DELETE Student (Optional)
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted", students });
});

// Server start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
