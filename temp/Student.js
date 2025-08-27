const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initial students data
let students = [
  { id: 1, name: "Narendra Kumar", age: 22, state: 'Uttar Pradesh' },
  { id: 2, name: "Nipender Singh", age: 21, state: 'Uttar Pradesh' },
  { id: 3, name: "Nishant Kumar Tomar", age: 23, state: 'Uttar Pradesh' }
];

// Root route with simple HTML form
app.get('/', (req, res) => {
  res.send(`
    <h2>Student API</h2>
    <p>Use <code>/students</code> to GET/POST data.</p>
    <form action="/students" method="post">
      Name: <input name="name" required><br>
      Age: <input name="age" type="number" required><br>
      State: <input name="state" required><br>
      <button type="submit">Add Student</button>
    </form>
  `);
});

// GET all students
app.get('/students', (req, res) => {
  res.json({ students });
});

// POST add new student
app.post('/students', (req, res) => {
  const newStudent = req.body;
  // Auto-generate ID
  newStudent.id = students.length > 0 ? students[students.length - 1].id + 1 : 1;
  students.push(newStudent);
  res.status(201).json({ message: "Student added", students });
});

// PUT update student by ID
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

// DELETE student by ID
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted", students });
});

// Local par test karne ke liye listen add kiya hai
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app; // Vercel ke liye
