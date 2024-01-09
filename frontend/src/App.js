import React, { useState, useEffect } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

function App() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const addStudent = (newStudent) => {
    fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents([...students, data]);
        setShowForm(false);
      })
      .catch((error) => console.error('Error adding student:', error));
  };

  const deleteStudent = (id) => {
    fetch(`/api/students/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedStudents = students.filter((student) => student.id !== id);
        setStudents(updatedStudents);
      })
      .catch((error) => console.error('Error deleting student:', error));
  };

  return (
    <div>
      <h1>Student Management System</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add Student'}
      </button>
      {showForm && <StudentForm addStudent={addStudent} />}
      <StudentList students={students} deleteStudent={deleteStudent} />
    </div>
  );
}

export default App;
